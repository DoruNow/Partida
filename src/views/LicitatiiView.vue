<template>
  <div>
    <div class="headline text-center">Good Luck and Have Fun</div>
    <HomeComponent />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import HomeComponent from "@/components/HomeComponent.vue";

@Component({
  components: {
    HomeComponent
  }
})
export default class LicitatiiView extends Vue {
  get type() {
    return this.$route.path;
  }
}
</script>
