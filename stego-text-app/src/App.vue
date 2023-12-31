<script setup lang="ts">
import StegoViewer from './components/StegoViewer.vue';
import { whiteTextPdfMethod, mockMethod } from './methods';
import { Method } from './types';

const methods: Method<any>[] = [
  whiteTextPdfMethod,
  mockMethod
]
</script>

<template>
  <StegoViewer :methods="methods" />
</template>