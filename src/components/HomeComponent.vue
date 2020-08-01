<template>
  <div>
    <GetUserInformationComponent :formType="'start'" />
    <GetUserInformationComponent :formType="'join'" />
    <v-btn @click="dropDb">Drop db</v-btn>
    <v-btn @click="createTestRoom">Create test room</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GetUserInformationComponent from "@/components/GetUserInformationComponent.vue";

@Component({
  components: {
    GetUserInformationComponent,
  },
})
export default class HomeComponent extends Vue {
  dropDb() {
    // @ts-ignore
    this.$socket.client.emit("dropDb");
  }

  createTestRoom() {
    this.dropDb();
    // @ts-ignore
    this.$socket.client.emit("createRoom", {
      roomName: "testRoom",
      playerName: "Player 1",
      pin: 1091,
      playerId: 0,
    });
    setTimeout(() => {
      // @ts-ignore
      this.$socket.client.emit("joinRoom", {
        roomName: "testRoom",
        playerName: "Player 2",
        pin: 1091,
        playerId: 1,
      });
    }, 200);

    setTimeout(() => {
      // @ts-ignore
      this.$socket.client.emit("joinRoom", {
        roomName: "testRoom",
        playerName: "Player 3",
        pin: 1091,
        playerId: 2,
      });
    }, 400);

    setTimeout(() => {
      // @ts-ignore
      this.$socket.client.emit("joinRoom", {
        roomName: "testRoom",
        playerName: "Player 4",
        pin: 1091,
        playerId: 3,
      });
      this.$router.push("/player/0/testRoom").catch((err) => err);
    }, 600);
  }
}
</script>
