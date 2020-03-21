<template>
  <div class="container">
    <div class="score-bar">Score Bar</div>
    <div class="player1">Player 1</div>
    <div class="player2">Player 2</div>
    <div class="player3">Player 3</div>
    <div class="player4">Player 4</div>
    <div class="hand">Hand</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    updateTablePayload: {
      type: Object
    }
  }
})
export default class TableView extends Vue {}
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
</style>
