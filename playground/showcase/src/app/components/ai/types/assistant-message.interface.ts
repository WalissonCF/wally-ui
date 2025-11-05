import { BaseMessage } from "./base-message.interface";

export interface AssistantMessage extends BaseMessage {
  role: "assistant";
  sourceUserMessageIndex?: number;
  // userMessageIndex?: number;
}
