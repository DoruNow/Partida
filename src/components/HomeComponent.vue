<template>
  <div>
    <GetUserInformationComponent :formType="'start'" />
    <GetUserInformationComponent :formType="'join'" />
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
export default class HomeComponent extends Vue {}
</script>
