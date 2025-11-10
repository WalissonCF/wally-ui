import { afterNextRender, Component } from '@angular/core';

import { AiMessageList } from '../ai-message-list/ai-message-list';
import { AiComposer } from '../ai-composer/ai-composer';
import { AiMessage } from '../ai-message/ai-message';
import { AiChatService } from '../ai-chat.service';

import { AssistantMessage } from '../types/assistant-message.interface';
import { EditMessageInterface } from '../types/edit-message.interface';
import { isUserMessage, Message } from '../types/message.type';
import { UserMessage } from '../types/user-message.interface';

@Component({
  selector: 'wally-ai-chat',
  imports: [
    AiComposer,
    AiMessageList,
    AiMessage,
  ],
  providers: [
    AiChatService
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChat {

  constructor(
    public aiChatService: AiChatService
  ) {
    // afterNextRender(() => {
    //   this.inicializarConversa();
    // });
  }

  // onMessageSubmitted(message: string): void {
  //   const userMessage: Message = {
  //     message: message,
  //     role: 'user'
  //   };

  //   this.aiChatService.addUserMessage(userMessage);
  // }

  onEditMessageSubmitted(editedMessage: EditMessageInterface): void {
    if (isUserMessage(editedMessage.message)) {
      this.aiChatService.addUserMessageVersion(
        editedMessage.conversationIndex,
        editedMessage.turnoIndex,
        { ...editedMessage.message }
      );

      const userMessages = this.aiChatService.messages()
      [editedMessage.conversationIndex]
      [editedMessage.turnoIndex]
        .userMessages;

      const newUserMessageIndex = userMessages.length - 1;
      // última
      // versão adicionada

      // 3. TODO: Chamar a IA com a nova mensagem
      // 4. Quando receber a resposta, adicionar com userMessageIndex
      // correto
      this.aiChatService.addAssistantMessageVersion(
        editedMessage.conversationIndex,
        editedMessage.turnoIndex,
        {
          message: 'Resposta da IA aqui',
          role: 'assistant',
          sourceUserMessageIndex: newUserMessageIndex // ← Link correto
        }
      );
    }
  }

  onMessageRegenerated(editedMessage: EditMessageInterface): void {
    const assistantMessages: AssistantMessage[] = this.aiChatService.messages()
    [editedMessage.conversationIndex]
    [editedMessage.turnoIndex]
      .assistantMessages;

    const currentAssistantMessage: AssistantMessage = assistantMessages[editedMessage.displayedVersionIndex ?? assistantMessages.length - 1];

    const userMessageIndex: number = currentAssistantMessage.sourceUserMessageIndex ?? 0;

    const userMessage: UserMessage = this.aiChatService.messages()[editedMessage.conversationIndex][editedMessage.turnoIndex].userMessages[userMessageIndex];

    this.aiChatService.addAssistantMessageVersion(
      editedMessage.conversationIndex,
      editedMessage.turnoIndex,
      {
        message: userMessage.message,
        role: 'assistant',
        status: 'sending',
        timeStamp: new Date(),
        sourceUserMessageIndex: userMessageIndex
      }
    );
  }
}
