import { BaseMessage } from "./base-message.interface";

export interface UserMessage extends BaseMessage {
  role: "user";
  selectedContext?: string;
}
