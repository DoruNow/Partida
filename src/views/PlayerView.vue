<template>
  <div class="container">
    <div class="action-bar">
      <v-toolbar color="rgba(0,0,0,0)" flat v-if="playerId === '0'">
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          color="rgba(255,255,255,0.3)"
          @click="resetHand()"
          >Undo Hand
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          big
          color="rgba(255,255,255,0.3)"
          @click="startGame()"
          >Start game
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          color="rgba(255,255,255,0.3)"
          @click="addPoint()"
          >Score
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <div></div>
    <div class="cards">
      <div class="card-list" v-for="card in cards" :key="card.id">
        <!-- {{ index }} -->
        <img
          :src="playingCardMapper(card)"
          :class="setCardClass(card, selectedCard)"
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
  playerId = null;
  roomName = null;
  cards = null;
  isDisabled = true;
  canStart = true;

  mounted() {
    this.playerId = this.$route.params.playerId;
    this.roomName = this.$route.params.roomName;

    // The user goes to an existing game when route params match
    // local storage params
    if (
      localStorage.playerId === this.playerId &&
      localStorage.roomName === this.roomName
    ) {
      // @ts-ignore
      this.$socket.client.emit("reloadGame", {
        roomName: this.roomName,
        playerId: this.playerId
      });
    } else {
      localStorage.playerId = this.playerId;
      localStorage.roomName = this.roomName;
    }

    // TODO remove
    // @ts-ignore
    this.$socket.client.on("connectToRoom", data => console.log(data));
    // @ts-ignore
    this.$socket.client.on("sendNotification", data => console.log(data));
  }

  setCardClass(card, selectedCard) {
    return JSON.stringify(card) === JSON.stringify(selectedCard)
      ? "selected"
      : "";
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
        card,
        roomName: this.roomName
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
      this.cards = this.orderCardsInHand(
        data.deck.filter(card => {
          return card.playerId.toString() === this.playerId;
        })
      );
    });
  }

  endCurrentHandSuccessfully() {
    // @ts-ignore
    this.$socket.client.emit("endCurrentHandSuccessfully");
    // @ts-ignore
    this.$socket.client.emit("addPoint", { team: this.playerId % 2 });
  }

  // api may change
  undoHand() {
    // @ts-ignore
    this.$socket.client.emit("undoHand");
  }

  restartGame() {
    this.startGame();

    localStorage.playerId = undefined;
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
  position: relative
  left: -23.5vw
  display: flex
  justify-content: center

.card-list
  width: 6vw
  position: relative
  float: left

.card
  height: 60vh

.selected
  position: relative
  top: -15vh
</style>
