<template>
  <div class="container">
    <div class="action-bar"></div>
    <div></div>
    <div class="cards">
      <div class="card-list" v-for="card in cards" :key="card.id">
        <v-btn
          depressed
          large
          dark
          color="primary"
          class="card-button"
          v-show="!card.hide"
          :class="
            JSON.stringify(card) === JSON.stringify(selectedCard)
              ? 'selected'
              : ''
          "
          @click="setCardState(card)"
          >{{ card.value }} {{ card.type }}</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    // TODO rename to `cards`
    cards1: {
      type: Object
    },
    admin: {
      type: Boolean
    },
    canPlay: {
      type: Boolean
    }
  }
})
export default class PlayerView extends Vue {
  // TODO remove test data
  cards = [
    { type: "Spades", value: 12 },
    { type: "Spades", value: 9 },
    { type: "Spades", value: 10 },
    { type: "Hearts", value: 4 }
  ];

  isCardSelected = false;
  selectedCard = {};

  setCardState(card) {
    this.isCardSelected ? this.playCard(card) : this.selectCard(card);
  }

  playCard(card) {
    if (JSON.stringify(card) === JSON.stringify(this.selectedCard)) {
      this.isCardSelected = false;
      this.selectedCard = {};
      card.hide = true;
    } else {
      this.selectedCard = card;
    }
  }

  selectCard(card) {
    this.isCardSelected = true;
    this.selectedCard = card;
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: aquamarine
  width: 100vw
  height: 100vh
  max-width: 100vw
  padding: 0
  display: grid
  grid-template-rows: 10vh 30vh 60vh

.action-bar
  background-color: red

.cards
  background-color: blue
  max-width: 100vw
  display: flex
  flex: 1
  flex-direction: row
  justify-content: center

.card-list
  height: 100%
  background-color: green

.card-button
  border: 1px solid black
  height: 100% !important

.selected
  background-color: #000 !important
  top: -20px
</style>
