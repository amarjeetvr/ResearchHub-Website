import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true
    }
  });

  // Socket authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);
    
    // Join user to their personal room
    socket.join(socket.userId);
    
    // Join project rooms
    socket.on('join-project', (projectId) => {
      socket.join(`project-${projectId}`);
    });

    // Handle chat messages
    socket.on('send-message', (data) => {
      socket.to(data.recipientId).emit('new-message', {
        senderId: socket.userId,
        message: data.message,
        timestamp: new Date()
      });
    });

    // Handle bidding updates
    socket.on('new-bid', (data) => {
      socket.to(`project-${data.projectId}`).emit('bid-update', {
        projectId: data.projectId,
        bidAmount: data.amount,
        bidderId: socket.userId
      });
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Utility functions for emitting events
export const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(userId).emit(event, data);
  }
};

export const emitToProject = (projectId, event, data) => {
  if (io) {
    io.to(`project-${projectId}`).emit(event, data);
  }
};