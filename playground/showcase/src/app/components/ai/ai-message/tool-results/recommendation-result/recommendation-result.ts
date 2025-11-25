import { Component, input, output, signal, computed } from '@angular/core';
import { RecommendationToolResult } from '../../../lib/schemas/tools/recommendation';
import { Button } from '../../../../button/button';

/**
 * Representa um item de recomendação individual do array recommendations
 */
type RecommendationItem = RecommendationToolResult['recommendations'][0];

/**
 * Representa um item selecionado com suas informações para a thread
 */
interface SelectedItem {
  ean: string;
  product: string;
  manufacturer: string;
  itemsToBuy: number;
  timestamp: Date;
}

/**
 * Componente para exibir resultados da tool "recomendacao_de_compra"
 * Com seleção múltipla e thread estilo Twitter
 */
@Component({
  selector: 'wally-recommendation-result',
  imports: [Button],
  templateUrl: './recommendation-result.html',
  styleUrl: './recommendation-result.css',
  standalone: true
})
export class RecommendationResult {
  /**
   * Dados completos da recomendação retornados pela API
   */
  data = input.required<RecommendationToolResult>();

  /**
   * Indica se está em loading (para skeleton)
   */
  isLoading = input<boolean>(false);

  /**
   * Set de EANs selecionados
   */
  selectedEans = signal<Set<string>>(new Set());

  /**
   * Array ordenado de itens selecionados (para a thread)
   */
  selectedItems = signal<SelectedItem[]>([]);

  /**
   * Controla se a lista expandida está visível
   */
  isExpanded = signal<boolean>(false);

  /**
   * Controla se a thread está expandida
   */
  isThreadExpanded = signal<boolean>(false);

  /**
   * Emite quando a seleção muda
   */
  selectionChanged = output<SelectedItem[]>();

  /**
   * Emite quando o usuário clica no botão de cotar itens
   */
  quoteRequested = output<SelectedItem[]>();

  /**
   * Recomendações visíveis (top 3 inicialmente)
   */
  visibleRecommendations = computed(() => {
    const recommendations = this.data().recommendations;
    return this.isExpanded() ? recommendations : recommendations.slice(0, 3);
  });

  /**
   * Recomendações restantes (após as 3 primeiras)
   */
  remainingRecommendationsCount = computed(() => {
    const total = this.data().recommendations.length;
    return Math.max(0, total - 3);
  });

  /**
   * Verifica se tem mais recomendações para mostrar
   */
  hasMoreRecommendations = computed(() => this.remainingRecommendationsCount() > 0);

  /**
   * Total de itens selecionados
   */
  selectedCount = computed(() => this.selectedEans().size);

  /**
   * Itens visíveis da thread (top 5 inicialmente)
   */
  visibleThreadItems = computed(() => {
    const items = this.selectedItems();
    return this.isThreadExpanded() ? items : items.slice(0, 5);
  });

  /**
   * Itens restantes da thread (após os 5 primeiros)
   */
  remainingThreadItemsCount = computed(() => {
    const total = this.selectedItems().length;
    return Math.max(0, total - 5);
  });

  /**
   * Verifica se tem mais itens na thread para mostrar
   */
  hasMoreThreadItems = computed(() => this.remainingThreadItemsCount() > 0);

  /**
   * Investimento total dos itens selecionados
   */
  selectedInvestment = computed(() => {
    const selected = this.selectedEans();
    return this.data().recommendations
      .filter(rec => selected.has(rec.ean))
      .reduce((sum, rec) => sum + rec.investmentValue, 0);
  });

  /**
   * Lucro estimado total dos itens selecionados
   */
  selectedProfit = computed(() => {
    const selected = this.selectedEans();
    return this.data().recommendations
      .filter(rec => selected.has(rec.ean))
      .reduce((sum, rec) => sum + rec.estimatedProfit, 0);
  });

  /**
   * Verifica se todas as recomendações estão selecionadas
   */
  allSelected = computed(() => {
    const total = this.data().recommendations.length;
    const selected = this.selectedEans().size;
    return total > 0 && selected === total;
  });

  /**
   * Verifica se algumas (mas não todas) recomendações estão selecionadas
   */
  someSelected = computed(() => {
    const selected = this.selectedEans().size;
    return selected > 0 && !this.allSelected();
  });

  /**
   * Verifica se uma recomendação está selecionada
   */
  isSelected(ean: string): boolean {
    return this.selectedEans().has(ean);
  }

  /**
   * Toggle seleção de todas as recomendações
   */
  toggleAll(): void {
    if (this.allSelected()) {
      // Desselecionar todas
      this.selectedEans.set(new Set());
      this.selectedItems.set([]);
    } else {
      // Selecionar todas
      const allRecommendations = this.data().recommendations;
      const allEans = new Set(allRecommendations.map(rec => rec.ean));
      const allItems: SelectedItem[] = allRecommendations.map(rec => ({
        ean: rec.ean,
        product: rec.product,
        manufacturer: rec.manufacturer,
        itemsToBuy: rec.itemsToBuy,
        timestamp: new Date()
      }));

      this.selectedEans.set(allEans);
      this.selectedItems.set(allItems);
    }

    this.selectionChanged.emit(this.selectedItems());
  }

  /**
   * Toggle seleção de um item (checkbox behavior)
   */
  toggleSelection(recommendation: RecommendationItem): void {
    const currentSelected = new Set(this.selectedEans());
    const currentItems = [...this.selectedItems()];

    if (currentSelected.has(recommendation.ean)) {
      // Remover
      currentSelected.delete(recommendation.ean);
      const updatedItems = currentItems.filter(item => item.ean !== recommendation.ean);
      this.selectedItems.set(updatedItems);
    } else {
      // Adicionar
      currentSelected.add(recommendation.ean);
      const newItem: SelectedItem = {
        ean: recommendation.ean,
        product: recommendation.product,
        manufacturer: recommendation.manufacturer,
        itemsToBuy: recommendation.itemsToBuy,
        timestamp: new Date()
      };
      currentItems.push(newItem);
      this.selectedItems.set(currentItems);
    }

    this.selectedEans.set(currentSelected);
    this.selectionChanged.emit(this.selectedItems());
  }

  /**
   * Expande para mostrar todas as recomendações
   */
  expandRecommendations(): void {
    this.isExpanded.set(true);
  }

  /**
   * Colapsa a lista de volta para 3 itens
   */
  collapseRecommendations(): void {
    this.isExpanded.set(false);
  }

  /**
   * Expande a thread para mostrar todos os itens
   */
  expandThread(): void {
    this.isThreadExpanded.set(true);
  }

  /**
   * Colapsa a thread de volta para 5 itens
   */
  collapseThread(): void {
    this.isThreadExpanded.set(false);
  }

  /**
   * Array de skeleton placeholders (3 itens)
   */
  get skeletonItems(): number[] {
    return [1, 2, 3];
  }

  /**
   * Emite evento quando usuário clica em "Cotar itens"
   */
  requestQuote(): void {
    this.quoteRequested.emit(this.selectedItems());
  }

  /**
   * Formata número como moeda brasileira
   */
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Formata ROI como porcentagem
   */
  formatPercentage(value: number): string {
    return value.toFixed(1) + '%';
  }
}
