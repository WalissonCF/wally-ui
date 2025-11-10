import { Injectable, signal, WritableSignal } from '@angular/core';

import { Turn } from './types/turn.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserMessage } from './types/user-message.interface';
import { Message } from './types/message.type';
import { AssistantMessage } from './types/assistant-message.interface';
import { CotacaoResponseSchema, type CotacaoResponse } from './temp-cotacao-schema'; // TODO: TEMPORARIO

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

    // Chama a API de streaming
    this.callStreamingAPI(message);
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

      // -1 pois o lenght pode ser 3 porém o indice é 2 já que começa de 0
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

  /**
   * Retorna todas as mensagens do usuário de um turno específico.
   * Útil para templates que precisam acessar as versões das mensagens.
   */
  // getUserMessages(conversationIndex: number, turnIndex: number): Message[] {
  //     const conversation = this.messages()[conversationIndex];
  //     if (!conversation) return [];

  //     const turn = conversation[turnIndex];
  //     return turn?.userMessages || [];
  // }

  /**
   * Retorna todas as respostas da IA de um turno específico.
   * Útil para templates que precisam acessar as versões das respostas.
   */
  // getAssistantMessages(conversationIndex: number, turnIndex: number): Message[] {
  //     const conversation = this.messages()[conversationIndex];
  //     if (!conversation) return [];

  //     const turn = conversation[turnIndex];
  //     return turn?.assistantMessages || [];
  // }

  // ---------------------------------------------------------------------------
  // MÉTODOS DE STREAMING
  // ---------------------------------------------------------------------------

  /**
   * Simula o streaming de uma resposta da IA, revelando o texto caractere por caractere.
   * Este método cria uma experiência mais natural, como se a IA estivesse "digitando".
   *
   * @param fullMessage - O texto completo que será exibido gradualmente
   * @param speedMs - Velocidade em milissegundos entre cada caractere (padrão: 20ms)
   */
  // streamAssistantMessage(fullMessage: string, userMessageIndex: number, speedMs: number = 20): void {
  //   // Marca que o streaming começou (útil para mostrar indicadores visuais)
  //   this.isStreaming.set(true);

  //   let currentText = '';
  //   let currentIndex = 0;

  //   // Adiciona uma mensagem vazia que será preenchida gradualmente
  //   this.addAssistantMessage({ message: '', role: 'assistant', sourceUserMessageIndex: userMessageIndex });

  //   // Cria um intervalo que adiciona um caractere por vez
  //   const intervalId = setInterval(() => {
  //     // Quando terminar de mostrar toda a mensagem, para o intervalo
  //     if (currentIndex >= fullMessage.length) {
  //       clearInterval(intervalId);
  //       this.isStreaming.set(false);
  //       return;
  //     }

  //     // Adiciona o próximo caractere ao texto atual
  //     currentText += fullMessage[currentIndex];
  //     currentIndex++;

  //     // Atualiza a mensagem no Signal com o texto expandido
  //     this.updateLastAssistantMessage(currentText);

  //   }, speedMs);
  // }

  /**
   * Atualiza o texto da última resposta da IA na conversa ativa.
   * Este é um método auxiliar usado pelo streaming para ir construindo o texto gradualmente.
   *
   * @param newText - O texto atualizado a ser exibido
   */
  // private updateLastAssistantMessage(newText: string): void {
  //   this.messages.update((currentMessages) => {
  //     if (currentMessages.length === 0) return currentMessages;

  //     const updatedMessages: Turn[][] = [...currentMessages];

  //     // Pega a última conversa
  //     const ultimaConversa = [...updatedMessages[updatedMessages.length - 1]];

  //     if (ultimaConversa.length === 0) return currentMessages;

  //     // Pega o último turno dessa conversa
  //     const ultimoTurnoIndex = ultimaConversa.length - 1;
  //     const ultimoTurno: Turn = { ...ultimaConversa[ultimoTurnoIndex] };

  //     // Atualiza a última resposta da IA com o novo texto
  //     const respostas = [...ultimoTurno.assistantMessages];
  //     if (respostas.length === 0) return currentMessages;

  //     const ultimaRespostaIndex = respostas.length - 1;
  //     respostas[ultimaRespostaIndex] = {
  //       ...respostas[ultimaRespostaIndex],
  //       message: newText
  //     };

  //     ultimoTurno.assistantMessages = respostas;
  //     ultimaConversa[ultimoTurnoIndex] = ultimoTurno;
  //     updatedMessages[updatedMessages.length - 1] = ultimaConversa;

  //     return updatedMessages;
  //   });
  // }

  /**
   * Inicia uma nova conversa vazia.
   * Útil quando o usuário quer começar um chat completamente novo.
   */
  // startNewConversation(): void {
  //   this.messages.update((currentMessages) => {
  //     const updatedMessages: Turn[][] = [...currentMessages];
  //     updatedMessages.push([]);
  //     return updatedMessages;
  //   });
  // }

  /**
   * Retorna a conversa ativa atual (a última conversa no array).
   */
  // getCurrentConversation(): Turn[] {
  //   const allConversations = this.messages();
  //   if (allConversations.length === 0) return [];
  //   return allConversations[allConversations.length - 1];
  // }

  /**
   * Retorna o número total de turnos na conversa ativa.
   */
  // getTotalTurns(): number {
  //   return this.getCurrentConversation().length;
  // }

  // ---------------------------------------------------------------------------
  // MÉTODOS TEMPORÁRIOS PARA API STREAMING
  // ---------------------------------------------------------------------------

  /**
   * Chama a API de streaming e processa os eventos SSE usando RxJS.
   * TODO: TEMPORARIO
   */
  private callStreamingAPI(message: string): void {
    this.isStreaming.set(true);

    // Adiciona mensagem do assistente vazia
    const assistantMessage: AssistantMessage = {
      message: '',
      role: 'assistant',
      status: 'sending',
      timeStamp: new Date()
    };
    this.addAssistantMessage(assistantMessage);

    // Cria Observable para processar o SSE stream do POST
    const streamObservable = this.createSSEObservable('http://localhost:3000/api/chat/stream', {
      mensagem: message
    });

    // TODO: TEMPORARIO - Subscreve e vai acumulando o texto ou processando dados estruturados
    let accumulatedText = '';
    streamObservable.subscribe({
      next: (event) => {
        if (event.type === 'text') {
          accumulatedText += event.data;
          this.updateLastAssistantMessageText(accumulatedText);
        } else if (event.type === 'result') {
          // Adiciona dados estruturados à mensagem
          this.updateLastAssistantMessageStructuredData(event.data);
        }
      },
      error: (error) => {
        console.error('❌ Erro ao chamar API:', error);
        this.isStreaming.set(false);
      },
      complete: () => {
        console.log('✅ Stream finalizado');
        this.isStreaming.set(false);
      }
    });
  }

  /**
   * Cria um Observable que faz POST e processa SSE stream usando RxJS.
   * TODO: TEMPORARIO
   */
  private createSSEObservable(url: string, body: any): Observable<{ type: 'text' | 'result', data: any }> {
    return new Observable<{ type: 'text' | 'result', data: any }>(observer => {
      let aborted = false;
      let currentEvent = '';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          if (!response.body) {
            throw new Error('Response body is null');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (!aborted) {
            const { done, value } = await reader.read();

            if (done) {
              observer.complete();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('event:')) {
                currentEvent = line.substring(6).trim();
                console.log('📌 Evento recebido:', currentEvent); // TODO: TEMPORARIO - Debug
                continue;
              }

              if (line.startsWith('data:')) {
                try {
                  const data = JSON.parse(line.substring(5).trim());
                  console.log('📦 Data recebido:', currentEvent, data); // TODO: TEMPORARIO - Debug

                  // TODO: TEMPORARIO - Processa eventos diferentes
                  if (currentEvent === 'message' && data.text) {
                    observer.next({ type: 'text', data: data.text });
                  }

                  if (currentEvent === 'result') {
                    console.log('✅ Processando result:', data); // TODO: TEMPORARIO - Debug

                    // TODO: TEMPORARIO - Valida com Zod
                    const validated = CotacaoResponseSchema.safeParse(data);
                    if (validated.success) {
                      console.log('✅ Validação Zod passou!', validated.data);
                      observer.next({ type: 'result', data: validated.data });
                    } else {
                      console.warn('⚠️ Validação Zod falhou:', validated.error);
                      observer.next({ type: 'result', data }); // Envia mesmo assim
                    }
                  }

                  if (data.error) {
                    observer.error(new Error(data.error));
                  }
                } catch (e) {
                  console.warn('⚠️ Erro ao parsear data:', line, e); // TODO: TEMPORARIO - Debug
                }
              }
            }
          }
        })
        .catch(error => {
          if (!aborted) {
            observer.error(error);
          }
        });

      return () => {
        aborted = true;
      };
    });
  }

  /**
   * Atualiza o texto da última mensagem do assistente.
   * TODO: TEMPORARIO
   */
  private updateLastAssistantMessageText(newText: string): void {
    this.messages.update((currentMessages) => {
      if (currentMessages.length === 0) return currentMessages;

      const updatedMessages: Turn[][] = [...currentMessages];
      const ultimaConversa = [...updatedMessages[updatedMessages.length - 1]];

      if (ultimaConversa.length === 0) return currentMessages;

      const ultimoTurnoIndex = ultimaConversa.length - 1;
      const ultimoTurno: Turn = { ...ultimaConversa[ultimoTurnoIndex] };

      const respostas = [...ultimoTurno.assistantMessages];
      if (respostas.length === 0) return currentMessages;

      const ultimaRespostaIndex = respostas.length - 1;
      respostas[ultimaRespostaIndex] = {
        ...respostas[ultimaRespostaIndex],
        message: newText
      };

      ultimoTurno.assistantMessages = respostas;
      ultimaConversa[ultimoTurnoIndex] = ultimoTurno;
      updatedMessages[updatedMessages.length - 1] = ultimaConversa;

      return updatedMessages;
    });
  }

  /**
   * Atualiza os dados estruturados da última mensagem do assistente.
   * TODO: TEMPORARIO
   */
  private updateLastAssistantMessageStructuredData(structuredData: any): void {
    this.messages.update((currentMessages) => {
      if (currentMessages.length === 0) return currentMessages;

      const updatedMessages: Turn[][] = [...currentMessages];
      const ultimaConversa = [...updatedMessages[updatedMessages.length - 1]];

      if (ultimaConversa.length === 0) return currentMessages;

      const ultimoTurnoIndex = ultimaConversa.length - 1;
      const ultimoTurno: Turn = { ...ultimaConversa[ultimoTurnoIndex] };

      const respostas = [...ultimoTurno.assistantMessages];
      if (respostas.length === 0) return currentMessages;

      const ultimaRespostaIndex = respostas.length - 1;
      respostas[ultimaRespostaIndex] = {
        ...respostas[ultimaRespostaIndex],
        structuredData
      };

      ultimoTurno.assistantMessages = respostas;
      ultimaConversa[ultimoTurnoIndex] = ultimoTurno;
      updatedMessages[updatedMessages.length - 1] = ultimaConversa;

      return updatedMessages;
    });
  }
}
