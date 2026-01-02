import { createChatRoom, sendMessage, getChatRoom } from '../utils/chat.js';
import { Project } from '../models/project.model.js';

export const initializeChat = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Verify user is part of this project
    const isClient = project.clientId.toString() === userId;
    const isFreelancer = project.assignedFreelancer?.toString() === userId;

    if (!isClient && !isFreelancer) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const roomId = createChatRoom(
      projectId,
      project.clientId.toString(),
      project.assignedFreelancer?.toString()
    );

    res.json({ roomId, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initialize chat' });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { message } = req.body;
    const senderId = req.id;

    const newMessage = await sendMessage(roomId, senderId, message, req.io);
    
    if (!newMessage) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.json({ message: newMessage, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = getChatRoom(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.json({ messages: room.messages, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get messages' });
  }
};