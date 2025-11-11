// 1. Evento bruto que chega do backend (antes de parsear)
export interface SSERawData {
  type?: string;
  text?: string;
  name?: string;
  args?: Record<string, any>;
  result?: unknown;
  error?: string;
}

// 2. Eventos tipados (depois de parsear)
export interface SSETextEvent {
  type: 'text';
  text: string;
}

export interface SSEToolCallEvent {
  type: 'tool_call';
  name: string;
  args: Record<string, any>;
}

export interface SSEToolResultEvent {
  type: 'tool_result';
  result: unknown;
}

export interface SSEErrorEvent {
  type: 'error';
  error: string;
}

export type SSEEvent = | SSETextEvent | SSEToolCallEvent | SSEToolResultEvent | SSEErrorEvent;

export interface SSERequestConfig {
  url: string;
  body: Record<string, any>;
  headers?: Record<string, string>;
}
