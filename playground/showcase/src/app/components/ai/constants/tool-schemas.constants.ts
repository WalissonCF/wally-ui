import { z } from 'zod';
import { CotacaoToolResultSchema } from '../core/schemas/tools/quote';
import { OffersToolResultSchema } from '../core/schemas/tools/offers';

// Mapa que associa nome da tool ao seu schema
export const TOOL_SCHEMAS = {
  'cotar_produto_por_distribuidora': CotacaoToolResultSchema,
  'listar_ofertas_disponiveis': OffersToolResultSchema,
} as const;

// Type helper para nomes de tools
export type ToolName = keyof typeof TOOL_SCHEMAS;

// Type helper para resultado validado
export type ToolResult<T extends ToolName> = z.infer<typeof TOOL_SCHEMAS[T]>;
