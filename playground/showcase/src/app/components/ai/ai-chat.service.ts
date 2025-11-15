import { Injectable, signal, WritableSignal } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';

import { AssistantMessage } from './models/messages/assistant-message.interface';
import { SSEEvent, SSERawData, SSERequestConfig } from './models/sse.types';
import { UserMessage } from './models/messages/user-message.interface';
import { Turn } from './models/messages/turn.interface';

import { MessageStatus } from './types/message-status.type';
import { StructuredToolData } from './types/tool-result.type';

import { TOOL_SCHEMAS, ToolName } from './constants';

type ChatTurn = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

@Injectable()
export class AiChatService {
  private _currentUserMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly currentUserMessage$: Observable<string> = this._currentUserMessage$.asObservable();
  readonly isCurrentUserMessageValid$: Observable<boolean> = this.currentUserMessage$.pipe(
    map((message: string) => {
      const trimmed: string = message.trim();
      return trimmed.length > 0;
    })
  );

  selectedTextContext = signal<string | null>(null);

  /**
   * Array de conversas, onde cada conversa contém vários turnos.
   * Cada turno agrupa as mensagens do usuário com as respostas da IA.
   */
  messages: WritableSignal<Turn[][]> = signal<Turn[][]>([]);

  /**
   * Indica se há streaming em andamento
   */
  isStreaming: WritableSignal<boolean> = signal(false);

  constructor() {
  }

  updateCurrentUserMessage(message: string): void {
    this._currentUserMessage$.next(message);
  }

  sendMessage(): void {
    const message = this._currentUserMessage$.value;

    if (message.trim().length === 0) return;

    const userMessage: UserMessage = {
      message: message,
      role: 'user',
      status: 'sending',
      timeStamp: new Date(),
      selectedContext: this.selectedTextContext() ?? undefined
    };

    this.addUserMessage(userMessage);

    this._currentUserMessage$.next('');
    this.clearSelectedTextContext();

    this.streamAssistantResponse(userMessage);
  }

  getCurrentUserMessage(): string {
    return this._currentUserMessage$.value;
  }

  setSelectedTextContext(text: string): void {
    this.selectedTextContext.set(text);
  }

  clearSelectedTextContext(): void {
    this.selectedTextContext.set(null);
  }

  /**
   * Adiciona uma nova mensagem do usuário, criando um novo turno de conversa.
   * O turno inicia com a mensagem do usuário e um array vazio esperando a resposta da IA.
   */
  addUserMessage(message: UserMessage): void {
    this.messages.update((currentMessages) => {
      const updatedMessages: Turn[][] = [...currentMessages];

      const novoTurno: Turn = {
        userMessages: [
          {
            ...message,
            status: 'sent',
          }
        ],
        assistantMessages: []
      }

      if (updatedMessages.length === 0) {
        return [[novoTurno]];
      }

      const ultimaConversa: Turn[] = [...updatedMessages[updatedMessages.length - 1]];
      ultimaConversa.push(novoTurno);
      updatedMessages[updatedMessages.length - 1] = ultimaConversa;

      return updatedMessages;
    });
  }

  /**
   * Adiciona uma resposta da IA ao último turno criado.
   * Este método deve ser chamado depois de addUserMessage().
   */
  addAssistantMessage(message: AssistantMessage): void {
    this.messages.update((currentMessages) => {
      if (currentMessages.length === 0) {
        throw new Error('Não há conversas criadas. Adicione uma mensagem do usuário primeiro.');
      }

      const updatedMessages: Turn[][] = [...currentMessages];

      const ultimaConversa: Turn[] = [...updatedMessages[updatedMessages.length - 1]];

      if (ultimaConversa.length === 0) {
        throw new Error('Não há turnos criados. Adicione uma mensagem do usuário primeiro.');
      }

      const ultimoTurnoIndex: number = ultimaConversa.length - 1;
      const ultimoTurno: Turn = { ...ultimaConversa[ultimoTurnoIndex] };

      ultimoTurno.assistantMessages = [...ultimoTurno.assistantMessages, message];

      ultimaConversa[ultimoTurnoIndex] = ultimoTurno;
      updatedMessages[updatedMessages.length - 1] = ultimaConversa

      return updatedMessages;
    });
  }

  /**
   * Adiciona uma versão editada da pergunta do usuário em um turno específico.
   * Use este método quando o usuário editar uma mensagem que já foi enviada.
   *
   * @param conversationIndex - Índice da conversa (normalmente 0 para a conversa ativa)
   * @param turnoIndex - Índice do turno que será editado
   * @param message - A nova versão da mensagem
   */
  addUserMessageVersion(conversationIndex: number, turnoIndex: number, message: UserMessage): void {
    this.messages.update((currentMessages) => {
      const updatedMessages: Turn[][] = [...currentMessages];

      // Pega a conversa específica
      const conversa: Turn[] = [...updatedMessages[conversationIndex]];

      // Pega o turno específico
      const turno: Turn = { ...conversa[turnoIndex] };
      turno.userMessages = [...turno.userMessages, message];

      // Atualiza o turno na conversa
      conversa[turnoIndex] = turno;
      updatedMessages[conversationIndex] = conversa;

      return updatedMessages;
    });
  }

  /**
   * Adiciona uma versão alternativa da resposta da IA em um turno específico.
   * Use este método quando o usuário clicar em "regenerar resposta".
   *
   * @param conversationIndex - Índice da conversa (normalmente 0 para a conversa ativa)
   * @param turnoIndex - Índice do turno onde a resposta será regenerada
   * @param message - A nova versão da resposta
   */
  addAssistantMessageVersion(conversationIndex: number, turnoIndex: number, message: AssistantMessage): void {
    this.messages.update((currentMessages) => {
      const updatedMessages: Turn[][] = [...currentMessages];

      // Pega a conversa específica
      const conversa = [...updatedMessages[conversationIndex]];

      // Pega o turno específico
      const turno: Turn = { ...conversa[turnoIndex] };

      // Adiciona a nova versão ao array de respostas da IA
      turno.assistantMessages = [...turno.assistantMessages, message];

      // Atualiza o turno na conversa
      conversa[turnoIndex] = turno;
      updatedMessages[conversationIndex] = conversa;

      return updatedMessages;
    });
  }

  private updateLastAssistantMessageText(
    assistantMessage: string,
    conversationIndex?: number,
    turnoIndex?: number
  ): void {
    this.messages.update((currentMessages) => {
      if (currentMessages.length === 0) return currentMessages;

      const updatedMessages: Turn[][] = [...currentMessages];

      // Se não passar, usa última conversa
      const convIdx = conversationIndex ?? updatedMessages.length - 1;
      const conversation = [...updatedMessages[convIdx]];

      if (conversation.length === 0) return currentMessages;

      // Se não passar, usa último turno
      const turnIdx = turnoIndex ?? conversation.length - 1;
      const turn: Turn = { ...conversation[turnIdx] };

      const assistantMessages = [...turn.assistantMessages];

      if (assistantMessages.length === 0) return currentMessages;

      // SEMPRE atualiza última versão da resposta
      const lastMessageIndex = assistantMessages.length - 1;

      assistantMessages[lastMessageIndex] = {
        ...assistantMessages[lastMessageIndex],
        message: assistantMessage
      };

      turn.assistantMessages = assistantMessages;
      conversation[turnIdx] = turn;
      updatedMessages[convIdx] = conversation;

      return updatedMessages;
    });
  }

  /**
 * Adiciona dados estruturados (tool results) à última mensagem
 * Exemplo: resultado da cotação, dados de produto, etc.
 */
  private updateLastAssistantMessageStructuredData(structuredData: StructuredToolData): void {
    this.messages.update((currentMessages) => {
      // === ETAPA 1 a 4: Mesma lógica do método anterior ===
      if (currentMessages.length === 0) return currentMessages;

      const updatedMessages: Turn[][] = [...currentMessages];
      const lastConversationIndex = updatedMessages.length - 1;
      const lastConversation = [...updatedMessages[lastConversationIndex]];

      if (lastConversation.length === 0) return currentMessages;

      const lastTurnIndex = lastConversation.length - 1;
      const lastTurn: Turn = { ...lastConversation[lastTurnIndex] };

      const assistantMessages = [...lastTurn.assistantMessages];

      if (assistantMessages.length === 0) return currentMessages;

      const lastMessageIndex = assistantMessages.length - 1;

      // === ETAPA 5: Adicionar dados estruturados ===
      assistantMessages[lastMessageIndex] = {
        ...assistantMessages[lastMessageIndex],
        structuredData  // ← AQUI adiciona os dados da tool
      };

      // === ETAPA 6: Remontar estrutura ===
      lastTurn.assistantMessages = assistantMessages;
      lastConversation[lastTurnIndex] = lastTurn;
      updatedMessages[lastConversationIndex] = lastConversation;

      return updatedMessages;
    });
  }

  /**
  * Atualiza o status da última mensagem do assistente
  */
  private updateLastAssistantMessageStatus(
    newStatus: MessageStatus,
    conversationIndex?: number,
    turnoIndex?: number
  ): void {
    this.messages.update((currentMessages) => {
      if (currentMessages.length === 0) return currentMessages;

      const updatedMessages: Turn[][] = [...currentMessages];

      // Se não passar conversationIndex, usa a última conversa
      const convIdx = conversationIndex ?? updatedMessages.length - 1;
      const conversation = [...updatedMessages[convIdx]];

      if (conversation.length === 0) return currentMessages;

      // Se não passar turnoIndex, usa o último turno
      const turnIdx = turnoIndex ?? conversation.length - 1;
      const turn: Turn = { ...conversation[turnIdx] };

      const assistantMessages = [...turn.assistantMessages];

      if (assistantMessages.length === 0) return currentMessages;

      // Sempre atualiza a ÚLTIMA VERSÃO da resposta do assistente
      const lastMessageIndex = assistantMessages.length - 1;

      assistantMessages[lastMessageIndex] = {
        ...assistantMessages[lastMessageIndex],
        status: newStatus
      };

      turn.assistantMessages = assistantMessages;
      conversation[turnIdx] = turn;
      updatedMessages[convIdx] = conversation;

      return updatedMessages;
    });
  }

  /**
   * Regenera resposta para uma mensagem específica
   * A nova versão já deve ter sido adicionada antes de chamar este método
   */
  public regenerateResponse(
    conversationIndex: number,
    turnoIndex: number,
    userMessage: string
  ): void {
    this.isStreaming.set(true);

    const fullConversationHistory = this.formatHistoryForApi()

    const config: SSERequestConfig = {
      url: 'http://localhost:3000/api/chat/stream',
      // body: { mensagem: userMessage }
      body: { conversation: fullConversationHistory }
    };

    const stream$ = this.createSSEObservable(config);

    this.handleSSEStream(stream$, conversationIndex, turnoIndex);
  }

  // ------------------------------- MELHORADO ------------------------
  private streamAssistantResponse(userMessage: UserMessage): void {
    // 1. Marcar que está streamando
    this.isStreaming.set(true);

    // 2. Criando mensagem vazia do assistente para loading
    const assistantMessage: AssistantMessage = {
      message: '',
      role: 'assistant',
      status: 'sending',
      timeStamp: new Date()
    };
    this.addAssistantMessage(assistantMessage);

    const fullConversationHistory = this.formatHistoryForApi();

    const config: SSERequestConfig = {
      url: 'http://localhost:3000/api/chat/stream',
      // body: { mensagem: [userMessage.message, userMessage.selectedContext].filter(Boolean).join(' ') }
      body: { conversation: fullConversationHistory }
    };

    // 4. Criar stream
    const stream$: Observable<SSEEvent> = this.createSSEObservable(config);

    this.handleSSEStream(stream$);
  }

  /**
   * Processa stream SSE
   * Se não passar índices, atualiza última mensagem (novo envio)
   * Se passar índices, atualiza mensagem específica (regenerate)
   */
  private handleSSEStream(
    stream$: Observable<SSEEvent>,
    conversationIndex?: number,
    turnoIndex?: number
  ): void {
    let accumulatedText: string = '';
    let hasReceivedData = false;
    let hasError = false; // ← ADICIONAR FLAG DE ERRO

    stream$
      .subscribe({
        next: (event: SSEEvent) => {
          console.log('🔵 Evento recebido:', event);

          if (!hasReceivedData) {
            console.log('🔵 Primeira vez recebendo dados, marcando como streaming');
            this.updateLastAssistantMessageStatus('streaming', conversationIndex, turnoIndex);
            hasReceivedData = true;
          }

          switch (event.type) {
            case 'text':
              console.log('📝 Texto recebido:', event.text);
              accumulatedText += event.text;
              this.updateLastAssistantMessageText(accumulatedText);
              break;

            case 'tool_call':
              console.log(`🔧 Tool chamada: ${event.name}`, event.args);
              // TODO: Feedback visual futuro
              break;

            case 'tool_result':
              console.log('📊 Tool result recebido:', event.result);
              this.updateLastAssistantMessageStructuredData(event.result as StructuredToolData);
              break;

            case 'error':
              console.error('❌ Erro SSE recebido:', event.error);
              console.log('🔴 Atualizando status para error');
              hasError = true; // ← MARCAR QUE DEU ERRO
              this.updateLastAssistantMessageStatus('error', conversationIndex, turnoIndex);
              console.log('🔴 Status atualizado');
              break;
          }
        },
        error: (error) => {
          console.error('❌ Erro no stream:', error);
          this.updateLastAssistantMessageStatus('error', conversationIndex, turnoIndex);
          this.isStreaming.set(false);
        },
        complete: () => {
          console.log('✅ Stream finalizado');

          // Só marca como 'sent' se NÃO teve erro
          if (!hasError) {
            if (accumulatedText) {
              this.updateLastAssistantMessageText(accumulatedText, conversationIndex, turnoIndex);
            }
            this.updateLastAssistantMessageStatus('sent', conversationIndex, turnoIndex);
          }

          this.isStreaming.set(false);
        }
      });
  }

  /**
  * Cria Observable que consome SSE stream via POST
  */
  private createSSEObservable(config: SSERequestConfig): Observable<SSEEvent> {
    return new Observable<SSEEvent>(observer => {
      // Flag para cancelamento
      let cancelled = false;
      let currentToolName: ToolName | null = null;

      // Processa o stream (async)
      this.processSSEStream(config, observer, () => cancelled).catch(error => observer.error(error));

      // Cleanup
      return () => {
        cancelled = true;
      };
    });
  }

  private async processSSEStream(
    config: SSERequestConfig,
    observer: { next: (e: SSEEvent) => void; complete: () => void },
    isCancelled: () => boolean
  ): Promise<void> {
    // 1. Fazer request
    const response = await fetch(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      body: JSON.stringify(config.body)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('Response body é null');
    }

    // 2. Setup stream reader
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = '';
    let currentEvent = '';
    const currentToolNameRef = { value: null as ToolName | null };

    // 3. Ler chunks
    while (!isCancelled()) {
      const { done, value } = await reader.read();

      if (done) break;

      // 4. Decodificar e acumular
      buffer += decoder.decode(value, { stream: true });

      // 5. Processar linhas completas
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;

        // 6. Parsear linha SSE
        const parsed = this.parseSSELine(line);
        if (!parsed) continue;

        // 7. Atualizar evento atual
        if (parsed.type === 'event') {
          currentEvent = parsed.content;
          continue;
        }

        // 8. Processar data
        if (parsed.type === 'data') {
          try {
            const rawData: SSERawData = JSON.parse(parsed.content);
            const event = this.transformToSSEEvent(currentEvent, rawData, currentToolNameRef);

            if (event) {
              observer.next(event);
            }
          } catch (error) {
            console.warn('⚠️ Erro ao parsear data:', error);
          }
        }
      }
    }

    observer.complete();
  }

  /**
   * Parseia linha SSE (event: ou data:)
   */
  private parseSSELine(line: string): { type: 'event' | 'data'; content: string } |
    null {
    if (line.startsWith('event:')) {
      return { type: 'event', content: line.substring(6).trim() };
    }

    if (line.startsWith('data:')) {
      return { type: 'data', content: line.substring(5).trim() };
    }

    return null;
  }

  /**
  * Transforma dados brutos em evento tipado
  */
  private transformToSSEEvent(
    eventType: string,
    rawData: SSERawData,
    currentToolNameRef: { value: ToolName | null }
  ): SSEEvent | null {
    console.log('🔍 transformToSSEEvent chamado:', { eventType, rawData });

    // Evento de texto
    if (eventType === 'message' && rawData.text) {
      return { type: 'text', text: rawData.text };
    }

    // Tool call - pode vir de duas formas:
    // 1. event: tool_call + data: { name: "...", args: {...} }
    // 2. data: { type: 'tool_call', name: "...", args: {...} }
    if (eventType === 'tool_call' && rawData.name && rawData.args !== undefined) {
      currentToolNameRef.value = rawData.name as ToolName;
      console.log(`🔧 Tool detectada: ${rawData.name}`);
      return { type: 'tool_call', name: rawData.name, args: rawData.args };
    }

    if (rawData.type === 'tool_call' && rawData.name && rawData.args !== undefined) {
      currentToolNameRef.value = rawData.name as ToolName;
      console.log(`🔧 Tool detectada: ${rawData.name}`);
      return { type: 'tool_call', name: rawData.name, args: rawData.args };
    }

    // Tool result
    if (eventType === 'result') {
      const toolName = currentToolNameRef.value;

      if (toolName && TOOL_SCHEMAS[toolName]) {
        const schema = TOOL_SCHEMAS[toolName];
        const validation = schema.safeParse(rawData);

        if (validation.success) {
          console.log(`✅ Tool result validado: ${toolName}`);

          const structuredData: StructuredToolData = {
            toolName,
            data: validation.data
          };

          currentToolNameRef.value = null; // Reset

          return { type: 'tool_result', result: structuredData };
        } else {
          console.error(`❌ Validação falhou para ${toolName}:`, validation.error);
          currentToolNameRef.value = null;
        }
      } else {
        console.warn('⚠️ Tool result sem tool_call anterior ou schema não encontrado');
      }

      return null;
    }

    // Error - pode vir de duas formas:
    // 1. event: error + data: { error: "..." }
    // 2. data: { type: 'error', error: "..." }
    if (eventType === 'error' && rawData.error) {
      return { type: 'error', error: rawData.error };
    }

    if (rawData.type === 'error' && rawData.error) {
      return { type: 'error', error: rawData.error };
    }

    return null;
  }

  private formatHistoryForApi(): ChatTurn[] {
    const allConversations = this.messages();

    // Assumimos que a primeira conversa é a ativa
    const activeConversation = allConversations.length > 0 ? allConversations[0] : [];

    const apiTurns: ChatTurn[] = [];

    for (const turn of activeConversation) {

      // 1. Extrair a ÚLTIMA versão da mensagem do usuário
      const latestUserMessage = turn.userMessages[turn.userMessages.length - 1];

      if (latestUserMessage) {
        // Incluir contexto (se houver) na mensagem do usuário que será enviada
        const fullUserText = [latestUserMessage.message, latestUserMessage.selectedContext]
          .filter((part): part is string => !!part)
          .join(' ');

        apiTurns.push({
          role: 'user',
          parts: [{ text: fullUserText }]
        });
      }

      // 2. Extrair a ÚLTIMA versão da resposta do modelo
      const latestAssistantMessage = turn.assistantMessages[turn.assistantMessages.length - 1];

      // Incluímos a resposta do modelo SOMENTE se ela estiver COMPLETA ('sent').
      // Isso exclui placeholders e respostas em stream.
      if (latestAssistantMessage &&
        latestAssistantMessage.message &&
        latestAssistantMessage.status === 'sent') {

        apiTurns.push({
          role: 'model',
          parts: [{ text: latestAssistantMessage.message }]
        });
      }
    }

    // O array apiTurns agora contém o histórico completo, pronto para ser enviado.
    return apiTurns;
  }
}
