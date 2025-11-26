import { Component, input, output, signal, computed } from '@angular/core';
import { CotacaoToolResultInferred } from '../../../lib/schemas/tools/quote';
import { Button } from '../../../../button/button';

/**
 * Representa uma oferta individual do array offers
 */
type OfertaItem = NonNullable<CotacaoToolResultInferred['offers']>[0];

/**
 * Representa um item selecionado para o carrinho
 */
interface CartItem {
  distributor: string;
  finalPrice: number;
  stock: string;
  condition?: string;
  discount?: number;
  paymentTerm?: string;
  minimumValue?: number;
  quantity: number;
  timestamp: Date;
}

/**
 * Componente para exibir resultados da tool "cotar_produto_por_distribuidora"
 * Com seleção múltipla e carrinho de ofertas
 */
@Component({
  selector: 'wally-quote-result',
  imports: [Button],
  templateUrl: './quote-result.html',
  styleUrl: './quote-result.css',
  standalone: true
})
export class QuoteResult {
  /**
   * Dados completos da cotação retornados pela API
   */
  data = input.required<CotacaoToolResultInferred>();

  /**
   * Indica se está em loading (para skeleton)
   */
  isLoading = input<boolean>(false);

  /**
   * Set de distribuidores selecionados (usando nomes dos distribuidores como chave)
   */
  selectedDistributors = signal<Set<string>>(new Set());

  /**
   * Array ordenado de itens do carrinho
   */
  cartItems = signal<CartItem[]>([]);

  /**
   * Controla se a lista expandida está visível
   */
  isExpanded = signal<boolean>(false);

  /**
   * Controla se o carrinho está expandido
   */
  isCartExpanded = signal<boolean>(false);

  /**
   * Set de distribuidores com linhas expandidas (para mostrar detalhes)
   */
  expandedRows = signal<Set<string>>(new Set());

  /**
   * Map de distribuidores para suas quantidades
   */
  quantities = signal<Map<string, number>>(new Map());

  /**
   * Emite quando a seleção muda
   */
  selectionChanged = output<CartItem[]>();

  /**
   * Emite quando o usuário clica no botão de adicionar ao carrinho
   */
  addToCartRequested = output<CartItem[]>();

  /**
   * Ofertas visíveis (top 3 inicialmente)
   */
  visibleOfertas = computed(() => {
    const offers = this.data().offers ?? [];
    return this.isExpanded() ? offers : offers.slice(0, 3);
  });

  /**
   * Ofertas restantes (após as 3 primeiras)
   */
  remainingOfertasCount = computed(() => {
    const total = this.data().offers?.length ?? 0;
    return Math.max(0, total - 3);
  });

  /**
   * Verifica se tem mais ofertas para mostrar
   */
  hasMoreOfertas = computed(() => this.remainingOfertasCount() > 0);

  /**
   * Total de ofertas selecionadas
   */
  selectedCount = computed(() => this.selectedDistributors().size);

  /**
   * Itens visíveis do carrinho (top 5 inicialmente)
   */
  visibleCartItems = computed(() => {
    const items = this.cartItems();
    return this.isCartExpanded() ? items : items.slice(0, 5);
  });

  /**
   * Itens restantes do carrinho (após os 5 primeiros)
   */
  remainingCartItemsCount = computed(() => {
    const total = this.cartItems().length;
    return Math.max(0, total - 5);
  });

  /**
   * Verifica se tem mais itens no carrinho para mostrar
   */
  hasMoreCartItems = computed(() => this.remainingCartItemsCount() > 0);

  /**
   * Valor total das ofertas selecionadas (preço × quantidade)
   */
  cartTotal = computed(() => {
    const selected = this.selectedDistributors();
    const offers = this.data().offers ?? [];
    const qtys = this.quantities();

    return offers
      .filter(offer => selected.has(offer.distributor))
      .reduce((sum, offer) => {
        const quantity = qtys.get(offer.distributor) || 1;
        return sum + (offer.finalPrice * quantity);
      }, 0);
  });

  /**
   * Total de itens no carrinho (soma das quantidades)
   */
  totalItems = computed(() => {
    const selected = this.selectedDistributors();
    const qtys = this.quantities();
    let total = 0;

    selected.forEach(distributor => {
      total += qtys.get(distributor) || 1;
    });

    return total;
  });

  /**
   * Desconto total das ofertas selecionadas
   */
  totalDiscount = computed(() => {
    const selected = this.selectedDistributors();
    const offers = this.data().offers ?? [];
    const selectedOffers = offers.filter(offer => selected.has(offer.distributor));

    // Calcula o desconto em valor absoluto
    return selectedOffers.reduce((sum, offer) => {
      if (!offer.discount || offer.discount === 0) return sum;
      const originalPrice = offer.finalPrice / (1 - offer.discount / 100);
      const discountValue = originalPrice - offer.finalPrice;
      return sum + discountValue;
    }, 0);
  });

  /**
   * Verifica se todas as ofertas estão selecionadas
   */
  allSelected = computed(() => {
    const total = this.data().offers?.length ?? 0;
    const selected = this.selectedDistributors().size;
    return total > 0 && selected === total;
  });

  /**
   * Verifica se algumas (mas não todas) ofertas estão selecionadas
   */
  someSelected = computed(() => {
    const selected = this.selectedDistributors().size;
    return selected > 0 && !this.allSelected();
  });

  /**
   * Verifica se uma oferta está selecionada
   */
  isSelected(distribuidor: string): boolean {
    return this.selectedDistributors().has(distribuidor);
  }

  /**
   * Verifica se uma linha está expandida
   */
  isRowExpanded(distributor: string): boolean {
    return this.expandedRows().has(distributor);
  }

  /**
   * Toggle expansão de linha (para mostrar/ocultar detalhes)
   */
  toggleRowExpansion(distributor: string): void {
    const currentExpanded = new Set(this.expandedRows());

    if (currentExpanded.has(distributor)) {
      currentExpanded.delete(distributor);
    } else {
      currentExpanded.add(distributor);
    }

    this.expandedRows.set(currentExpanded);
  }

  /**
   * Obtém a quantidade de um distribuidor
   */
  getQuantity(distributor: string): number {
    return this.quantities().get(distributor) || 1;
  }

  /**
   * Atualiza a quantidade de um distribuidor
   */
  updateQuantity(distributor: string, quantity: number): void {
    if (quantity < 1) quantity = 1;

    const currentQuantities = new Map(this.quantities());
    currentQuantities.set(distributor, quantity);
    this.quantities.set(currentQuantities);

    // Atualiza o carrinho se o item está selecionado
    if (this.selectedDistributors().has(distributor)) {
      this.updateCartItemQuantity(distributor, quantity);
    }
  }

  /**
   * Atualiza a quantidade de um item no carrinho
   */
  private updateCartItemQuantity(distributor: string, quantity: number): void {
    const currentItems = [...this.cartItems()];
    const itemIndex = currentItems.findIndex(item => item.distributor === distributor);

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItems.set(currentItems);
      this.selectionChanged.emit(currentItems);
    }
  }

  /**
   * Retorna a cor do badge de estoque
   */
  getStockBadgeColor(stock: string): string {
    const stockUpper = stock.toUpperCase();

    if (stockUpper.includes('DISPONÍVEL') || stockUpper.includes('AVAILABLE') || stockUpper.includes('ALTO') || stockUpper.includes('HIGH')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }

    if (stockUpper.includes('BAIXO') || stockUpper.includes('LOW') || stockUpper.includes('LIMITADO') || stockUpper.includes('LIMITED')) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }

    if (stockUpper.includes('INDISPONÍVEL') || stockUpper.includes('UNAVAILABLE') || stockUpper.includes('ESGOTADO') || stockUpper.includes('OUT OF STOCK')) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }

    return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
  }

  /**
   * Toggle seleção de todas as ofertas
   */
  toggleAll(): void {
    if (this.allSelected()) {
      // Desselecionar todas
      this.selectedDistributors.set(new Set());
      this.cartItems.set([]);
    } else {
      // Selecionar todas
      const allOffers = this.data().offers ?? [];
      const allDistributors = new Set(allOffers.map(offer => offer.distributor));
      const qtys = this.quantities();

      const allItems: CartItem[] = allOffers.map(offer => ({
        distributor: offer.distributor,
        finalPrice: offer.finalPrice,
        stock: offer.stock,
        condition: offer.condition,
        discount: offer.discount,
        paymentTerm: offer.paymentTerm,
        minimumValue: offer.minimumValue,
        quantity: qtys.get(offer.distributor) || 1,
        timestamp: new Date()
      }));

      this.selectedDistributors.set(allDistributors);
      this.cartItems.set(allItems);
    }

    this.selectionChanged.emit(this.cartItems());
  }

  /**
   * Toggle seleção de uma oferta (checkbox behavior)
   */
  toggleSelection(offer: OfertaItem): void {
    const currentSelected = new Set(this.selectedDistributors());
    const currentItems = [...this.cartItems()];
    const qtys = this.quantities();

    if (currentSelected.has(offer.distributor)) {
      // Remover
      currentSelected.delete(offer.distributor);
      const updatedItems = currentItems.filter(item => item.distributor !== offer.distributor);
      this.cartItems.set(updatedItems);
    } else {
      // Adicionar
      currentSelected.add(offer.distributor);
      const newItem: CartItem = {
        distributor: offer.distributor,
        finalPrice: offer.finalPrice,
        stock: offer.stock,
        condition: offer.condition,
        discount: offer.discount,
        paymentTerm: offer.paymentTerm,
        minimumValue: offer.minimumValue,
        quantity: qtys.get(offer.distributor) || 1,
        timestamp: new Date()
      };
      currentItems.push(newItem);
      this.cartItems.set(currentItems);
    }

    this.selectedDistributors.set(currentSelected);
    this.selectionChanged.emit(this.cartItems());
  }

  /**
   * Expande para mostrar todas as ofertas
   */
  expandOfertas(): void {
    this.isExpanded.set(true);
  }

  /**
   * Colapsa a lista de volta para 3 itens
   */
  collapseOfertas(): void {
    this.isExpanded.set(false);
  }

  /**
   * Expande o carrinho para mostrar todos os itens
   */
  expandCart(): void {
    this.isCartExpanded.set(true);
  }

  /**
   * Colapsa o carrinho de volta para 5 itens
   */
  collapseCart(): void {
    this.isCartExpanded.set(false);
  }

  /**
   * Array de skeleton placeholders (3 itens)
   */
  get skeletonItems(): number[] {
    return [1, 2, 3];
  }

  /**
   * Emite evento quando usuário clica em "Adicionar ao carrinho"
   */
  addToCart(): void {
    this.addToCartRequested.emit(this.cartItems());
  }

  /**
   * Formata número como moeda brasileira
   */
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Formata desconto como porcentagem
   */
  formatPercentage(value: number): string {
    return value.toFixed(0) + '%';
  }
}
