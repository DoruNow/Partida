<template>
  <div class="container">
    <div class="score-bar">Score Bar</div>
    <div class="player1" v-if="updateTablePayload.players[0] !== ''">
      {{ updateTablePayload.players[0] }}
    </div>
    <div class="player2" v-if="updateTablePayload.players[1] !== ''">
      {{ updateTablePayload.players[1] }}
    </div>
    <div class="player3" v-if="updateTablePayload.players[2] !== ''">
      {{ updateTablePayload.players[2] }}
    </div>
    <div class="player4" v-if="updateTablePayload.players[3] !== ''">
      {{ updateTablePayload.players[3] }}
    </div>
    <div class="hand">
      <div>
        <div
          class="card card1"
          :class="{ transparent: updateTablePayload.cards[0].value === 0 }"
        >
          <img :src="playingCardMapper(updateTablePayload.cards[0])" alt="1" />
        </div>
        <div
          class="card card4"
          :class="{ transparent: updateTablePayload.cards[3].value === 0 }"
        >
          <img :src="playingCardMapper(updateTablePayload.cards[3])" alt="1" />
        </div>
        <div
          class="card card3"
          :class="{ transparent: updateTablePayload.cards[2].value === 0 }"
        >
          <img :src="playingCardMapper(updateTablePayload.cards[2])" alt="1" />
        </div>
        <div
          class="card card2"
          :class="{ transparent: updateTablePayload.cards[1].value === 0 }"
        >
          <img :src="playingCardMapper(updateTablePayload.cards[1])" alt="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlayingCardMapper from "../mixins/PlayingCardMapper";
import { Prop } from "vue-property-decorator";

@Component
export default class TableView extends mixins(PlayingCardMapper) {
  @Prop(Object) readonly updateTablePayload1;
  // TODO remove test data and update props
  updateTablePayload = {
    cards: [
      {
        value: 12,
        type: "Diamonds"
      },
      {
        value: 2,
        type: "Hearts"
      },
      {
        value: 14,
        type: "Clubs"
      },
      {
        value: 12,
        type: "Spades"
      }
    ],
    gameScore: [1, 2],
    sessionScore: [1, 2],
    players: ["P1", "P2", "P3", "P4"]
  };
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
  background-color: #4900ff10
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
  align-content: center
  justify-content: center
.card
  width: 14vh
  height: 20vh
  background-color: #4900ff11
.card1
  position: relative
  right: 15vh
  top: 30vh
.card2
  position: relative
  top: -22vh
  right: 5vh
.card3
  position: relative
  left: 15vh
  top: -10vh
.card4
  position: relative
  top: 2vh
  left: 5vh
.transparent
  opacity: 0
img
  width: 100%
</style>
