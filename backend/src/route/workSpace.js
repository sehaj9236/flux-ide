import { Router } from 'express';
import { requireAuth } from '@clerk/express';

import { createWorkSpace,
    updateWorkSpaceById,
    deleteWorkSpaceById,
    toggleStarMarked,
    getStarredWorkspaces // Ensure this is imported
} from '../controller/workSpaceController.js';

const workspaceRouter = Router();

// Routes that don't need a specific ID
workspaceRouter.post('/', requireAuth(), createWorkSpace);

// Add the toggle-star route here
workspaceRouter.post('/toggle-star', requireAuth(), toggleStarMarked);

// Routes that target a specific workspace ID
workspaceRouter.patch('/:workspaceId', requireAuth(), updateWorkSpaceById);
workspaceRouter.delete('/:workspaceId', requireAuth(), deleteWorkSpaceById);
workspaceRouter.get('/starred-ids', requireAuth(), getStarredWorkspaces);


export default workspaceRouter;