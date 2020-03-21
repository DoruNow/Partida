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
          {{ updateTablePayload.cards[0].value
          }}{{ updateTablePayload.cards[0].type }}
        </div>
        <div
          class="card card4"
          :class="{ transparent: updateTablePayload.cards[3].value === 0 }"
        >
          {{ updateTablePayload.cards[3].value
          }}{{ updateTablePayload.cards[3].type }}
        </div>
        <div
          class="card card3"
          :class="{ transparent: updateTablePayload.cards[2].value === 0 }"
        >
          {{ updateTablePayload.cards[2].value
          }}{{ updateTablePayload.cards[2].type }}
        </div>
        <div
          class="card card2"
          :class="{ transparent: updateTablePayload.cards[1].value === 0 }"
        >
          {{ updateTablePayload.cards[1].value
          }}{{ updateTablePayload.cards[1].type }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    updateTablePayload1: {
      type: Object
    }
  }
})
export default class TableView extends Vue {
  // TODO remove test data and update props
  updateTablePayload = {
    cards: [
      {
        playedBy: "P1",
        value: 12,
        type: "Diamonds"
      },
      {
        playedBy: "",
        value: 13,
        type: "Hearts"
      },
      {
        playedBy: "P3",
        value: 1,
        type: "Clubs"
      },
      {
        playedBy: "P4",
        value: 12,
        type: "Spades"
      }
    ],
    gameScore: [1, 2],
    sessionScore: [1, 2],
    players: ["P2", "P2", "P3", "P4"]
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
  background-color: #49001f1f
  grid-area: hand
  display: grid
  align-content: center
  justify-content: center
.card
  width: 12vh
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
</style>
