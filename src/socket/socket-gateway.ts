import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { text } from "stream/consumers";


@WebSocketGateway()
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect{

    private userToSocketHashmap: Map<string, string> = new Map();

    public getReceiverSocketID(userID: string): string {
        return this.userToSocketHashmap[userID];
    }

    @WebSocketServer() server: Server

    handleConnection(@ConnectedSocket() client: Socket) {
        const userId = client.handshake.query.userID;
        console.log(userId);
        if (userId) {
            this.userToSocketHashmap[userId as string] = client.id;
        } 
        // update online users
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        const userId = client.handshake.query.userID;
        console.log(userId);
        if (userId) {
            this.userToSocketHashmap.delete(userId as string);
        }
        // update online users
    }


    @SubscribeMessage("newMessage")
    handleMessages(@MessageBody() textMessage: string): string {
        return textMessage;
    }
}