export type MassegeHistory = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};
