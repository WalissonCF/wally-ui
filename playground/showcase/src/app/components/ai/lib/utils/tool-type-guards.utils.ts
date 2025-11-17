
import { CotacaoToolResultInferred } from '../schemas/tools/quote';
import { OffersToolResult } from '../schemas/tools/offers';

import type { StructuredToolData } from '../types/tool-result.type';

/**
 * Type guard para verificar se é resultado de cotação
 */
export function isQuoteResult(
  data: StructuredToolData | undefined
): data is StructuredToolData & { data: CotacaoToolResultInferred } {
  return data?.toolName === 'cotar_produto_por_distribuidora';
}

/**
 * Type guard para verificar se é resultado de ofertas
 */
export function isOffersResult(
  data: StructuredToolData | undefined
): data is StructuredToolData & { data: OffersToolResult } {
  return data?.toolName === 'listar_ofertas_disponiveis';
}
