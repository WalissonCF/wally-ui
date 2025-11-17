import { Component } from '@angular/core';

import { AiMessageList } from '../ai-message-list/ai-message-list';
import { AiComposer } from '../ai-composer/ai-composer';
import { AiMessage } from '../ai-message/ai-message';

import { AssistantMessage } from '../lib/models/messages/assistant-message.interface';
import { EditMessageInterface } from '../lib/models/messages/edit-message.interface';
import { UserMessage } from '../lib/models/messages/user-message.interface';
import { AiChatService } from '../lib/service/ai-chat.service';
import { isUserMessage } from '../lib/types/message.type';

/**
  * Main AI chat container component.
  *
  * Manages the conversation lifecycle including:
  * - User message editing
  * - Assistant response regeneration
  * - Message versioning (alternative versions)
  *
  * Each conversation consists of multiple turns, where each turn can have
  * multiple versions of both user and assistant messages.
  *
  * @example
  * ```html
  * <wally-ai-chat></wally-ai-chat>
  * ```
  */
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

  /**
   * Handles user message editing.
   *
   * Creates a new version of the edited user message and requests
   * a new AI response for that version.
   *
   * Flow:
   * 1. Adds new version of the user message
   * 2. Creates empty assistant message (status: sending)
   * 3. Calls AI to generate new response
   *
   * @param editedMessage - Edited message data containing conversation/turn indices and message content
   */
  onEditMessageSubmitted(editedMessage: EditMessageInterface): void {
    if (isUserMessage(editedMessage.message)) {
      this.aiChatService.addUserMessageVersion(
        editedMessage.conversationIndex,
        editedMessage.turnoIndex,
        { ...editedMessage.message }
      );

      const userMessages = this.aiChatService.messages()
      [editedMessage.conversationIndex]
      [editedMessage.turnoIndex].userMessages;

      const newUserMessageIndex = userMessages.length - 1;

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
        editedMessage.message.message
      );
    }
  }

  /**
   * Handles assistant response regeneration.
   *
   * Creates a new version of the assistant response while keeping
   * the same user message.
   *
   * Flow:
   * 1. Identifies the original user message
   * 2. Creates new empty assistant message
   * 3. Calls AI to generate new response
   *
   * @param editedMessage - Context of the message to regenerate including version index
   */
  onMessageRegenerated(editedMessage: EditMessageInterface): void {
    const assistantMessages: AssistantMessage[] = this.aiChatService.messages()
    [editedMessage.conversationIndex]
    [editedMessage.turnoIndex].assistantMessages;

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
