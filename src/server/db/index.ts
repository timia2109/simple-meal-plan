import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "../../env/server.mjs";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var db: ReturnType<typeof createDb> | undefined;
}

const connection = mysql.createPool({
  uri: env.DATABASE_URL,
});

const createDb = () =>
  drizzle(connection, {
    schema,
    mode: "default",
    logger: env.NODE_ENV === "development",
  });

export const db = global.db || createDb();

if (env.NODE_ENV !== "production") {
  global.db = db;
}

// For backward compatibility during migration
export { db as prisma };
