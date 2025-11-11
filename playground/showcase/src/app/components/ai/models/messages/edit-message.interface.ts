import { Message } from "../../types/message.type";

export interface EditMessageInterface {
    message: Message;
    conversationIndex: number;
    turnoIndex: number;
    displayedVersionIndex?: number;
}
