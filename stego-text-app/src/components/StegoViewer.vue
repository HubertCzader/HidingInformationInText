<!-- Renders text inputs and control panel with active method selection -->

<script setup lang="ts">
import { ref, watch } from "vue";
import { Method, PdfFormat } from "../types";
import ConfigComposer from "./ConfigComposer.vue";
import VuePdfEmbed from "vue-pdf-embed";
import { saveByteArray, textToPdf } from "../utils/file";

const props = defineProps<{
  methods: Method[];
}>();

const method = ref(props.methods[0]);
const coverText = ref(method.value.defaultCover ?? "");
const stegoText = ref(method.value.defaultStego ?? "");
const decodedText = ref("")
const config = ref(method.value.config);
const pdf = ref<PdfFormat | null>(null);
const usePlaintext = ref(false);
const fileUpload = ref<ArrayBuffer | null>(null);
const decode = ref(false);


watch(method, () => {
  if (method.value.defaultCover) coverText.value = method.value.defaultCover;
  if (method.value.defaultStego) stegoText.value = method.value.defaultStego;
  config.value = method.value.config;
});

const onFileChange = (file: File) => {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const res = ev.target?.result
    fileUpload.value = res as ArrayBuffer ?? null
  }
  reader.readAsArrayBuffer(file);
}

const handleGenerate = async () => {
  const source = usePlaintext.value ? await textToPdf(coverText.value) : fileUpload.value;
  if (!source) return
  const out = await method.value.execute(
    source,
    stegoText.value,
    config.value
  );
  if (out) {
    console.log("out is", out)
    pdf.value = out;
  }
};

const handleDecode = async () => {
  if (!fileUpload.value) return
  decodedText.value = await method.value.decode(fileUpload.value, config.value)
}

const downloadPdf = () => {
  const name = `${method.value.name} method`
    .toLowerCase()
    .replaceAll(/\s+/g, "_");
  pdf.value && saveByteArray(name, pdf.value);
};
</script>

<template>
  <main className="main-grid">
    <section className="control-panel">
      <h2>Control Panel</h2>
      <label>
        <span>Selected method</span><br />
        <select v-model="method" id="select-method">
          <option v-for="method in methods" :value="method" :key="method.name">
            {{ method.name }}
          </option>
        </select>
      </label>
      <hr />
      <ConfigComposer :config="method.config"
        @change-config="({ key, value }) => (config = { ...config, [key]: value })" />
      <button className=" btn-success" @click="handleGenerate">Generate</button>
    </section>
    <section className="inputs-section" style="grid-area: inputs">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <label for="cover" className="h2">Source</label>
        <label v-if="!decode">
          Use plaintext
          <input type="checkbox" v-model="usePlaintext" />
        </label>
      </div>
      <input v-if="!usePlaintext || decode" type="file" v-on:change="e => onFileChange(e.target.files[0])"
        accept="application/pdf" />
      <textarea v-else v-model="coverText" id="cover" name="cover-text" />

      <div className="decode-row">
        <label>
          Decode
          <input v-model="decode" type="checkbox" />
        </label>
        <button v-if="decode" @click="handleDecode" class="btn-success">Decode</button>
      </div>

      <label for="stego" className="h2">{{ decode ? "Decoded message" : "Message to hide" }}</label>
      <textarea v-if="!decode" v-model="stegoText" id="stego" name="cover-text" />
      <textarea v-else v-model="decodedText" readonly id="stego" name="cover-text" />
    </section>
    <section className="pdf-section" style="grid-area: pdf-view">
      <label for="stego" className="h2">PDF view</label>
      <div className="pdf-overflower">
        <img v-if="!pdf" src="../images/pdf_image.jpg" alt="PDF view" class="pdf-viewer" />
        <vue-pdf-embed v-else :source="pdf" :width="450" />
      </div>
      <button v-if="!!pdf" @click="downloadPdf">Download</button>
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
    "control-panel inputs pdf-view"
    "control-panel inputs pdf-view";
  flex: 1;
}

.inputs-section {
  display: flex;
  flex-direction: column;
}

.inputs-section .h2 {
  font-size: 1.5rem;
  display: inline-block;
  margin: 1.245rem 0 1rem;
  font-weight: bold;
}

.inputs-section textarea {
  resize: none;
  flex: 1;
}

.control-panel {
  grid-row-start: 1;
  grid-row-end: 3;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.decode-row {
  margin: 1.5rem 0 0.5rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  min-height: 3rem;
}

.control-panel select {
  width: 100%;
}

.pdf-section {
  display: flex;
  flex-direction: column;
}

.pdf-section button {
  width: 50%;
  align-self: flex-end;
  margin-top: auto;
}

.pdf-section .h2 {
  font-size: 1.5rem;
  display: inline-block;
  margin: 1.245rem 0 1rem;
  font-weight: bold;
}

.pdf-overflower {
  overflow: scroll;
  max-height: 636px;
}

.pdf-viewer {
  width: 100%;
  height: 670px;
  object-fit: cover;
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
