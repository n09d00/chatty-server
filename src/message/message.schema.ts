import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MessageDocument = HydratedDocument<Message>

@Schema({ timestamps: true })
export class Message {
    @Prop({ required: true, ref: "User" })
    messageFrom: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, ref: "User" })
    messageTo: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    messageContent: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);