import { Controller, Post, UseGuards, Req, Param, ParamData } from '@nestjs/common';
import { Request } from "express";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessageService } from './message.service';
import mongoose from 'mongoose';
import { SocketGateWay } from 'src/socket/socket-gateway';

@Controller('message')
export class MessageController {
    constructor(
        private messageService: MessageService,
        private socketGateway: SocketGateWay
    ) {}
    
    @Post('/sendMessage/:receiverId')
    @UseGuards(JwtAuthGuard)
    async sendMessage(@Req() req: Request, @Param('receiverId') receiverId: string) {
        const user = req.user as UserPayload;

        const textToSend = req.body;
        const sender = new mongoose.Schema.Types.ObjectId(user.id);
        const reveicer = new mongoose.Schema.Types.ObjectId(receiverId);

        this.messageService.createMessage({ 
            messageFrom: sender, 
            messageTo: reveicer, 
            messageContent: textToSend
        });

        const recId = this.socketGateway.getReceiverSocketID(receiverId);
        this.socketGateway.server.to(recId).emit(textToSend);
    }
}
