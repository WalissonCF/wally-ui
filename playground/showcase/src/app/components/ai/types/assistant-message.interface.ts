import { BaseMessage } from "./base-message.interface";
import { CotacaoResponse } from "../temp-cotacao-schema"; // TODO: TEMPORARIO

export interface AssistantMessage extends BaseMessage {
  role: "assistant";
  sourceUserMessageIndex?: number;
  structuredData?: CotacaoResponse; // TODO: TEMPORARIO - Dados estruturados retornados pela API (ex: resultado de tools)
  // userMessageIndex?: number;
}
