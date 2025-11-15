import { OffersToolResult } from "../../schemas/tools/offers";
import { CotacaoToolResult } from "./quote";

export interface ToolResultRegistry {
  cotar_produto_por_distribuidora: CotacaoToolResult;
  listar_ofertas_disponiveis: OffersToolResult;
}

export type ToolName = keyof ToolResultRegistry;
