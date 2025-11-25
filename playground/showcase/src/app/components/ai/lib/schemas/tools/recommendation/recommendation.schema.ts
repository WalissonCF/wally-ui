import { z } from "zod";

const productInfoSchema = z.object({
    ean: z.string().describe("Código EAN do produto"),
    product: z.string().describe("Nome completo do produto"),
    manufacturer: z.string().describe("Fabricante/laboratório do produto"),
    group: z.string().describe("Grupo macro do produto (VITAMINA, OTC, etc)")
});

const purchaseDetailsSchema = z.object({
    unitCost: z.number().describe("Custo unitário do produto"),
    itemsToBuy: z.number().describe("Quantidade recomendada para compra"),
    suggestedSalePrice: z.number().describe("Preço sugerido de venda"),
    salePriceMethod: z.string().optional().describe("Método usado para calcular preço de venda"),
    roi: z.number().describe("Retorno sobre investimento (%)"),
    costSource: z.string().optional().describe("Origem do custo unitário"),
    unitsMethod: z.string().optional().describe("Método usado para calcular unidades necessárias"),
    investmentValue: z.number().describe("Valor total de investimento para este produto"),
    estimatedProfit: z.number().describe("Lucro estimado total para este produto")
});

const recommendationItemSchema = z.object({
    ...productInfoSchema.shape,
    ...purchaseDetailsSchema.shape
});

const summarySchema = z.object({
    totalRecommendations: z.number().describe("Quantidade total de produtos recomendados"),
    totalInvestment: z.number().describe("Valor total de investimento necessário"),
    totalEstimatedProfit: z.number().describe("Lucro total estimado")
});

export const recommendationResultSchema = z.object({
    message: z.string().describe("Mensagem amigável para o usuário sobre as recomendações"),
    summary: summarySchema,
    recommendations: z.array(recommendationItemSchema)
});

export type RecommendationToolResult = z.infer<typeof recommendationResultSchema>;
