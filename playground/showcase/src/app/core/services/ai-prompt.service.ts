import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AiPromptService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  generateClaudeUrl(pageUrl?: string): string {
    const url = pageUrl || this.getCurrentUrl();
    const basePrompt = `I'm looking at this Wally UI documentation: ${url} Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

    return `https://claude.ai/new?q=${encodeURIComponent(basePrompt)}`;
  }

  generateChatGptUrl(pageUrl?: string): string {
    const url = pageUrl || this.getCurrentUrl();
    const basePrompt = `I'm looking at this Wally UI documentation: ${url} Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

    return `https://chatgpt.com/?prompt=${encodeURIComponent(basePrompt)}`;
  }

  private getCurrentUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.href;
    }
    // Fallback for SSR - you can customize this
    return 'https://wally-ui.com/components/button';
  }

  generateCustomPromptUrl(aiService: 'claude' | 'chatgpt', customPrompt: string, pageUrl?: string): string {
    const url = pageUrl || this.getCurrentUrl();
    const fullPrompt = `${customPrompt} ${url}`;

    if (aiService === 'claude') {
      return `https://claude.ai/new?q=${encodeURIComponent(fullPrompt)}`;
    } else {
      return `https://chatgpt.com/?prompt=${encodeURIComponent(fullPrompt)}`;
    }
  }
}