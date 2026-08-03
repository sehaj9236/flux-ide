import { Router } from 'express';
import { getInlineCodeCompletion } from '../controller/aiController.js'; // Note: check if your folder is 'controller' or 'controllers'

const aiRouter = Router();

// Allow clerkMiddleware() in app.js to handle the token parsing globally, without redirects
aiRouter.post('/suggestions', getInlineCodeCompletion);

export default aiRouter;