import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { MessageDto } from './message.dto';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async createMessage(messageDto: MessageDto) {
        const newMessage = new this.messageModel(messageDto);
        return newMessage.save();
    }

    async getAllMessages(): Promise<Message[]> {
        const allMessages = await this.messageModel.find().exec();
        return allMessages
    }

    async getAllRelevantMessages(id: string, otherUserId: string): Promise<Message[]> {
        const relevantMessages = await this.messageModel.find({
            $or: [
                { messageFrom: id, messageTo: otherUserId},
                { messageFrom: otherUserId, messageTo: id}
            ]
        });
        return relevantMessages;
    }

    async updateMessage(id: mongoose.Schema.Types.ObjectId, newMessage: string) {
        // TODO: Find a way to update a message
        const message = this.messageModel.findOneAndUpdate({ _id: id }, { messageContent: newMessage });
        //message.updateOne
    }

    async deleteMessage(id: mongoose.Schema.Types.ObjectId) {
        this.messageModel.deleteOne({ _id: id });
    }
}
