<!-- Renders text inputs and control panel with active method selection -->

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Method, PdfFormat } from "../types";
import ConfigComposer from "./ConfigComposer.vue";
import VuePdfEmbed from "vue-pdf-embed";
import { copyPdfBuffer, saveByteArray, textToPdf } from "../utils/file";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Skeleton from "primevue/skeleton";
import InputSwitch from "primevue/inputswitch";
import FileUpload from 'primevue/fileupload';
import Textarea from "primevue/textarea";

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
const encodeUpload = ref<ArrayBuffer | null>(null);
const decodeUpload = ref<ArrayBuffer | null>(null);

watch(method, () => {
  if (method.value.defaultCover) coverText.value = method.value.defaultCover;
  if (method.value.defaultStego) stegoText.value = method.value.defaultStego;
  config.value = method.value.config;
});

const onFileChange = (files: File | File[], isEncode: boolean) => {
  const reader = new FileReader();
  reader.onload = (ev) => {
    const res = ev.target?.result
    if (isEncode) {
      encodeUpload.value = res as ArrayBuffer ?? null
    } else {
      decodeUpload.value = res as ArrayBuffer ?? null
    }
  }
  const file = [files].flat()[0]
  reader.readAsArrayBuffer(file);
}

const canEncode = computed(() => stegoText && usePlaintext.value ? !!coverText.value : !!encodeUpload.value)

const handleGenerate = async () => {
  const source = usePlaintext.value ? await textToPdf(coverText.value) : encodeUpload.value;
  if (!source) return
  const out = await method.value.execute(
    source,
    stegoText.value,
    config.value
  );
  if (out) {
    pdf.value = out;
  }
};

const handleDecode = async () => {
  if (!decodeUpload.value) return
  const copy = copyPdfBuffer(decodeUpload.value)
  decodedText.value = await method.value.decode(copy, config.value)
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
      <div>
        <label for="method" style="display: block; margin-bottom: 0.5rem;">
          Current method
        </label>
        <Dropdown v-if="!!props.methods" id="method-select" name="method" v-model="method" :options="methods"
          style="width: 100%" optionLabel="name" />
      </div>
      <hr />
      <ConfigComposer :template="method.config" :config="config"
        @change-config="({ key, value }) => (config = { ...config, [key]: value })" />
    </section>
    <TabView style="flex: 1; display: flex; flex-direction: column;">
      <TabPanel header="Encode">
        <div class="encode-grid">
          <div style="grid-column: 1/4; display: flex; gap: 2rem; align-items: center;">
            <label for="use-plaintext">Use plaintext source</label>
            <InputSwitch name="use-plaintext" v-model="usePlaintext" />
          </div>
          <div class="tall">
            <div v-if="!usePlaintext" class="tall">
              <div style="margin-bottom: 0.75rem">
                Cover source
              </div>
              <div class="pdf-wrapper">
                <Skeleton v-if="!encodeUpload" style="flex: 1" />
                <vue-pdf-embed v-else :source="encodeUpload"
                  style="position:absolute; width: 100%; left: 50%; transform: translateX(-50%)" />
              </div>
            </div>
            <div v-else class="tall" style="gap: 0.5rem">
              <label for="cover">
                Cover text
              </label>
              <Textarea id="cover" name="cover-text" style="flex: 1" v-model="coverText" />
            </div>
          </div>
          <div>
            <FileUpload v-if="!usePlaintext" mode="basic" style="width: 100%; height: 2.75rem; margin-top: 0.5rem;"
              name="encode-source" :multiple="false" accept="application/pdf" @select="e => onFileChange(e.files, true)"
              chooseLabel="Choose source file" customUpload @uploader="() => encodeUpload = null" />
          </div>
          <div class="tall">
            <label for="secret" style="margin-bottom:0.5rem">
              Message to hide
            </label>
            <Textarea v-model="stegoText" id="secret" name="secret-text" style="flex: 1" />
          </div>
          <Button :disabled="!canEncode" label="Encode" @click="handleGenerate" outlined />
          <div class="tall">
            <div style="margin-bottom: 0.5rem">
              Output
            </div>
            <div class="pdf-wrapper">
              <Skeleton v-if="!pdf" style="flex: 1" animation="none" />
              <vue-pdf-embed v-else :source="pdf"
                style="position:absolute; width: 100%; left: 50%; transform: translateX(-50%)" />
            </div>
          </div>
          <Button :disabled="!pdf" label="Download" outlined @click="downloadPdf" />
        </div>
      </TabPanel>
      <TabPanel header="Decode">
        <div class="decode-grid">
          <div class="tall">
            <div style="margin-bottom: 0.75rem">
              Stego source
            </div>
            <div class="pdf-wrapper">
              <Skeleton v-if="!decodeUpload" style="flex: 1" animation="wave" />
              <vue-pdf-embed v-else :source="decodeUpload"
                style="position:absolute; width: 100%; left: 50%; transform: translateX(-50%)" />
            </div>
          </div>
          <FileUpload mode="basic" name="decode-source" :multiple="false" accept="application/pdf"
            style="width: 100%; height: 2.75rem; margin-top: 0.5rem;" @select="e => onFileChange(e.files, false)"
            customUpload @uploader="() => decodeUpload = null" chooseLabel="Choose stego file" />
          <div class="tall">
            <label for="decoded" style="margin-bottom: 0.5rem">
              Decoded message
            </label>
            <Textarea v-model="decodedText" readonly id="decoded" name="decoded-message" style="flex: 1" />
          </div>
          <Button :disabled="!decodeUpload" label="Decode" outlined @click="handleDecode" />
        </div>
      </TabPanel>
    </TabView>
  </main>
</template>

<style scoped>
main.main-grid {
  padding: 2rem;
  display: flex;
  gap: 2rem;
  flex: 1;
}

.encode-grid {
  grid-auto-flow: column;
  display: grid;
  gap: 1rem 2rem;
  flex: 1;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3rem 1fr 3.25rem;
}

.decode-grid {
  grid-auto-flow: column;
  display: grid;
  gap: 1rem 2rem;
  flex: 1;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3.25rem;
}

.encode-grid button,
.decode-grid button {
  margin-top: 0.5rem;
  height: 2.75rem;
}

.tall {
  display: flex;
  flex-direction: column;
  flex: 1;
}

textarea {
  resize: none;
}

.control-panel {
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pdf-section button {
  width: 50%;
  align-self: flex-end;
  margin-top: auto;
}

h2 {
  margin: 0 0 1.2rem;
}

.pdf-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;
}

hr {
  color: var(--gray-700);
  width: 100%;
}
</style>
