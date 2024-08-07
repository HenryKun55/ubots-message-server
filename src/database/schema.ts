import { sql } from "drizzle-orm";
import { randomUUID } from 'node:crypto';
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable('messages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  text: text('text').notNull(),
  senderId: text('sender_id').notNull(),
  receiverId: text('receiver_id').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});

export type CreateMessage = typeof messages.$inferInsert;
