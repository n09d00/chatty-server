import mongoose from "mongoose";

export class MessageDto {
    messageFrom: mongoose.Schema.Types.ObjectId;
    messageTo: mongoose.Schema.Types.ObjectId;
    messageContent: string;
}