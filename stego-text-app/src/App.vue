<script setup lang="ts">
import StegoViewer from './components/StegoViewer.vue';
import { whiteTextPdfMethod, spaceCipher } from './methods';
import { Method } from './types';

const methods: Method<any>[] = [
  whiteTextPdfMethod,
  spaceCipher
]
</script>

<template>
  <StegoViewer :methods="methods" />
</template>