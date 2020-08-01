<template>
  <div class="d-flex justify-center align-center flex-column">
    <v-card class="ma-3">
      <v-btn class="ma-2" color="success" @click="showForm = !showForm" large>
        {{ menuCardButtonText }}
      </v-btn>
      <v-form
        v-show="showForm"
        v-model="settingsForm"
        lazy-validation
        ref="settingsForm"
        class="pa-2"
      >
        <v-text-field
          v-model="playerName"
          name="playerName"
          label="Player Name"
          type="text"
          @keydown.space.prevent
          :rules="required"
        ></v-text-field>
        <v-text-field
          v-model="roomName"
          name="roomName"
          label="Room Name"
          type="text"
          @keydown.space.prevent
          :rules="required"
        ></v-text-field>
        <v-text-field
          v-model="pin"
          name="pin"
          label="Pin"
          placeholder="****"
          type="number"
          :rules="required"
        ></v-text-field>
        <v-select
          v-if="showJoinGame"
          v-model="select"
          :items="playerSelection"
          label="Select Player"
          item-value="value"
          :rules="required"
        ></v-select>
        <!-- add text tag for errors coming from backend -->
        <v-btn :disabled="!settingsForm" color="success" @click="goToGame">
          {{ formType }}
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class GetUserInformationComponent extends Vue {
  @Prop(String) readonly formType: "start" | "join";

  select = null;
  pin = 1091;
  menuCardButtonText = "";
  showJoinGame = false;
  showForm = false;
  settingsForm = null;
  playerName = "doruletPlayer";
  roomName = "danus";
  playerSelection = [
    { text: "Player 2", value: 1 },
    { text: "Player 3", value: 2 },
    { text: "Player 4", value: 3 }
  ];
  required = [v => !!v || "Required field"];
  settings = {
    roomName: String
  };

  mounted() {
    if (this.formType === "start") {
      this.menuCardButtonText = "Host Game";
    } else if (this.formType === "join") {
      this.menuCardButtonText = "Join Game";
      this.showJoinGame = true;
    }
  }

  goToGame(): void {
    this.dropDb();
    // @ts-ignore
    this.$socket.$subscribe("catchError", data => console.log(data));
    if (this.formType === "start") {
      // @ts-ignore
      this.$socket.client.emit("createRoom", {
        roomName: this.roomName,
        playerName: this.playerName,
        pin: this.pin
      });

      // @ts-ignore
      this.$socket.$subscribe("roomCreated", data => {
        if (data) {
          this.$router.push(`/player/0/${this.roomName}`).catch(err => err);
        }
      });
    } else if (this.formType === "join") {
      // @ts-ignore
      this.$socket.client.emit("joinRoom", {
        roomName: this.roomName,
        playerName: this.playerName,
        pin: this.pin,
        position: this.select
      });
      this.$router
        .push(`/player/${this.select}/${this.roomName}`)
        .catch(err => err);

      // @ts-ignore
      this.$socket.$subscribe("connectToRoom", data => {
        if (data) {
          this.$router
            .push(`/player/${this.select}/${this.roomName}`)
            .catch(err => err);
        }
      });
    }
  }
  dropDb() {
    // @ts-ignore
    this.$socket.client.emit("dropDb");
  }
}
</script>
