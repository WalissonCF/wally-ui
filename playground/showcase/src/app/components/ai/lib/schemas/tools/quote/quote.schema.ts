import { z } from "zod";

/**
 * Schema para informações do produto
 * Corresponde ao backend Node.js
 */
const productSchema = z.object({
  ean: z.string().describe("Código EAN do produto"),
  description: z.string().describe("Descrição do produto"),
  manufacturer: z.string().describe("Fabricante do produto")
});

/**
 * Schema para resumo da cotação
 * Corresponde ao backend Node.js
 */
const summarySchema = z.object({
  totalOffers: z.number().describe("Total de ofertas encontradas"),
  bestPrice: z.number().describe("Melhor preço encontrado"),
  bestPriceDistributor: z.string().describe("Distribuidor com melhor preço")
});

/**
 * Schema para cada oferta individual
 * Corresponde ao backend Node.js
 */
const offerSchema = z.object({
  distributor: z.string().describe("Nome do distribuidor"),
  condition: z.string().optional().describe("Condição de pagamento"),
  finalPrice: z.number().describe("Preço final do produto"),
  discount: z.number().optional().describe("Percentual de desconto"),
  stock: z.string().describe("Disponibilidade de estoque"),
  paymentTerm: z.string().optional().describe("Prazo de pagamento"),
  minimumValue: z.number().optional().describe("Valor mínimo de pedido")
});

/**
 * Schema completo da resposta da tool de cotação
 * Corresponde ao backend Node.js: quoteToolByDistributorResponseSchema
 */
export const CotacaoToolResultSchema = z.object({
  message: z.string().describe("Mensagem amigável para o usuário"),
  product: productSchema.optional(),
  summary: summarySchema.optional(),
  offers: z.array(offerSchema).optional()
});

// Type inference (ponte entre Zod e TypeScript)
export type CotacaoToolResultInferred = z.infer<typeof CotacaoToolResultSchema>;
