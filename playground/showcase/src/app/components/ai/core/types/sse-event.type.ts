import { SSEErrorEvent, SSETextEvent, SSEToolCallEvent, SSEToolResultEvent } from "../models/sse.types";

export type SSEEvent = | SSETextEvent | SSEToolCallEvent | SSEToolResultEvent | SSEErrorEvent;
