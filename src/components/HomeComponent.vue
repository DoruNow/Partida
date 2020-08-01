<template>
  <div>
    <GetUserInformationComponent :formType="'start'" />
    <GetUserInformationComponent :formType="'join'" />
    <v-btn @click="dropDb">Drop db</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GetUserInformationComponent from "@/components/GetUserInformationComponent.vue";

@Component({
  components: {
    GetUserInformationComponent
  }
})
export default class HomeComponent extends Vue {
  dropDb() {
    // @ts-ignore
    this.$socket.client.emit("dropDb");
  }
}
</script>
