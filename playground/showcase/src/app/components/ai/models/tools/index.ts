import { CotacaoToolResult } from "./quote";

export interface ToolResultRegistry {
  cotar_produto: CotacaoToolResult;
  // Futuras tools aqui
}

export type ToolName = keyof ToolResultRegistry;
