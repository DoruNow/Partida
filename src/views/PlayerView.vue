<template>
  <div class="container">
    <div class="action-bar">
      <v-toolbar color="rgba(0,0,0,0)" flat>
        <v-btn
          @click="startGame()"
          v-if="!gameHasStarted"
          color="rgba(255,255,255,0.3)"
          >Start Game</v-btn
        >

        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          small
          fab
          color="rgba(255,255,255,0.3)"
          @click="resetHand(token)"
          ><v-icon dark>mdi-undo</v-icon>
        </v-btn>
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
      <div class="card-list" v-for="card in orderedCards" :key="card.id">
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
import DeckMixin, { Card } from "../mixins/DeckMixin";
import http from "../plugins/axios";

@Component({
  props: {
    admin: {
      type: Boolean
    },
    canPlay: {
      type: Boolean
    }
  }
})
export default class PlayerView extends mixins(PlayingCardMapper, DeckMixin) {
  gameHasStarted = false;
  isCardSelected = false;
  selectedCard: Card = { value: 0, type: "" };
  orderedCards = [];

  setCardState(card) {
    this.isCardSelected ? this.playCard(card) : this.selectCard(card);
  }

  playCard(card) {
    if (JSON.stringify(card) === JSON.stringify(this.selectedCard)) {
      this.isCardSelected = false;
      this.selectedCard = { value: 0, type: "" };
      card.hide = true;
      this.$socket.client.emit("play_card", card);
    } else {
      this.selectedCard = card;
    }
  }

  selectCard(card) {
    this.isCardSelected = true;
    this.selectedCard = card;
  }

  async mounted() {
    await http.get("/access-control/player").then(response => {
      if (!response.data.accessControl.isAuthorized) {
        this.$router.push("/");
      } else {
        this.$socket.client.emit("join_room", {});
        this.$socket.client.on("update_player", data => {
          this.orderedCards = this.orderCardsInHand(data.cards);
          this.gameHasStarted = true;
        });
      }
    });
  }

  startGame() {
    this.$socket.client.emit("start_game", {});
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
  height: 60vhorderedCards
  top: -20px

.selected
  position: relative
  top: -20px
</style>
