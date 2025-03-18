import { io, Socket } from 'socket.io-client';

class RealtimeService {
  private socket: Socket;
  private subscribers: Map<string, Function[]> = new Map();

  constructor() {
    this.socket = io('ws://localhost:3001');
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('data-update', (data) => {
      this.notifySubscribers('data-update', data);
    });

    this.socket.on('notification', (data) => {
      this.notifySubscribers('notification', data);
    });
  }

  subscribe(event: string, callback: Function) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)?.push(callback);
  }

  unsubscribe(event: string, callback: Function) {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      this.subscribers.set(event, callbacks.filter(cb => cb !== callback));
    }
  }

  private notifySubscribers(event: string, data: any) {
    this.subscribers.get(event)?.forEach(callback => callback(data));
  }
}

export default RealtimeService;