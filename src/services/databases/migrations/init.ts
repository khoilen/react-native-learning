export const migration_v1 = `
  CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    age INTEGER
  );
`;
