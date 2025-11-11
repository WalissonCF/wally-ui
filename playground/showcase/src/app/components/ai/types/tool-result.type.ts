import { ToolName, ToolResultRegistry } from "../models/tools";

export type ToolResult<T extends ToolName = ToolName> = ToolResultRegistry[T];
