<template>
  <div>
    <div class="graph" ref="chart"></div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { useGraph } from "../composables/useGraph.js";

const emit = defineEmits(["node-selected"]);
const apiUrl = "http://localhost:4000/api/data";

const { chart, error } = useGraph(apiUrl, emit);
</script>

<style lang="scss" scoped>
@import "@/assets/_variable.scss";
.graph {
  width: 1000px;
  height: 100%;
  margin: -20px auto 0 auto;
  overflow: auto;
}
.error {
  color: $light-green;
  font-size: 2rem;
  padding: 16px 0;
  text-align: center;
  margin-top: 100px;
}
</style>
