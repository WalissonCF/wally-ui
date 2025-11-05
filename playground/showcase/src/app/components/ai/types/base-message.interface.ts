import { MessageStatus } from "./message-status.type";

export interface BaseMessage {
  message: string;
  role: string;
  status?: MessageStatus;
  timeStamp?: Date;
}
