import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}]),
    SocketModule
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService, MongooseModule]
})
export class MessageModule {}
