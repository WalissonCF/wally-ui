import { SSEErrorEvent, SSETextEvent, SSEToolCallEvent, SSEToolResultEvent } from "../models/sse/sse-event.interface";

export type SSEEvent = | SSETextEvent | SSEToolCallEvent | SSEToolResultEvent | SSEErrorEvent;
