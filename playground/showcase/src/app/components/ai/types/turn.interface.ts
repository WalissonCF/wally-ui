import { AssistantMessage } from './assistant-message.interface';
import { UserMessage } from './user-message.interface';

/**
 * Representa um turno completo de conversa.
 * Um turno é composto por:
 * - Mensagens do usuário (incluindo todas as versões editadas)
 * - Respostas da IA (incluindo todas as versões regeneradas)
 */
export interface Turn {
    userMessages: UserMessage[];      // Todas as versões da pergunta do usuário
    assistantMessages: AssistantMessage[]; // Todas as versões da resposta da IA
}
