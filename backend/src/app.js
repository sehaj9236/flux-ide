import express from 'express';
import cors from 'cors';
import {clerkMiddleware} from "@clerk/express"
import webhookRoutes from './route/webhook.js';
import workspaceRouter from './route/workSpace.js';
import templateRouter from './route/template.js';
import aiRouter from './route/ai.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

// 1. PARSERS FIRST
app.use('/api/webhooks', webhookRoutes);
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 2. AUTHENTICATION NEXT
app.use(clerkMiddleware());

// 3. ROUTES LAST

app.use('/api/workspace', workspaceRouter);
app.use('/api/template',templateRouter);
app.use('/api/ai',aiRouter);
// System Status
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', timestamp: new Date() }));

// 4. CATCH-ALL
app.use((req, res) => res.status(404).json({ error: 'Endpoint resource target not found.' }));

export default app; 