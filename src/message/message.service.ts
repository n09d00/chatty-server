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

    async updateMessage(id: mongoose.Schema.Types.ObjectId, newMessage: string) {
        // TODO: Find a way to update a message
        const message = this.messageModel.findOneAndUpdate({ _id: id }, { messageContent: newMessage });
        //message.updateOne
    }

    async deleteMessage(id: mongoose.Schema.Types.ObjectId) {
        this.messageModel.deleteOne({ _id: id });
    }
}
