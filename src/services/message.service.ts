import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "@/database/schema";

export class MessageService {
  private db: LibSQLDatabase<typeof schema>;
  constructor(db: LibSQLDatabase<typeof schema>) {
    this.db = db;
  }

  create = async (input: schema.CreateMessage) => {
    const response = await this.db
      .insert(schema.messages)
      .values(input)
      .returning();
    return response[0];
  }

  fetch = async (senderId: string) => {
    return await this.db.query.messages.findMany({
      where: (messages, { or, eq }) => or(eq(messages.senderId, senderId), eq(messages.receiverId, senderId)),
    })
  }
}
