<template>
  <div>{{ deck.player1 }}</div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";

import DeckMixin from "@/mixins/DeckMixin";

@Component
export default class TestDeckComponent extends mixins(DeckMixin) {
  deck = {};

  created() {
    this.deck = this.dealCards();
  }
}
</script>
