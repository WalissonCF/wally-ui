import { Message } from "./message.interface";

export interface EditMessageInterface {
    message: Message;
    conversationIndex: number;
    turnoIndex: number;
}