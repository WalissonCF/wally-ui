import { BaseMessage } from "./base-message.interface";

import { StructuredToolData } from "../../types/tool-result.type";

export interface AssistantMessage extends BaseMessage {
  role: "assistant";
  sourceUserMessageIndex?: number;
  structuredData?: StructuredToolData;
}
