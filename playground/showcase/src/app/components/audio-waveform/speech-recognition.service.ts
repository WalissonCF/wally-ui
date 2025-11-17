import { afterNextRender, Injectable, signal, WritableSignal } from '@angular/core';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Injectable()
export class SpeechRecognitionService {
  transcribedText: WritableSignal<string> = signal<string>('');
  interimText: WritableSignal<string> = signal<string>('');
  isTranscribing: WritableSignal<boolean> = signal<boolean>(false);
  error: WritableSignal<string | null> = signal<string | null>(null);
  isSupported: WritableSignal<boolean> = signal<boolean>(false);

  private recognition: any = null;
  private shouldContinue: boolean = false; // Flag para auto-restart

  constructor() {
    afterNextRender(() => {
      this.checkBrowserSupport();
    });
  }

  /**
   * Verifica se o navegador suporta Web Speech API
   * Só roda no browser devido ao afterNextRender
   */
  private checkBrowserSupport(): void {
    const hasSupport = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    this.isSupported.set(hasSupport);
  }

  /**
   * Inicia a transcrição de áudio
   * @param language - Código do idioma (ex: 'pt-BR', 'en-US')
   */
  start(language: string = 'pt-BR'): void {
    if (!this.isSupported()) {
      this.error.set('Web Speech API não suportada neste navegador');
      return;
    }

    if (this.isTranscribing()) {
      console.warn('Transcrição já está em andamento');
      return;
    }

    // Limpar textos anteriores antes de iniciar nova transcrição
    this.reset();

    // Ativar auto-restart (continua mesmo após silêncio)
    this.shouldContinue = true;

    try {
      // Criar instância do SpeechRecognition
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI();

      // Configurações
      this.recognition.continuous = true; // Continua ouvindo até parar manualmente
      this.recognition.interimResults = true; // Retorna resultados parciais
      this.recognition.lang = language;
      this.recognition.maxAlternatives = 1;

      // Event listeners
      this.recognition.onstart = () => {
        this.isTranscribing.set(true);
        this.error.set(null);
        console.log('🎤 Transcrição iniciada');
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = this.transcribedText(); // Mantém texto anterior

        // Processar todos os resultados
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;

          if (result.isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        // Atualizar signals
        this.transcribedText.set(finalTranscript.trim());
        this.interimText.set(interimTranscript.trim());
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erro na transcrição:', event.error);

        // Ignorar erro 'no-speech' quando auto-restart está ativo (é esperado durante silêncio)
        if (event.error === 'no-speech' && this.shouldContinue) {
          console.log('⏸️ Silêncio detectado, aguardando fala...');
          return; // Não faz nada, vai reiniciar automaticamente no onend
        }

        const errorMessages: Record<string, string> = {
          'no-speech': 'Nenhuma fala detectada',
          'audio-capture': 'Erro ao capturar áudio',
          'not-allowed': 'Permissão de microfone negada',
          'network': 'Erro de rede',
          'aborted': 'Transcrição abortada',
        };

        this.error.set(errorMessages[event.error] || `Erro desconhecido: ${event.error}`);
        this.shouldContinue = false; // Parar auto-restart em caso de erro real
        this.isTranscribing.set(false);
      };

      this.recognition.onend = () => {
        console.log('🛑 Transcrição finalizada');

        // Se deve continuar (não foi parada manualmente), reinicia
        if (this.shouldContinue) {
          console.log('🔄 Reiniciando transcrição após silêncio...');
          // NÃO muda isTranscribing para evitar flash no badge
          setTimeout(() => {
            if (this.shouldContinue && this.recognition) {
              try {
                this.recognition.start();
              } catch (err) {
                console.error('Erro ao reiniciar transcrição:', err);
                this.isTranscribing.set(false);
              }
            }
          }, 100); // Pequeno delay para evitar conflitos
        } else {
          // Só muda para false quando realmente parar
          this.isTranscribing.set(false);
        }
      };

      // Iniciar reconhecimento
      this.recognition.start();

    } catch (err) {
      console.error('Erro ao iniciar transcrição:', err);
      this.error.set('Erro ao iniciar transcrição');
      this.isTranscribing.set(false);
    }
  }

  /**
   * Para a transcrição
   */
  stop(): void {
    // Desativar auto-restart antes de parar
    this.shouldContinue = false;

    if (this.recognition && this.isTranscribing()) {
      this.recognition.stop();
    }
  }

  /**
   * Reseta o estado (limpa textos)
   */
  reset(): void {
    this.transcribedText.set('');
    this.interimText.set('');
    this.error.set(null);
  }

  /**
   * Retorna o texto completo (final + interim)
   */
  getFullText(): string {
    const final = this.transcribedText();
    const interim = this.interimText();
    return interim ? `${final} ${interim}`.trim() : final;
  }
}
