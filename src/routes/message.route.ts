import { MessageController } from "@/controllers/message.controller";
import { db } from "@/database";
import { validate } from "@/middlewares/zod.middleware";
import { MessageService } from "@/services/message.service";
import express from "express";
import { CreateMessageInput } from '@/validations/Message/create-message.validation'

const messageRouter = express.Router();
const messageService = new MessageService(db)
const messageController = new MessageController(messageService);

messageRouter.post("/", validate(CreateMessageInput), messageController.create);
messageRouter.get("/:senderId", messageController.fetch);

export { messageRouter };
