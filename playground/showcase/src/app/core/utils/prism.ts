import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';

export function highlightCode(code: string, language: string = 'typescript'): string {
  return Prism.highlight(code, Prism.languages[language], language);
}

export function getFormattedCode(code: string, language: string = 'html'): string {
  const cleanCode = code.trim();
  return highlightCode(cleanCode, language);
}