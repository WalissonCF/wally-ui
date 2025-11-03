import { MessageStatus } from "./message-status.type";
import { role } from "./role.type";

export interface Message{
    message: string;
    role: role;
    status?: MessageStatus;
    timeStamp?: Date;
    selectedContext?: string;
}
