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
