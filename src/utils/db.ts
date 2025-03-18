import { PrismaClient } from '@prisma/client';

class Database {
  private static instance: Database;
  private prisma: PrismaClient;
  private isConnected: boolean = false;

  private constructor() {
    this.prisma = new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.isConnected) {
        await this.prisma.$connect();
        this.isConnected = true;
        console.log('Successfully connected to database');
      }
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw new Error('Database connection failed');
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.isConnected) {
        await this.prisma.$disconnect();
        this.isConnected = false;
        console.log('Successfully disconnected from database');
      }
    } catch (error) {
      console.error('Failed to disconnect from database:', error);
      throw new Error('Database disconnection failed');
    }
  }

  public getClient(): PrismaClient {
    if (!this.isConnected) {
      throw new Error('Database is not connected');
    }
    return this.prisma;
  }
}

export default Database.getInstance();