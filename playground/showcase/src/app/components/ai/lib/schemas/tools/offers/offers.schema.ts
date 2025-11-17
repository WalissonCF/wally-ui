import { z } from "zod";

export const DataOfferSchema = z.object({
  id: z.string(),
  codDistribuidora: z.number(),
  codigoOferta: z.string(),
  nomeDistribuidora: z.string(),
  nomeOferta: z.string(),
  prazo: z.number(),
  quantidadeMinima: z.number(),
  valorMinimo: z.string()
});

// Schema completo da resposta
export const OffersToolResultSchema = z.object({
  success: z.boolean(),
  data: z.array(DataOfferSchema)
});

// Type inference
export type OffersToolResult = z.infer<typeof OffersToolResultSchema>;
export type DataOffer = z.infer<typeof DataOfferSchema>;
