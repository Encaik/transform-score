<script setup>
import { ref,onMounted } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import Vex from "vexflow";
import { parse } from "@encaik/abc";
import ScoreAbc from './components/ScoreAbc.vue';

const { Renderer, Stave,StaveNote,Voice,Formatter,Accidental } = Vex.Flow;

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

let score = ref(`X:1
T:小鸡的一家
M:2/4
Q:1/4=140
L:1/4
K:C
_C''3 =C,/2 ^C,,/4 ^^C,,,/8 __C,/8`);
let editor;

onMounted(() => {
  editor = monaco.editor.create(document.getElementById('monaco'), {
    value: score.value
  });

  editor.onDidChangeModelContent(()=>{
    score.value = editor.getValue();
    console.log(score.value);
  })

  // const durationMap = {
  //   '4':'w',
  //   '3':'hd',
  //   '2':'h',
  //   '1':'q',
  //   '/2':'8',
  //   '/4':'16',
  //   '/8':'32'
  // }

  // const div = document.getElementById("score");
  // const renderer = new Renderer(div, Renderer.Backends.SVG);
  // renderer.resize(div.clientWidth, div.clientHeight);
  // const context = renderer.getContext();
  // const stave = new Stave(50, 50, div.clientWidth-100);
  // stave.addClef("treble").addTimeSignature("4/4");
  // stave.setContext(context).draw();

  // let transScore = parse(scoreDefault);
  // console.log(transScore);
  // let noteList = [];
  // for (let index = 0; index < transScore[0].music.length; index++) {
  //   const note = transScore[0].music[index];
  //   if(note.type==='note'){
  //     let staveNote = new StaveNote({ keys: [`${note.name}/${note.pitch||4}`], duration: durationMap[note.duration] });
  //     if(note.sharp){
  //       staveNote.addModifier(new Accidental("#"))
  //     }
  //     if(note.flat){
  //       staveNote.addModifier(new Accidental("b"))
  //     }
  //     if(note['double-sharp']){
  //       staveNote.addModifier(new Accidental("##"))
  //     }
  //     if(note['double-flat']){
  //       staveNote.addModifier(new Accidental("bb"))
  //     }
  //     noteList.push(staveNote);
  //   }else{
  //     continue;
  //   }
  // }
  // console.log(noteList);

  // const voice = new Voice({ num_beats: 4, beat_value: 4 });
  // voice.addTickables(noteList);
  // new Formatter().joinVoices([voice]).format([voice], 350);
  // voice.draw(context, stave);
})
</script>

<template>
  <div class="flex h-full w-full">
    <div id="monaco" class="w-6/12"></div>
    <div class="flex flex-col w-6/12">
      <ScoreAbc class="flex-1" v-model:score="score"></ScoreAbc>
    </div>
  </div>
</template>

<style scoped>
</style>
