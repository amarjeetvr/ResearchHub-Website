import { createNotification } from '../controllers/notification.controller.js';
import { emitToUser } from './socket.js';

// Chat message model (in-memory for now, can be moved to MongoDB)
const chatRooms = new Map();

export const createChatRoom = (projectId, clientId, freelancerId) => {
  const roomId = `${projectId}_${clientId}_${freelancerId}`;
  if (!chatRooms.has(roomId)) {
    chatRooms.set(roomId, {
      id: roomId,
      projectId,
      participants: [clientId, freelancerId],
      messages: [],
      createdAt: new Date()
    });
  }
  return roomId;
};

export const sendMessage = async (roomId, senderId, message, io) => {
  const room = chatRooms.get(roomId);
  if (!room) return null;

  const newMessage = {
    id: Date.now().toString(),
    senderId,
    message,
    timestamp: new Date(),
    read: false
  };

  room.messages.push(newMessage);

  // Notify other participant
  const recipientId = room.participants.find(id => id !== senderId);
  
  // Create notification
  await createNotification(
    recipientId,
    'message',
    'New Message',
    `You have a new message`,
    { roomId, messageId: newMessage.id }
  );

  // Emit real-time message
  io.to(`user_${recipientId}`).emit('newMessage', {
    roomId,
    message: newMessage
  });

  return newMessage;
};

export const getChatRoom = (roomId) => {
  return chatRooms.get(roomId);
};