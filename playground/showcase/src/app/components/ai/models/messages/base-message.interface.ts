import { MessageStatus } from "../../types/message-status.type";

export interface BaseMessage {
  message: string;
  role: string;
  status?: MessageStatus;
  timeStamp?: Date;
}
