import { ToolName } from "../constants";

import { CotacaoToolResultInferred } from "../schemas/tools/quote";
import { OffersToolResult } from "../schemas/tools/offers";

export type AnyToolResult =
  | CotacaoToolResultInferred
  | OffersToolResult;

// Estrutura que armazena resultado + metadados
export interface StructuredToolData {
  toolName: ToolName;
  data: AnyToolResult;
}
