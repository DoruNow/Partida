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
          v-model="userName"
          name="userName"
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
        <v-btn :disabled="!settingsForm" color="success" @click="goToGame">{{
          submitMenuCardButtonText
        }}</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import http from "../plugins/axios";

interface AccessControl {
  data: {
    accessControl: {
      isAuthorized: boolean;
    };
  };
}

const FormTypeProps = Vue.extend({
  props: {
    formType: {
      type: String,
    },
  },
});

@Component
export default class GetUserInformationComponent extends FormTypeProps {
  select = {};
  menuCardButtonText = "";
  showIfJoinGame = false;
  showForm = false;
  settingsForm = null;
  userName = "Doru";
  roomName = "KingPin";
  submitMenuCardButtonText = "";
  playerSelection = [
    { text: "Player 2", value: 2 },
    { text: "Player 3", value: 3 },
    { text: "Player 4", value: 4 },
  ];
  required = [(v: object | string) => !!v || "Required field"];
  settings = {
    roomName: String,
  };

  mounted() {
    if (this.formType === "start") {
      this.menuCardButtonText = "Host Game";
      this.submitMenuCardButtonText = "Start";
      this.select = 1;
    } else if (this.formType === "join") {
      this.menuCardButtonText = "Join Game";
      this.submitMenuCardButtonText = "Join";
      this.showIfJoinGame = true;
    }
  }

  goToGame() {
    console.log(this.select);

    http
      .post("/", {
        userName: this.userName,
        roomName: this.roomName,
        playerNumber: this.select,
      })
      .then((response: any) => {
        const { data } = response;
        data.accessControl.isAuthorized
          ? this.$router.push("/player")
          : console.log("Authorization failed");
      });
  }
}
</script>
