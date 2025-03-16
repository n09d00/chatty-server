import mongoose from "mongoose";

export class MessageDto {
    messageFrom: mongoose.Types.ObjectId;
    messageTo: mongoose.Types.ObjectId;
    messageContent: string;
}