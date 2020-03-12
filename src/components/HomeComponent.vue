<template>
  <div>
    <GetUserInformationComponent :formType="'start'" />
    <GetUserInformationComponent :formType="'join'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GetUserInformationComponent from "@/components/GetUserInformationComponent.vue";

export default Vue.extend({
  components: {
    GetUserInformationComponent
  }
});
</script>
