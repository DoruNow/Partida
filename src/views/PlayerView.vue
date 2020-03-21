<template>
  <div class="container">
    <div class="action-bar">
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <v-btn
          v-if="admin"
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="resetHand(token)"
          ><v-icon dark>mdi-undo</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="addPoint(token)"
          ><v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
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

  // user identification, probably socket ID
  token = "";

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

  // eslint-disable-next-line
  addPoint(token) {
    // send event to add point
  }
  // eslint-disable-next-line
  resetHand(token) {
    // send event to reset hand
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100vw
  height: 100vh
  max-width: 100vw
  padding: 0
  display: grid
  grid-template-rows: 10vh 30vh 60vh

// .action-bar
//   background-color: red

.cards
  max-width: 100vw
  display: flex
  flex: 1
  flex-direction: row
  justify-content: center

.card-list
  height: 100%

.card-button
  border: 1px solid black
  height: 100% !important

.selected
  background-color: #000 !important
  top: -20px
</style>
