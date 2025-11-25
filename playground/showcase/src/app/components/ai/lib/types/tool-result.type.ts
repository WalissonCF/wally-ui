import { ToolName } from "../constants";

import { RecommendationToolResult } from "../schemas/tools/recommendation";
import { CotacaoToolResultInferred } from "../schemas/tools/quote";
import { OffersToolResult } from "../schemas/tools/offers";

export type AnyToolResult =
  | CotacaoToolResultInferred
  | OffersToolResult
  | RecommendationToolResult;

// Estrutura que armazena resultado + metadados
export interface StructuredToolData {
  toolName: ToolName;
  data: AnyToolResult;
}
