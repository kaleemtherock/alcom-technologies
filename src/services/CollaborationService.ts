import { io, Socket } from 'socket.io-client';

interface CollaborationEvent {
  type: 'cursor' | 'selection' | 'edit' | 'presence';
  userId: string;
  data: any;
}

class CollaborationService {
  private socket: Socket;
  private documentId: string;
  private callbacks: Map<string, Function[]> = new Map();

  constructor(documentId: string) {
    this.documentId = documentId;
    this.socket = io('ws://localhost:3001');
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('collaboration-event', (event: CollaborationEvent) => {
      this.notifyListeners(event.type, event);
    });
  }

  addListener(eventType: string, callback: Function) {
    if (!this.callbacks.has(eventType)) {
      this.callbacks.set(eventType, []);
    }
    this.callbacks.get(eventType)?.push(callback);
  }

  removeListener(eventType: string, callback: Function) {
    const callbacks = this.callbacks.get(eventType);
    if (callbacks) {
      this.callbacks.set(eventType, callbacks.filter(cb => cb !== callback));
    }
  }

  private notifyListeners(eventType: string, event: CollaborationEvent) {
    this.callbacks.get(eventType)?.forEach(callback => callback(event));
  }

  updateCursor(position: { x: number; y: number }) {
    this.socket.emit('collaboration-event', {
      type: 'cursor',
      documentId: this.documentId,
      data: position
    });
  }

  updateSelection(range: { start: number; end: number }) {
    this.socket.emit('collaboration-event', {
      type: 'selection',
      documentId: this.documentId,
      data: range
    });
  }

  broadcastEdit(changes: any) {
    this.socket.emit('collaboration-event', {
      type: 'edit',
      documentId: this.documentId,
      data: changes
    });
  }

  updatePresence(status: 'active' | 'idle' | 'offline') {
    this.socket.emit('collaboration-event', {
      type: 'presence',
      documentId: this.documentId,
      data: { status }
    });
  }
}

export default CollaborationService;