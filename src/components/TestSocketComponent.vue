<template>
  <div><v-btn @click="getRealTimeData">Connect</v-btn>{{ allFetchedData }}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  data() {
    return {
      fetchedData: "",
      allFetchedData: [""]
    };
  },
  methods: {
    getRealTimeData() {
      this.$socket.client.emit("createRoom", { playerName: "a" });
    }
  }
});
</script>
