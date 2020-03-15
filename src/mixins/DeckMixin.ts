export interface Card {
  value: number;
  type: string;
}

import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class DeckMixin extends Vue {
  private buildDeck = function() {
    const cardTypes = ["Spades", "Hearts", "Diamonds", "Clubs"];
    const deck: Card[] = [];

    cardTypes.forEach(type => {
      [...Array(14).keys()].forEach(value => {
        // skipping 0 avoids confusion when mapping the cards
        if (value === 0) {
          return;
        }
        deck.push({ type, value });
      });
    });

    return deck;
  };

  // helper method coming from https://bost.ocks.org/mike/shuffle/
  private shuffle(array: Card[]) {
    let m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  private shuffleDeck(deck: Card[]): Card[] {
    return this.shuffle(deck);
  }

  private divideShuffledDeck(shuffledDeck: Card[]): object {
    const dealtCards = {
      player1: [],
      player2: [],
      player3: [],
      player4: []
    };

    Object.keys(dealtCards).forEach((key: string, index) => {
      // @ts-ignore
      return (dealtCards[key] = shuffledDeck.slice(
        index * 13,
        (index + 1) * 13
      ));
    });

    return dealtCards;
  }

  dealCards() {
    const deck = this.buildDeck();
    const shuffledDeck = this.shuffleDeck(deck);
    return this.divideShuffledDeck(shuffledDeck);
  }
}
