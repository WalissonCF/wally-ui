import { AssistantMessage } from "./assistant-message.interface";
import { UserMessage } from "./user-message.interface";

export type Message = UserMessage | AssistantMessage;

export function isUserMessage(message: Message): message is UserMessage {
  return message.role === 'user';
}

export function isAssistantMessage(message: Message): message is AssistantMessage {
  return message.role === 'assistant';
}
