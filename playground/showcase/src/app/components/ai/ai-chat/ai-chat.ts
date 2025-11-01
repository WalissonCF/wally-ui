import { afterNextRender, Component, OnInit, signal, WritableSignal } from '@angular/core';

import { AiMessageList } from '../ai-message-list/ai-message-list';
import { AiComposer } from '../ai-composer/ai-composer';
import { AiChatService } from '../ai-chat.service';
import { AiMessage } from '../ai-message/ai-message';

import { Message } from '../types/message.interface';

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
export class AiChat implements OnInit {
  textSelected: WritableSignal<string> = signal<string>('');

  constructor(
    public aiChatService: AiChatService
  ) {
    afterNextRender(() => {
      this.inicializarConversa();
    });
  }

  private inicializarConversa(): void {
    // =================================================================
    // TURNO 1: Pergunta sobre pão de alho
    // =================================================================

    // O usuário envia a primeira versão da pergunta
  this.aiChatService.addUserMessage({
  message: `
Aqui está um [link para o Google](https://www.google.com).

E aqui está um link direto: https://www.angular.dev
  `,
  role: 'user'
});

    // A IA responde com streaming (primeira versão da resposta)
    const respostaCompleta = `Garlic bread with cheese: What the science tells us

For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.

But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country.`;

    this.aiChatService.streamAssistantMessage(respostaCompleta, 20);

    // Depois de um tempo, o usuário decide editar a pergunta original
    // Vamos simular isso com um setTimeout para dar tempo do streaming terminar
    setTimeout(() => {
      // Adiciona a segunda versão da pergunta do usuário no turno 0 (primeiro turno)
      // Agora o indicador deveria mostrar 1/2
      this.aiChatService.addUserMessageVersion(0, 0, {
        message: `
# Como usar Signals no Angular

Os **Signals** são uma nova forma de gerenciar estado no Angular. Aqui está um exemplo básico:

\`\`\`typescript
import { signal, computed } from '@angular/core';

// Criando um signal
const count = signal(0);

// Criando um computed (valor derivado)
const doubled = computed(() => count() * 2);

// Atualizando o signal
count.set(5);
console.log(doubled()); // 10
\`\`\`

Note que você precisa *chamar* o signal como uma função para ler seu valor. Isso é diferente de simplesmente acessar uma propriedade!
  `,
        role: 'user'
      });

      // O usuário edita mais uma vez, criando uma terceira versão
      // Agora o indicador deveria mostrar 1/3, 2/3, 3/3 conforme você navega
      this.aiChatService.addUserMessageVersion(0, 0, {
        message: 'Qual é a história e origem do pão de alho com queijo?',
        role: 'user'
      });

      // Vamos também adicionar versões alternativas da resposta da IA
      // Como se tivéssemos clicado em "regenerar resposta" duas vezes
      this.aiChatService.addAssistantMessageVersion(0, 0, {
        message: `O pão de alho com queijo é uma variação deliciosa do tradicional pão de alho.

Sua origem remonta à culinária italiana, onde o pão com alho já era um acompanhamento comum. A adição do queijo tornou o prato ainda mais popular, especialmente em pizzarias e restaurantes italianos ao redor do mundo.

O preparo geralmente envolve fatias de pão, manteiga, alho picado ou em pó, e queijos como mussarela ou parmesão. O conjunto é assado até que o queijo derreta e o pão fique crocante.`,
        role: 'assistant'
      });

      this.aiChatService.addAssistantMessageVersion(0, 0, {
        message: `Pão de alho com queijo: uma combinação irresistível!

Este prato popular tem raízes na culinária mediterrânea, mas ganhou o mundo com suas próprias variações. No Brasil, por exemplo, é praticamente obrigatório em churrascarias e pizzarias.

A mágica está na combinação: a crocância do pão tostado, o aroma intenso do alho, a cremosidade do queijo derretido e, frequentemente, um toque de ervas como orégano ou manjericão.

Interessante notar que, apesar de ser chamado de "pão de alho italiano", na Itália tradicional é mais comum encontrar apenas bruschetta com alho, sem o queijo derretido que tanto amamos.`,
        role: 'assistant'
      });
    }, 3000); // Espera 3 segundos para o streaming terminar
  }

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {

    // }
  }

  handleTextSelected(text: string): void {
    console.log('📝 Texto selecionado:', text);
    this.textSelected.set(text);
  }

  onMessageSubmitted(message: string): void {
    const userMessage: Message = {
      message: message,
      role: 'user'
    };

    this.aiChatService.addUserMessage(userMessage);
  }
}
