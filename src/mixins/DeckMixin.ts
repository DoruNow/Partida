export interface Card {
  value: number;
  type: string;
}

import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class DeckMixin extends Vue {
  orderCardsInHand(cardsInHand: Card[]): Card[] {
    const cardsOrderPriority = {
      Spades: 0,
      Hearts: 1,
      Clubs: 2,
      Diamonds: 3
    };
    const orderedCards: Card[] = cardsInHand.sort(
      (a, b) =>
        cardsOrderPriority[a.type] - cardsOrderPriority[b.type] ||
        a.value - b.value
    );
    return orderedCards;
  }
}
