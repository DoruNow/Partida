<template>
  <div class="container">
    <div class="action-bar">
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <v-btn
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="resetHand()"
          ><v-icon dark>mdi-undo</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="addPoint()"
          ><v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="startGame()"
          ><v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <div></div>
    <div class="cards">
      <div class="card-list" v-for="card in cards" :key="card.id">
        <!-- {{ index }} -->
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
import PlayingCardMapper from "../mixins/PlayingCardMapper";
import DeckMixin from "../mixins/DeckMixin";

@Component
export default class PlayerView extends mixins(PlayingCardMapper, DeckMixin) {
  isCardSelected = false;
  selectedCard = {};
  orderedCards = {};
  position = null;
  roomName = null;
  cards = null;

  mounted() {
    this.position = this.$route.params.position;
    this.roomName = this.$route.params.roomName;
    // The user goes to an existing game when route params match
    // local storage params
    if (
      localStorage.position === this.position &&
      localStorage.roomName === this.roomName
    ) {
      // @ts-ignore
      this.$socket.client.emit("reloadGame", {
        roomName: this.roomName,
        position: this.position
      });
    } else {
      localStorage.position = this.position;
      localStorage.roomName = this.roomName;
    }
    // TODO remove
    // @ts-ignore
    this.$socket.client.on("connectToRoom", data => console.log(data));
    // @ts-ignore
    this.$socket.client.on("catchError", data => console.log(data));
  }

  setCardState(card) {
    this.isCardSelected ? this.playCard(card) : this.selectCard(card);
  }

  playCard(card) {
    if (JSON.stringify(card) === JSON.stringify(this.selectedCard)) {
      this.isCardSelected = false;
      this.selectedCard = {};
      card.hide = true;
      // @ts-ignore
      this.$socket.client.emit("playCard", {
        card
      });
    } else {
      this.selectedCard = card;
    }
  }

  selectCard(card) {
    this.isCardSelected = true;
    this.selectedCard = card;
  }

  startGame() {
    // @ts-ignore
    this.$socket.client.emit("startGame", { roomName: this.roomName });
    // @ts-ignore
    this.$socket.client.on("startGame", data => {
      this.cards = this.orderCardsInHand(data.players[this.position].cards);
    });
  }

  endCurrentHandSuccessfully() {
    // @ts-ignore
    this.$socket.client.emit("endCurrentHandSuccessfully");
    // @ts-ignore
    this.$socket.client.emit("addPoint", { team: this.position % 2 });
  }

  // api may change
  undoHand() {
    // @ts-ignore
    this.$socket.client.emit("undoHand");
  }

  restartGame() {
    this.startGame();

    localStorage.position = undefined;
    localStorage.roomName = undefined;
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
  height: 60vhorderedCards
  top: -20px

.selected
  position: relative
  top: -20px
</style>
