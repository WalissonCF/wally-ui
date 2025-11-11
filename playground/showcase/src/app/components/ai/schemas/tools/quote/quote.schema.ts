import z from "zod";

export const ProdutoSchema = z.object({
  ean: z.string().length(13, 'EAN deve ter 13 dígitos'),
  descricao: z.string().min(1, 'Descrição obrigatória'),
  fabricante: z.string().min(1, 'Fabricante obrigatório')
});

// 2. Schema para Oferta
export const OfertaSchema = z.object({
  distribuidor: z.string(),
  precoFinal: z.number().positive('Preço deve ser positivo'),
  estoque: z.string(),
  condicao: z.string(),
  desconto: z.number().min(0).max(100),
  prazoPagamento: z.string(),
  valorMinimo: z.number().nonnegative()
});

// 3. Schema para Resumo
export const ResumoSchema = z.object({
  totalOfertas: z.number().int().nonnegative(),
  melhorPreco: z.number().positive(),
  distribuidorMelhorPreco: z.string()
});

// 4. Schema completo de Cotação
export const CotacaoToolResultSchema = z.object({
  mensagem: z.string(),
  produto: ProdutoSchema,
  resumo: ResumoSchema,
  ofertas: z.array(OfertaSchema)
});

// 5. Type inference (ponte entre Zod e TypeScript)
export type CotacaoToolResultInferred = z.infer<typeof CotacaoToolResultSchema>;
