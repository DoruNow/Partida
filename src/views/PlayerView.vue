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
        <img
          :src="playingCardMapper(card)"
          :class="
            JSON.stringify(card) === JSON.stringify(selectedCard)
              ? 'selected'
              : ''
          "
          class="card"
          v-show="!card.hide"
          @click="setCardState(card)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlayingCardMapper from "@/mixins/PlayingCardMapper";

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
export default class PlayerView extends mixins(PlayingCardMapper) {
  // TODO remove test data
  cards = [
    { type: "Diamonds", value: 8 },
    { type: "Spades", value: 4 },
    { type: "Diamonds", value: 1 },
    { type: "Clubs", value: 10 },
    { type: "Diamonds", value: 6 },
    { type: "Spades", value: 2 },
    { type: "Spades", value: 5 },
    { type: "Hearts", value: 8 },
    { type: "Clubs", value: 1 },
    { type: "Clubs", value: 3 },
    { type: "Hearts", value: 1 },
    { type: "Diamonds", value: 9 },
    { type: "Diamonds", value: 10 }
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

.cards
  max-width: 100vw

.card-list
  width: 6vw
  float: left

.card
  height: 60vh

.selected
  position: relative
  top: -20px
</style>
