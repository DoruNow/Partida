<template>
  <div>Child Component</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class TestChildComponent extends Vue {}
</script>
