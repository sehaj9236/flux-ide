import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { getTemplateDetailsById, deleteFile, updateFile, saveTemplate, getGithubRepo } from '../controller/templateController.js';

const templateRouter = Router();

// 1. Place static routes BEFORE dynamic parameter routes
templateRouter.post("/import", requireAuth(), getGithubRepo);

// 2. Dynamic parameter routes go below
templateRouter.post("/:workspaceId", requireAuth(), getTemplateDetailsById);

// Save the entire file tree structure
templateRouter.patch("/:workspaceId/save", requireAuth(), saveTemplate);

// Update a specific file
templateRouter.patch("/:workspaceId/file", requireAuth(), updateFile);

// Delete a specific file
templateRouter.delete("/:workspaceId/file", requireAuth(), deleteFile);

export default templateRouter;
