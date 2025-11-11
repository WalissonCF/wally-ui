import { AssistantMessage } from "../models/messages/assistant-message.interface";
import { UserMessage } from "../models/messages/user-message.interface";

export type Message = UserMessage | AssistantMessage;

export function isUserMessage(message: Message): message is UserMessage {
  return message.role === 'user';
}

export function isAssistantMessage(message: Message): message is AssistantMessage {
  return message.role === 'assistant';
}
