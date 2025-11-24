import { Component, input, output, signal, computed } from '@angular/core';
import { DataOffer } from '../../../lib/schemas/tools/offers';

/**
 * Componente para exibir resultados da tool "listar_ofertas_disponiveis"
 * Design minimalista focado em chat de IA
 */
@Component({
  selector: 'wally-offers-result',
  templateUrl: './offers-result.html',
  styleUrl: './offers-result.css',
  standalone: true
})
export class OffersResult {
  /**
   * Lista de ofertas retornadas pela API
   */
  data = input.required<DataOffer[]>();

  /**
   * Indica se está em loading (para skeleton)
   */
  isLoading = input<boolean>(false);

  /**
   * ID da oferta selecionada
   */
  selectedOfferId = signal<string | null>(null);

  /**
   * Controla se a lista expandida está visível
   */
  isExpanded = signal<boolean>(false);

  /**
   * Oferta selecionada completa
   */
  selectedOffer = signal<DataOffer | null>(null);

  /**
   * Emite quando uma oferta é selecionada
   */
  offerSelected = output<DataOffer>();

  /**
   * Ofertas visíveis (top 3 inicialmente)
   */
  visibleOffers = computed(() => {
    const offers = this.data();
    return this.isExpanded() ? offers : offers.slice(0, 3);
  });

  /**
   * Ofertas restantes (após as 3 primeiras)
   */
  remainingOffersCount = computed(() => {
    const total = this.data().length;
    return Math.max(0, total - 3);
  });

  /**
   * Verifica se tem mais ofertas para mostrar
   */
  hasMoreOffers = computed(() => this.remainingOffersCount() > 0);

  /**
   * Seleciona uma oferta (radio behavior)
   */
  selectOffer(offer: DataOffer): void {
    this.selectedOfferId.set(offer.id);
    this.selectedOffer.set(offer);
    this.offerSelected.emit(offer);
  }

  /**
   * Colapsa a lista de volta para 3 itens
   */
  collapseOffers(): void {
    this.isExpanded.set(false);
  }

  /**
   * Verifica se oferta está selecionada
   */
  isSelected(offerId: string): boolean {
    return this.selectedOfferId() === offerId;
  }

  /**
   * Expande para mostrar todas as ofertas
   */
  expandOffers(): void {
    this.isExpanded.set(true);
  }

  /**
   * Array de skeleton placeholders (3 itens)
   */
  get skeletonItems(): number[] {
    return [1, 2, 3];
  }
}
