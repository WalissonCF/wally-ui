import { Component } from '@angular/core';

import { AiMessageList } from '../ai-message-list/ai-message-list';
import { AiComposer } from '../ai-composer/ai-composer';
import { AiMessage } from '../ai-message/ai-message';
import { AiChatService } from '../core/service/ai-chat.service';

import { AssistantMessage } from '../core/models/messages/assistant-message.interface';
import { EditMessageInterface } from '../core/models/messages/edit-message.interface';
import { UserMessage } from '../core/models/messages/user-message.interface';

import { isUserMessage } from '../core/types/message.type';

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
  ) { }

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
          message: '',
          role: 'assistant',
          status: 'sending',
          timeStamp: new Date(),
          sourceUserMessageIndex: newUserMessageIndex
        }
      );

      this.aiChatService.regenerateResponse(
        editedMessage.conversationIndex,
        editedMessage.turnoIndex,
        editedMessage.message.message  // ← Mensagem editada do usuário
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
        message: '',
        role: 'assistant',
        status: 'sending',
        timeStamp: new Date(),
        sourceUserMessageIndex: userMessageIndex
      }
    );

    this.aiChatService.regenerateResponse(
      editedMessage.conversationIndex,
      editedMessage.turnoIndex,
      userMessage.message
    );
  }
}
