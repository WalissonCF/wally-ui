import { Message } from './message.interface';

/**
 * Representa um turno completo de conversa.
 * Um turno é composto por:
 * - Mensagens do usuário (incluindo todas as versões editadas)
 * - Respostas da IA (incluindo todas as versões regeneradas)
 */
export interface Turn {
    userMessages: Message[];      // Todas as versões da pergunta do usuário
    assistantMessages: Message[]; // Todas as versões da resposta da IA
}