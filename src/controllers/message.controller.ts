import { io } from "@/server";
import { MessageService } from "@/services/message.service";
import { Request, Response } from "express";

export class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  create = async (request: Request, response: Response) => {
    try {
      const message = await this.messageService.create({
        text: request.body.text,
        senderId: request.body.senderId,
        receiverId: request.body.receiverId,
      });

      io.to(message.receiverId).emit('message',message)

      return response.status(201).json(message);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to create message' });
    }
  }

  fetch = async (request: Request, response: Response) => {
    try {
      const messages = await this.messageService.fetch(request.params.senderId)

      return response.status(201).json(messages);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to create message' });
    }
  }
}
