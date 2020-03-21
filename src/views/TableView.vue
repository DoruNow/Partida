<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    updateTablePayload: {
      type: Object
    }
  }
})
export default class TableView extends Vue {}
</script>
