import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { marked, Tokens } from 'marked';

import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import hljs from 'highlight.js/lib/core';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }

  transform(value: string): SafeHtml {
    if (!value) return '';

    try {
      // Converte Markdown para HTML
      const html = marked.parse(value);

      // CRÍTICO: Sanitiza o HTML para prevenir XSS
      // Mas permite as tags que o Markdown gera
      return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
    } catch (error) {
      console.error('Erro ao processar markdown:', error);
      return value; // Retorna o texto original em caso de erro
    }
  }

}
