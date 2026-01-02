import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(userId) {
    if (this.socket) return;

    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:8000', {
      auth: { userId },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Socket disconnected');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Notification listeners
  onNotification(callback) {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  // Bidding listeners
  onNewBid(callback) {
    if (this.socket) {
      this.socket.on('new-bid', callback);
    }
  }

  onBidAccepted(callback) {
    if (this.socket) {
      this.socket.on('bid-accepted', callback);
    }
  }

  // Chat listeners
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  // Join project room for real-time updates
  joinProject(projectId) {
    if (this.socket) {
      this.socket.emit('join-project', projectId);
    }
  }

  leaveProject(projectId) {
    if (this.socket) {
      this.socket.emit('leave-project', projectId);
    }
  }
}

export default new SocketService();