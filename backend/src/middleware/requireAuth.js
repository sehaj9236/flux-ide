import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Unauthorized: Missing or malformed authentication token.' 
      });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Unauthorized: Authentication token is invalid or corrupt.' 
      });
    }
    const clerkId = decoded.sub;
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    if (!user) {
      return res.status(444).json({ 
        status: 'error', 
        message: 'User profile synchronization pending. Database record not found.' 
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Critical Security Checkpoint Error:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Internal authorization pipeline failure.' 
      });
  }
};