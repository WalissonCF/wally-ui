export interface SSERequestConfig {
  url: string;
  body: Record<string, any>;
  headers?: Record<string, string>;
}

export interface SSERawData {
  type?: string;
  text?: string;
  name?: string;
  args?: Record<string, any>;
  result?: unknown;
  error?: string;
}
