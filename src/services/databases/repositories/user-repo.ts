import { User } from '@/types/user';
import { dbService } from '../db-service';

export const saveUserLocal = async (user: User) => {
  const db = await dbService.getDB();

  const query = `
    INSERT OR REPLACE INTO User (id, firstName, lastName, email, age)
    VALUES (?, ?, ?, ?, ?);
  `;

  const params = [user.id, user.firstName, user.lastName, user.email, user.age];

  return await db.executeSql(query, params);
};

export const getLocalUser = async (): Promise<User | null> => {
  const db = await dbService.getDB();
  const [results] = await db.executeSql('SELECT * FROM User LIMIT 1');
  if (results.rows.length > 0) {
    return results.rows.item(0) as User;
  }

  return null;
};

export const clearLocalUser = async () => {
  const db = await dbService.getDB();
  return await db.executeSql('DELETE FROM User');
};
