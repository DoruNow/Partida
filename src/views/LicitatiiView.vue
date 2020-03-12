<template>
  <div>
    <div class="headline text-center">Good Luck and Have Fun</div>
    <HomeComponent />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HomeComponent from "@/components/HomeComponent.vue";

export default Vue.extend({
  components: {
    HomeComponent
  },
  computed: {
    type() {
      return this.$route.path;
    }
  }
});
</script>

<style scoped></style>
