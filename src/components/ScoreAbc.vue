<script setup>
import { defineProps,onMounted,watch,ref } from "vue";
import abcjs from "abcjs";

let props = defineProps({
  score: String
});

let score = ref(props.score);
let container;

watch(
  () => props.score,
  (value) => {
    score.value = value;
    abcjs.renderAbc("score", score.value,{staffwidth:container.clientWidth-30});
  }
)

onMounted(()=>{
  container = document.getElementById("score");
  abcjs.renderAbc("score", score.value,{staffwidth:container.clientWidth-30});
})
</script>

<template>
  <div id="score"></div>
</template>

<style scoped>
</style>
