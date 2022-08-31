<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import Vex from "vexflow";

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

onMounted(() => {
  monaco.editor.create(document.getElementById('monaco'), {
    value: "function hello() {\n\talert('Hello world!');\n}"
  });

let vf = new Vex.Flow.Factory({renderer: {elementId: 'score'}});
let score = vf.EasyScore();
let system = vf.System();
system.addStave({
  voices: [score.voice(score.notes('C#5/q, B4, A4, G#4'))]
}).addClef('treble').addTimeSignature('4/4');

vf.draw();
})
</script>

<template>
  <div class="flex h-full w-full">
    <div id="monaco" class="w-6/12"></div>
    <div id="score" class="w-6/12"></div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
</style>
