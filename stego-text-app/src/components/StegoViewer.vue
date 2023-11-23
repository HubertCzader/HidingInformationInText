<!-- Renders text inputs and control panel with active method selection -->

<script setup lang="ts">
import { ref, watch } from "vue";
import { Method, PdfFormat } from "../types";
import ConfigComposer from "./ConfigComposer.vue";
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps<{
  methods: Method[]
}>()

const method = ref(props.methods[0]);
const coverText = ref(method.value.defaultCover ?? "");
const stegoText = ref(method.value.defaultStego ?? "");
const config = ref(method.value.config)
const pdf = ref<PdfFormat | null>(null)

watch(method, () => {
  if (method.value.defaultCover)
    coverText.value = method.value.defaultCover
  if (method.value.defaultStego)
    stegoText.value = method.value.defaultStego
  config.value = method.value.config
})

const handleGenerate = async () => {
  const out = await method.value.execute(coverText.value, stegoText.value, config.value)
  if (out) {
    pdf.value = out
  }
}

</script>

<template>
  <main className="main-grid">
    <section className="input-section" style="grid-area: input1;">
      <label for="cover" className="h2">Cover text</label>
      <textarea v-model="coverText" id="cover" name="cover-text" />
    </section>
    <section className="input-section" style="grid-area: input2;">
      <label for="stego" className="h2">Stego text</label>
      <textarea v-model="stegoText" id="tego" name="cover-text" />
    </section>
    <section className="control-panel">
      <h2>Control Panel</h2>
      <label>
        <span>Selected method</span><br />
        <select v-model="method" id="select-method">
          <option v-for="method in methods" :value="method">
            {{ method.name }}
          </option>
        </select>
      </label>
      <hr />
      <ConfigComposer :config="method.config" @change-config="({ key, value }) => config = { ...config, [key]: value }" />
      <button className="btn-success" @click="handleGenerate">
        Generate
      </button>
    </section>
    <section className="pdf-viewer" style="grid-area: pdf-view;">
      <label for="stego" className="h2">PDF view</label>
      <!-- <iframe src="../images/test.jpg" title="pdfview" frameboarder="0"></iframe> -->
      <img v-if="!pdf" src="../images/pdf_image.jpg" alt="PDF view" class="pdf-viewer">
      <vue-pdf-embed v-else :source="pdf" :width="450" />
    </section>
  </main>
</template>

<style scoped>
main.main-grid {
  padding: 1rem;
  grid-gap: 2% 2%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 2fr 450px;
  grid-template-areas:
    "control-panel input1 pdf-view"
    "control-panel input2 pdf-view";
  flex: 1;
}


.input-section {
  display: flex;
  flex-direction: column;
}

.input-section .h2 {
  font-size: 1.5rem;
  display: inline-block;
  margin: 1.245rem 0 1rem;
  font-weight: bold;
}

.input-section textarea {
  flex: 1;
  resize: none;
}

.control-panel {
  grid-row-start: 1;
  grid-row-end: 3;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-panel select {
  width: 100%;
}

.pdf-viewer {
  width: 100%;
  height: 95.5%;
  object-fit: cover;
}

.pdf-viewer .h2 {
  font-size: 1.5rem;
  display: inline-block;
  margin: 1.245rem 0 1rem;
  font-weight: bold;
}

#select-method {
  margin-top: 0.25rem;
}

hr {
  color: #444;
  width: 100%;
}

.control-panel .btn-success {
  margin-top: auto;
  background-color: var(--primary);
}
</style>
