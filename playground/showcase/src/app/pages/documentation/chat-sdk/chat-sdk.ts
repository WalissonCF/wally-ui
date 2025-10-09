import { Component } from '@angular/core';

import { Breadcrumb, BreadcrumbItem } from '../../../components/breadcrumb/breadcrumb';
import { AiChat } from '../../../components/ai/ai-chat/ai-chat';

@Component({
  selector: 'app-chat-sdk',
  imports: [
    Breadcrumb,
    AiChat
  ],
  templateUrl: './chat-sdk.html'
})
export class ChatSdk {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Documentation', url: '/documentation' },
    { label: 'Chat SDK' }
  ];
}
