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
        // transform string to object id type of mongoose
        const user_id = new mongoose.Types.ObjectId(id);
        const other_id = new mongoose.Types.ObjectId(otherUserId);

        // query all messages from current user and its chat partner
        const relevantMessages = await this.messageModel.find({
            $or: [
                { messageFrom: user_id, messageTo: other_id},
                { messageFrom: other_id, messageTo: user_id}
            ]
        }).exec();
        return relevantMessages;
    }

    async updateMessage(id: string, newMessage: string) {
        console.log(newMessage);
        const messageId = new mongoose.Types.ObjectId(id);
        const updatedMessage = await this.messageModel.findOneAndUpdate(
            { _id: messageId }, 
            { $set: { messageContent: newMessage }}, 
            {new: true}).exec();
        return updatedMessage;
    }

    async deleteMessage(id: mongoose.Schema.Types.ObjectId) {
        this.messageModel.deleteOne({ _id: id });
    }
}
