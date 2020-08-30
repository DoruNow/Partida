<template>
  <div v-if="payload">
    <img
      v-for="card in this.payload.deck"
      :key="card.id"
      :src="playingCardMapper(card)"
      class="card"
      v-show="card.visible"
    />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import PlayingCardMapper from "../mixins/PlayingCardMapper";

@Component
export default class TableView extends mixins(PlayingCardMapper) {
  roomName = "";
  payload = null;

  mounted() {
    this.roomName = this.$route.params.roomName;
    // @ts-ignore
    this.$socket.client.on("updateTable", (data) => {
      this.payload = data;
    });

    // @ts-ignore
    this.$socket.client.emit("joinTable", { roomName: this.roomName });
  }
}
</script>

<style lang="sass" scoped>
.card
  width: 20%
</style>
