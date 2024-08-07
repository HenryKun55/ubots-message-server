import { z } from 'zod'

export const CreateMessageInput = z.object({
  body: z.object({
    text: z.string(),
    senderId: z.string(),
    receiverId: z.string()
  }),
});
