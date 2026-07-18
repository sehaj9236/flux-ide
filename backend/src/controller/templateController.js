    import prisma from "../db/prisma.js";
    import { scanTemplateDirectory } from "../service/templateService.js";
    import { ApiError } from "../utils/apiError.js";
    import { ApiResponse } from "../utils/apiResponse.js";
    import asyncHandler from "../utils/asyncHandler.js";
    import { templatePaths } from "../utils/template.js";
    import path from 'path';
    import { getAuth } from '@clerk/express';

 const sanitizeContent = (content) => typeof content === 'string' ? content.replace(/\0/g, '') : content;

const verifyWorkspaceAccess = async (clerkId, workspaceId) => {
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId },
    select: { id: true },
  });
  if (!user) throw new ApiError(404, "User not found.");

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { templateFile: true }
  });

  if (!workspace) throw new ApiError(404, "Workspace not found.");
  if (workspace.ownerId !== user.id) throw new ApiError(403, "Access denied.");
  
  return workspace;
};

function walkAndReplace(node, targetId, newContent) {
    if (node.id === targetId) return { ...node, content: newContent };
    if (node.items) {
        return { ...node, items: node.items.map(item => walkAndReplace(item, targetId, newContent)) };
    }
    return node;
    }

function walkAndRemove(node, targetId) {
  // If this node has children, process them
  if (node.items) {
    return { 
      ...node, 
      items: node.items
        // 1. First, remove the target item if it's a direct child
        .filter(item => item.id !== targetId)
        // 2. Then, recursively process the remaining children to check their sub-folders
        .map(item => walkAndRemove(item, targetId)) 
    };
  }
  return node;
}

export const getTemplateDetailsById = asyncHandler(async (req, res) => {
  const auth = getAuth(req);
  const clerkId = auth.userId;
  const { workspaceId } = req.params;

  if (!clerkId) throw new ApiError(401, "Unauthorized access.");

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId },
    select: { id: true },
  });

  if (!user) throw new ApiError(404, "User not found in database.");
  if (!workspaceId) throw new ApiError(400, "Workspace ID is required.");

  // 1. Fetch Workspace with templateFile AND the owner
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: { 
      templateFile: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true
        }
      }
    } 
  });

  if (!workspace) throw new ApiError(404, "Workspace not found.");

  // SECURITY CHECK
  if (workspace.ownerId !== user.id) {
    throw new ApiError(403, "You do not have permission to access this workspace.");
  }

  // 2. Prepare the combined payload
  const workspaceData = {
    id: workspace.id,
    title: workspace.title,
    description: workspace.description,
    template: workspace.template,
    owner: workspace.owner // Now includes name, email, imageUrl
  };

  // 3. Return cached if exists
  if (workspace.templateFile) {
    return res.status(200).json(
      new ApiResponse(200, { 
        workspace: workspaceData, 
        content: workspace.templateFile.content 
      }, "Template fetched from DB.")
    );
  }

  // 4. Scanning Logic
  try {
    const relativePath = templatePaths[workspace.template];
    const fullPath = path.join(process.cwd(), relativePath);

    const structure = await scanTemplateDirectory(fullPath);

    const newFile = await prisma.templateFile.create({
      data: {
        workspaceId: workspaceId,
        content: structure
      }
    });

    return res.status(200).json(
      new ApiResponse(200, { 
        workspace: workspaceData, 
        content: newFile.content 
      }, "Template generated and cached.")
    );
        
  } catch (error) {
    console.error("Template scanning error:", error);
    throw new ApiError(500, `Failed to initialize template: ${error.message}`);
  }
});

export const updateFile = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { fileId, newContent } = req.body;
  const auth = getAuth(req);

  const workspace = await verifyWorkspaceAccess(auth.userId, workspaceId);

  // Ensure content is a JS object before walking
  const currentContent = typeof workspace.templateFile.content === 'string' 
    ? JSON.parse(workspace.templateFile.content) 
    : workspace.templateFile.content;

  const updatedStructure = walkAndReplace(currentContent, fileId, sanitizeContent(newContent));

  await prisma.templateFile.update({
    where: { id: workspace.templateFile.id },
    data: { content: updatedStructure } // Prisma handles JSON object here
  });

  return res.status(200).json(new ApiResponse(200, updatedStructure, "File updated."));
});

export const deleteFile = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { fileId } = req.body;
  const auth = getAuth(req);

  const workspace = await verifyWorkspaceAccess(auth.userId, workspaceId);

  // Safeguard: Ensure content is an object
  const currentContent = typeof workspace.templateFile.content === 'string' 
    ? JSON.parse(workspace.templateFile.content) 
    : workspace.templateFile.content;

  const updatedStructure = walkAndRemove(currentContent, fileId);

  await prisma.templateFile.update({
    where: { id: workspace.templateFile.id },
    data: { content: updatedStructure }
  });

  return res.status(200).json(new ApiResponse(200, updatedStructure, "File deleted."));
});

export const saveTemplate = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;
  const { fullStructure } = req.body; // The entire file tree JSON object
  const auth = getAuth(req);

  // 1. Verify access and ownership
  const workspace = await verifyWorkspaceAccess(auth.userId, workspaceId);

  // 2. Validate input
  if (!fullStructure) {
    throw new ApiError(400, "Full template structure is required.");
  }

  // 3. Update the entire JSON tree in the database
  const savedTemplate = await prisma.templateFile.update({
    where: { id: workspace.templateFile.id },
    data: { 
      content: fullStructure // Prisma treats this as a JSON object update
    }
  });

  return res.status(200).json(new ApiResponse(200, savedTemplate.content, "Full template saved successfully."));
});