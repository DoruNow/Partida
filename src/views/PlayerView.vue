<template>
  <div class="container">
    <div class="action-bar">
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          color="rgba(255,255,255,0.3)"
          v-if="canStart && playerId === '0'"
          @click="resetHand()"
          >Undo Hand
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          big
          color="rgba(255,255,255,0.3)"
          v-if="canStart"
          @click="startGame()"
          >Start game
        </v-btn>
        <div v-if="!canStart">
          Players connected: <span>{{ playersConnected }}</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          color="rgba(255,255,255,0.3)"
          v-if="canStart && playerId === '0'"
          @click="addPoint()"
          >Score
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <div></div>
    <div class="cards">
      <div class="card-wrapper">
        <img
          v-for="card in cards"
          :key="card.id"
          :src="playingCardMapper(card)"
          :class="setCardClass(card)"
          class="card"
          v-show="!card.hide"
          @click="clickCard(card)"
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
  canStart = false;
  playersConnected = 0;

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
        playerId: this.playerId,
      });
    } else {
      localStorage.playerId = this.playerId;
      localStorage.roomName = this.roomName;
    }

    // TODO dev-remove
    // @ts-ignore
    this.$socket.client.on("sendNotification", (data) => console.log(data));
    // @ts-ignore
    this.$socket.client.on("joinRoom", (data) => {
      console.log("joinRoom", data);
      this.playersConnected = data.length;
      data.length === 4 ? (this.canStart = true) : (this.canStart = false);
    });
    // TODO add Add reload game listener
  }

  clickCard(card) {
    // if clicked card is found as selected
    if (JSON.stringify(card) === JSON.stringify(this.selectedCard)) {
      // @ts-ignore
      this.$socket.client.emit("playCard", {
        card,
        roomName: this.roomName,
      });
      this.cards = this.cards.filter(
        (card) => JSON.stringify(card) !== JSON.stringify(this.selectedCard)
      );
      this.selectedCard = {};
    }
    // if clicked card is resting
    if (JSON.stringify(card) !== JSON.stringify(this.selectedCard)) {
      this.selectedCard = card;
    }
  }

  setCardClass(card) {
    if (JSON.stringify(card) === JSON.stringify(this.selectedCard)) {
      return "selected";
    } else {
      return "";
    }
  }

  startGame() {
    // @ts-ignore
    this.$socket.client.emit("startGame", { roomName: this.roomName });
    // @ts-ignore
    this.$socket.client.on("startGame", (data) => {
      this.cards = this.filterCards(data);
    });
  }

  private filterCards(data) {
    return this.orderCardsInHand(
      data.deck.filter((card) => {
        return card.playerId.toString() === this.playerId;
      })
    ).filter((card) => card.played === false);
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
  width: 100vw
  left: -4vw
  position: relative
  display: flex
  justify-content: center

.card-wrapper
  width: 83.2vw
  display: grid
  grid-template-columns: repeat(auto-fill, 6.4vw)
  align-content: end

.card
  width: 14.6vw

.selected
  position: relative
  animation: 0.3s selectCard
  top: -15vh

.discard
  position: relative
  animation: 1s discard
  top: -150vh

@keyframes selectCard
  0%
    top: 0vh
  100%
    top: -15vh

@keyframes discard
  0%
    top: -15vh
  100%
    top: -150vh
</style>
