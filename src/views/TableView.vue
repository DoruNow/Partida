<template>
  <div class="container">
    <div class="score-bar"></div>
    <div
      v-for="player in updateTablePayload.players"
      :key="player.id"
      :class="'player' + player.id"
    >
      {{ player.playerName }}
    </div>
    <div class="hand">
      <div
        class="card"
        v-for="(card, index) in updateTablePayload.cards"
        :key="card.id"
        :class="'card' + index"
      >
        <img
          :src="playingCardMapper(updateTablePayload.cards[index])"
          alt="1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlayingCardMapper from "../mixins/PlayingCardMapper";
import http from "../plugins/axios";

@Component
export default class TableView extends mixins(PlayingCardMapper) {
  // TODO remove test data and update props
  card = {};
  index = 0;
  updateTablePayload = { cards: [], players: [] };

  mounted() {
    http.post("/", {
      userName: "masa",
      roomName: "kingpin",
    });

    this.$socket.client.on("update_table", (data) => {
      console.log(data);
      console.log(this.updateTablePayload.players);
      if (data.cards) {
        this.updateTablePayload.cards.push(data.cards);
      }
      this.updateTablePayload.players.push(data.player);
    });
  }
}
</script>

<style lang="sass" scoped>
.container
  display: grid
  column-gap: 1vh
  row-gap: 1vh
  grid-template-columns: 1fr 20vh 50vw 20vh 1fr
  grid-template-rows: 6vh 12vh 12vh 40vh 12vh 12vh
  grid-template-areas: "score-bar score-bar score-bar score-bar score-bar" ". . player4 . ." ". player1 player4 player3 ." ". player1 hand player3 ." ". player1 player2 player3 ." ". . player2 . ."
  width: 100vw
  max-width: 100vw
  height: 100vh
  padding: 0
.score-bar
  grid-area: score-bar
.player1
  background-color: #4900ff1f
  grid-area: player1
.player2
  background-color: #4900ff1f
  grid-area: player2
.player3
  background-color: #4900ff1f
  grid-area: player3
.player4
  background-color: #4900ff1f
  grid-area: player4
.hand
  grid-area: hand
  display: grid
  grid-template-columns: auto 12fr 2fr 10fr 2fr 10fr 2fr 12fr auto
  grid-template-rows: auto 9fr 8fr 2fr 8fr 9fr auto
.card
  width: 14vh
  height: 20vh
  background-color: #4900ff11
.card0
  grid-column: 3 / 5
  grid-row: 3 / 5
.card1
  grid-column: 5 / 7
  grid-row: 4 / 6
.card2
  grid-column: 7 / 8
  grid-row: 3 / 5
.card3
  grid-column: 5 / 7
  grid-row: 2 / 4
img
  width: 100%
</style>
