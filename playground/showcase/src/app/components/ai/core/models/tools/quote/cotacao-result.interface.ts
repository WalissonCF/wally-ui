import { OfertaData } from './oferta.interface';
import { ProdutoData } from './product.interface';

export interface ResumoData {
  totalOfertas: number;
  melhorPreco: number;
  distribuidorMelhorPreco: string;
}

export interface CotacaoToolResult {
  mensagem: string;
  produto: ProdutoData;
  resumo: ResumoData;
  ofertas: OfertaData[];
}
