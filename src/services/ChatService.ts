import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
}

class ChatService {
  private socket: Socket;
  
  constructor(roomId: string) {
    this.socket = io('YOUR_WEBSOCKET_SERVER_URL');
    this.socket.emit('join-room', roomId);
  }

  sendMessage(message: string, userId: string, userName: string) {
    this.socket.emit('chat-message', {
      userId,
      userName,
      message,
      timestamp: new Date()
    });
  }

  onMessageReceived(callback: (message: ChatMessage) => void) {
    this.socket.on('chat-message', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default ChatService;