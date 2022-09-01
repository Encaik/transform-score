<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import Vex from "vexflow";
import { parse } from "@encaik/abc";

const { Renderer, Stave,StaveNote,Voice,Formatter } = Vex.Flow;

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

let scoreDefault = `X:1
T:小鸡的一家
M:2/4
Q:1/4=140
L:1/4
K:C
_C''3 =C,/2 ^C,,/4 ^^C,,,/8 __C,/8`;

onMounted(() => {
  monaco.editor.create(document.getElementById('monaco'), {
    value: scoreDefault
  });

  const durationMap = {
    '4':'w',
    '3':'hd',
    '2':'h',
    '1':'q',
    '1/2':'8',
    '1/4':'16',
    '1/8':'32'
  }

  const div = document.getElementById("score");
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(div.clientWidth, div.clientHeight);
  const context = renderer.getContext();
  const stave = new Stave(10, 40, 400);
  stave.addClef("treble").addTimeSignature("4/4");
  stave.setContext(context).draw();
  const notes = [
    new StaveNote({ keys: ["c/4"], duration: "q" }),
    new StaveNote({ keys: ["d/4"], duration: "q" }),
    new StaveNote({ keys: ["b/4"], duration: "h" }),
  ];

  let transScore = parse(scoreDefault);
  console.log(transScore);
  let noteList = [];
  for (let index = 0; index < transScore[0].music.length; index++) {
    const note = transScore[0].music[index];
    if(note.type==='note'){
      noteList.push(new StaveNote({ keys: [`${note.pitch}/4`], duration: durationMap[note.duration] }));
    }else{
      continue;
    }
  }
  console.log(noteList);

  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(noteList);
  new Formatter().joinVoices([voice]).format([voice], 350);
  voice.draw(context, stave);
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
