<template>
  <div>
    <img :src="playingCardMapper(deck.player1[0])" alt="a" />
    {{ deck.player1 }}
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";

import DeckMixin from "@/mixins/DeckMixin";
import PlayingCardMapper from "@/mixins/PlayingCardMapper";

@Component
export default class TestDeckComponent extends mixins(
  DeckMixin,
  PlayingCardMapper
) {
  deck = {};

  created() {
    this.deck = this.dealCards();
    console.log(this.deck);
  }
}
</script>
