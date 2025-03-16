import { Controller, Post, UseGuards, Req, Param, Get, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';
import mongoose, { Mongoose } from 'mongoose';
import { SocketGateWay } from 'src/socket/socket-gateway';

@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
    constructor(
        private messageService: MessageService,
        private socketGateway: SocketGateWay
    ) {}
    
    @Post('/sendMessage/:receiverId')
    async sendMessage(@Req() req: Request, @Param('receiverId') receiverId: string) {
        const user = req.user as UserPayload;

        const textToSend = req.body.messageContent;
        const sender = new mongoose.Types.ObjectId(user.id);
        const reveicer = new mongoose.Types.ObjectId(receiverId);

        this.messageService.createMessage({ 
            messageFrom: sender, 
            messageTo: reveicer, 
            messageContent: textToSend
        });

        const recId = this.socketGateway.getReceiverSocketID(receiverId);
        this.socketGateway.server.to(recId).emit(textToSend);
    }

    @Get('getMessages/:otherUserId')
    async getMessages(@Req() req: Request, @Param('otherUserId') otherUserId: string, @Res() res: Response) {
        const user = req.user as UserPayload;

        const messages = await this.messageService.getAllRelevantMessages(user.id, otherUserId);
        res.status(200).json(messages)
    }

    // This function is only for testing. Do not keep it in production!
    @Get('all')
    async getAllMessages() {
        const allMessages = await this.messageService.getAllMessages();
        console.log(allMessages);
        return allMessages;
    }
}
