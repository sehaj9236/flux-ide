import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../db/prisma.js";
import { getAuth } from '@clerk/express';
import { scanTemplateDirectory } from "../service/templateService.js";
import { templatePaths } from "../utils/template.js";
import path from 'path';

export const createWorkSpace = asyncHandler(async (req, res) => {
    const auth = getAuth(req);
    const clerkId = auth.userId;

    if (!clerkId) {
        throw new ApiError(401, "Unauthorized: No user session found");
    }

    const { title, template, description } = req.body;

    try {
        // 3. Find the user
        const user = await prisma.user.findUnique({
            where: { clerkId: clerkId },
            select: { id: true },
        });

        if (!user) {
            throw new ApiError(404, "User Not Found");
        }

        // 4. Create the workspace (REMOVED 'members' block)
        const workSpace = await prisma.workspace.create({
            data: {
                title,
                template,
                description,
                ownerId: user.id,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        clerkId: true,
                        name: true,
                        email: true,
                        imageUrl: true,
                    }
                }
            }
        });

        // 5. Format createdAt date
        const formattedWorkspace = {
            ...workSpace,
            createdAt: new Date(workSpace.createdAt).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }
            ),
        };

        return res.status(201).json(
            new ApiResponse(
                201,
                formattedWorkspace,
                "Workspace Created Successfully."
            )
        );

    } catch (error) {
        console.error("Failed to create workspace:", error);

        throw error instanceof ApiError
            ? error
            : new ApiError(500, "Unable to Create Workspace");
    }
});

export const deleteWorkSpaceById = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;
  const { workspaceId } = req.params;

  try {
    // 1. Verify user exists
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    // 2. Find the workspace and verify owner
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { ownerId: true },
    });

    if (!workspace) {
      throw new ApiError(404, "Workspace not found");
    }

    if (workspace.ownerId !== user.id) {
      throw new ApiError(403, "You do not have permission to delete this workspace");
    }

    // 3. Delete the workspace
    // Because your schema has 'onDelete: Cascade' for templateFile,
    // this will automatically delete the TemplateFile entry too.
    await prisma.workspace.delete({
      where: { id: workspaceId },
    });

    return res.status(200).json(
      new ApiResponse(200, {}, "Workspace deleted successfully.")
    );

  } catch (error) {
    console.error("Failed to delete workspace:", error);
    throw error instanceof ApiError ? error : new ApiError(500, "Unable to delete workspace");
  }
});
export const updateWorkSpaceById = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;
  const { workspaceId } = req.params;
  const { title, description, template } = req.body;

  try {
    // 1. Verify user exists in your DB
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    // 2. Find the workspace and verify the user is the owner
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { ownerId: true },
    });

    if (!workspace) {
      throw new ApiError(404, "Workspace not found");
    }

    if (workspace.ownerId !== user.id) {
      throw new ApiError(403, "You do not have permission to update this workspace");
    }

    // --- LOGGING CHECK ---
    // console.log("Updating workspace with:", { title, description, template });
    // ---------------------

    // 3. Perform the update
    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(template && { template }),
      },
    });

    // Verification log
    // console.log("Database response:", updatedWorkspace);

    return res.status(200).json(
      new ApiResponse(200, updatedWorkspace, "Workspace updated successfully.")
    );

  } catch (error) {
    console.error("Failed to update workspace:", error);
    throw error instanceof ApiError ? error : new ApiError(500, "Unable to update workspace");
  }
});

export const toggleStarMarked = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;
  const { workspaceId, isMarked } = req.body;

  if (!workspaceId || !clerkId) {
    throw new ApiError(400, "Workspace ID and User ID are required.");
  }

  // 1. Find the user in your DB using their clerkId
  const userExists = await prisma.user.findUnique({
    where: { clerkId: clerkId },
  });

  if (!userExists) {
    throw new ApiError(404, "User profile not found in database.");
  }

  // 2. Use the database internal ID (userExists.id)
  const internalUserId = userExists.id;

  if (isMarked) {
    const starred = await prisma.starredWorkspace.upsert({
      where: {
        userId_workspaceId: { userId: internalUserId, workspaceId },
      },
      update: { isMarked: true },
      create: { userId: internalUserId, workspaceId, isMarked: true },
    });

    return res.status(200).json(new ApiResponse(200, starred, "Starred successfully."));
  } else {
    try {
      await prisma.starredWorkspace.delete({
        where: {
          userId_workspaceId: { userId: internalUserId, workspaceId },
        },
      });
      return res.status(200).json(new ApiResponse(200, null, "Unstarred successfully."));
    } catch (error) {
      throw new ApiError(404, "Workspace was not starred.");
    }
  }
});

export const getStarredWorkspaces = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;

  if (!clerkId) {
    throw new ApiError(401, "Unauthorized");
  }

  // 1. Find the local user first to get their internal database ID
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId },
  });

  if (!user) {
    throw new ApiError(404, "User profile not found.");
  }

  // 2. Fetch all workspace IDs that this user has marked as starred
  const starredWorkspaces = await prisma.starredWorkspace.findMany({
    where: {
      userId: user.id,
      isMarked: true
    },
    select: {
      workspaceId: true // We only need the IDs
    }
  });

  // 3. Flatten into a simple array of strings: ["id1", "id2", ...]
  const starredIds = starredWorkspaces.map(item => item.workspaceId);

  return res.status(200).json(
    new ApiResponse(200, starredIds, "Starred workspaces fetched successfully.")
  );
});



