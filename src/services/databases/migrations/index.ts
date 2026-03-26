import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { migration_v1 } from './init';

const MIGRATIONS = [migration_v1];

export const runMigrations = async (db: SQLiteDatabase) => {
  await db.executeSql(
    'CREATE TABLE IF NOT EXISTS Version (schema_version INTEGER PRIMARY KEY)',
  );

  const [result] = await db.executeSql('SELECT schema_version FROM Version');

  const currentVersion =
    result.rows.length > 0 ? result.rows.item(0).schema_version : 0;

  for (let i = currentVersion; i < MIGRATIONS.length; i++) {
    const nextVersion = i + 1;
    console.log(`Migrating to version ${nextVersion}...`);

    await db.executeSql(MIGRATIONS[i]);

    await db.executeSql(
      'INSERT OR REPLACE INTO Version (schema_version) VALUES (?)',
      [nextVersion],
    );
  }
};
