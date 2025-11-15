import z from 'zod';
import { CotacaoToolResultSchema } from './quote';

// Registry de schemas por nome de tool
export const ToolSchemaRegistry = {
  cotar_produto: CotacaoToolResultSchema,
  // Futuras tools aqui
} as const;

export type ToolSchemaName = keyof typeof ToolSchemaRegistry;


export function validateToolResult<T extends ToolSchemaName>(
  toolName: T,
  data: unknown
): z.SafeParseReturnType<unknown, z.infer<typeof ToolSchemaRegistry[T]>> {
  const schema = ToolSchemaRegistry[toolName];
  return schema.safeParse(data);
}
