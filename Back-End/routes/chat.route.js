import express from 'express';
import { initializeChat, sendChatMessage, getChatMessages } from '../controllers/chat.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/initialize/:projectId', isAuthenticated, initializeChat);
router.post('/send/:roomId', isAuthenticated, sendChatMessage);
router.get('/messages/:roomId', isAuthenticated, getChatMessages);

export default router;