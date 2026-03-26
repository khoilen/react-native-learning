import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { runMigrations } from './migrations';

enablePromise(true);

class DatabaseService {
  private db: SQLiteDatabase | null = null;

  async getDB(): Promise<SQLiteDatabase> {
    if (this.db) return this.db;

    this.db = await openDatabase({
      name: 'user_data.db',
      location: 'default',
    });

    await runMigrations(this.db);

    return this.db;
  }
}

export const dbService = new DatabaseService();
