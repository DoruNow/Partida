<template>
  <div class="d-flex justify-center align-center flex-column">
    <v-card class="ma-3">
      <v-btn class="ma-2" color="success" @click="showForm = !showForm" large>{{
        menuCardButtonText
      }}</v-btn>
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
        <v-select
          v-if="showIfJoinGame"
          v-model="select"
          :items="playerSelection"
          label="Select Player"
          item-value="value"
        ></v-select>
        <v-btn :disabled="!settingsForm" color="success" @click="goToGame"
          >Create Links</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    formType: {
      type: String
    }
  },
  data() {
    return {
      showForm: false,
      settingsForm: null,
      menuCardButtonText: "",
      playerName: "Doru",
      roomName: "KingPin",
      select: {},
      showIfJoinGame: false,
      playerSelection: [
        { text: "Player 2", value: 2 },
        { text: "Player 3", value: 3 },
        { text: "Player 4", value: 4 }
      ],
      required: [(v: object | string) => !!v || "Required field"],
      settings: {
        roomName: String
      }
    };
  },
  mounted() {
    this.select = { value: null };

    if (this.formType === "start") {
      this.menuCardButtonText = "Host Game";
      this.select = { value: 1 };
    } else if (this.formType === "join") {
      this.menuCardButtonText = "Join Game";
      this.showIfJoinGame = true;
    }
  },
  methods: {
    goToGame() {
      //
    }
  }
});
</script>
