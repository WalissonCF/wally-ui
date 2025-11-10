// TODO: TEMPORARIO - Arquivo completo para deletar depois
import { z } from 'zod';

export const OfertaSchema = z.object({
  distribuidor: z.string(),
  precoFinal: z.number(),
  estoque: z.string(),
  condicao: z.string(),
  desconto: z.number(),
  prazoPagamento: z.string(),
  valorMinimo: z.number()
});

export const CotacaoResponseSchema = z.object({
  mensagem: z.string(),
  produto: z.object({
    ean: z.string(),
    descricao: z.string(),
    fabricante: z.string()
  }),
  resumo: z.object({
    totalOfertas: z.number(),
    melhorPreco: z.number(),
    distribuidorMelhorPreco: z.string()
  }),
  ofertas: z.array(OfertaSchema)
});

export type CotacaoResponse = z.infer<typeof CotacaoResponseSchema>;
export type Oferta = z.infer<typeof OfertaSchema>;
