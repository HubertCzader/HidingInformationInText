<!-- Renders text inputs and control panel with active method selection -->

<script setup lang="ts">
import { ref, watch } from "vue";
import { Method } from "../types";
import ConfigComposer from "./ConfigComposer.vue";

const props = defineProps<{
  methods: Method[]
}>()

const method = ref(props.methods[0]);
const coverText = ref(method.value.defaultCover ?? "");
const stegoText = ref(method.value.defaultStego ?? "");
const config = ref(method.value.config)

watch(method, () => {
  if (method.value.defaultCover)
    coverText.value = method.value.defaultCover
  if (method.value.defaultStego)
    stegoText.value = method.value.defaultStego
  config.value = method.value.config
})

</script>

<template>
  <main className="main-grid">
    <section className="input-section">
      <label for="cover" className="h2">Cover text</label>
      <textarea v-model="coverText" id="cover" name="cover-text" />
    </section>
    <section className="input-section">
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
      <button className="btn-success" @click="() => method.execute(coverText, stegoText, config)">
        Generate
      </button>
    </section>
  </main>
</template>

<style scoped>
main.main-grid {
  padding: 1rem;
  grid-gap: 1rem 2rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 2fr minmax(100px, 1fr);
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
  grid-column-start: 1;
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 3;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-panel select {
  width: 100%;
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
