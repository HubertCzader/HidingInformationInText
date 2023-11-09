<script setup lang="ts">
import StegoViewer from './components/StegoViewer.vue';
import { whiteTextPdfMethod } from './methods/whiteTextPdf';
import { Method, MethodConfig } from './types';

interface TestMethodConfig extends MethodConfig {
  name: string,
  age: number,
  select: string[],
  boolean: boolean
}

const testMethod: Method<TestMethodConfig> = {
  name: "Test method",
  defaultCover: "Cover text",
  defaultStego: "Stego text",
  config: { age: 4, boolean: false, select: ["apple", "banana", "cinamon"], name: "Jimmy" },
  // using promises in case the stego operation takes a while
  execute: (cover, stego, config) => new Promise(resolve => setTimeout(() => {
    console.log(`Hiding ${stego} in ${cover} with config`, config)
    resolve()
  }, 1000))
}

const methods: Method<any>[] = [
  testMethod,
  whiteTextPdfMethod,
]
</script>

<template>
  <StegoViewer :methods="methods" />
</template>