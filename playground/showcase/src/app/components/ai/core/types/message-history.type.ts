export type MessageHistory = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};
