import prisma from "../db/prisma.js";
import { scanTemplateDirectory } from "../service/templateService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { templatePaths } from "../utils/template.js";
import path from 'path';
import { getAuth } from '@clerk/express';
import fs from 'fs/promises';

import os from 'os';
import { execSync } from 'child_process';
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
  await verifyWorkspaceAccess(auth.userId, workspaceId);

  // 2. Validate input
  if (!fullStructure) {
    throw new ApiError(400, "Full template structure is required.");
  }

  // 3. Update or Upsert the entire JSON tree in the database
  // Using workspaceId is strictly safer because it is @unique on the TemplateFile model
  const savedTemplate = await prisma.templateFile.update({
    where: { 
      workspaceId: workspaceId 
    },
    data: { 
      content: fullStructure // Prisma treats this as a JSON object update
    }
  });

  return res.status(200).json(new ApiResponse(200, savedTemplate.content, "Full template saved successfully."));
});

// Helper function to recursively find package.json inside a directory
async function findPackageJson(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      // Skip ignored folders to optimize search
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(entry.name)) continue;
        
        const found = await findPackageJson(fullPath);
        if (found) return found;
      } else if (entry.isFile() && entry.name === 'package.json') {
        return fullPath;
      }
    }
  } catch (err) {
    console.error("Error searching for package.json:", err);
  }
  return null;
}

function sanitizeNullBytes(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/\u0000/g, '');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeNullBytes);
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned = {};
    for (const key of Object.keys(obj)) {
      cleaned[key] = sanitizeNullBytes(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

export const getGithubRepo = asyncHandler(async (req, res) => {
  const { repoUrl, title, description } = req.body;
  const auth = getAuth(req);

  // 1. Verify user authentication via Clerk
  if (!auth || !auth.userId) {
    throw new ApiError(401, "Unauthorized request. Please log in.");
  }

  if (!repoUrl) {
    throw new ApiError(400, "Repository URL is required.");
  }

  // 2. Extract owner and repo from URL (Safely handles trailing .git)
  const cleanUrl = repoUrl.trim().replace(/\.git$/, '');
  const urlMatch = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/#?]+)/);
  
  if (!urlMatch) {
    throw new ApiError(400, "Invalid GitHub URL format. Use format: https://github.com/owner/repo");
  }

  const repo = urlMatch[2];
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Flux-App',
  };

  // 3. Find or ensure the user exists in Prisma using their Clerk ID
  let user = await prisma.user.findUnique({
    where: { clerkId: auth.userId }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: auth.userId }
    });
  }

  // 4. Clone repository temporarily on the server first
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'flux-import-'));
  
  try {
    execSync(`git clone --depth 1 ${repoUrl} ${tempDir}`, { stdio: 'ignore' });

    // 5. Locate package.json anywhere in the repository structure
    const packageJsonPath = await findPackageJson(tempDir);
    
    if (!packageJsonPath) {
      throw new ApiError(400, "No package.json found in this repository. Only Node.js projects are supported.");
    }

    // 6. Read and parse package.json content to verify the framework
    const pkgContentString = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(pkgContentString);

    const deps = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };
    const isReact = !!deps['react'];
    const isNext = !!deps['next'];
    const isVue = !!deps['vue'];
    const isAngular = !!deps['@angular/core'];
    const isExpress = !!deps['express'];
    const isHono = !!deps['hono'];

    const isSupported = isReact || isNext || isVue || isAngular || isExpress || isHono;
    
    if (!isSupported) {
      throw new ApiError(400, "Unsupported framework. Please import a React, Next.js, Vue, Angular, Express, or Hono project.");
    }

    // 7. Scan local directory using your directory scanner to generate the file tree JSON object
    const rawContentTree = await scanTemplateDirectory(tempDir);

    // 🛡️ SANITIZE: Strip out unsupported PostgreSQL null bytes (\u0000) from files
    const formattedContentTree = sanitizeNullBytes(rawContentTree);

    // 8. Map framework to match your Prisma Template enum exactly
    let templateType = 'React';
    if (isNext) templateType = 'Next_js';
    else if (isVue) templateType = 'Vue_js';
    else if (isAngular) templateType = 'Angular';
    else if (isExpress) templateType = 'Express';
    else if (isHono) templateType = 'Hono';

    // 9. Create Workspace and TemplateFile simultaneously via Prisma
    const newWorkspace = await prisma.workspace.create({
      data: {
        title: title || repo,
        description: description || `Imported from ${repoUrl}`,
        ownerId: user.id, // Internal database user cuid
        template: templateType,
        templateFile: {
          create: {
            content: formattedContentTree // Sanitized JSON object
          }
        }
      },
      include: {
        templateFile: true
      }
    });

    return res.status(201).json(new ApiResponse(201, newWorkspace, "GitHub repository imported successfully."));

  } catch (error) {
    console.error("Git clone or scan error:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Failed to clone and process the repository.");
  } finally {
    // 10. Clean up temporary files from server storage
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
});