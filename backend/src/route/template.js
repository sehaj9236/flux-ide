import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { getTemplateDetailsById ,deleteFile,updateFile,saveTemplate} from '../controller/templateController.js';



const templateRouter = Router();

templateRouter.post("/:workspaceId",requireAuth(), getTemplateDetailsById);

// Save the entire file tree structure
templateRouter.patch("/:workspaceId/save-all", requireAuth(), saveTemplate);

// Update a specific file
templateRouter.patch("/:workspaceId/file", requireAuth(), updateFile);

// Delete a specific file
templateRouter.delete("/:workspaceId/file", requireAuth(), deleteFile);

export default templateRouter;