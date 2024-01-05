<!-- Renders the control panel as well as the encoder and decoder tabs -->

<script setup lang="ts">
import { ref } from "vue";
import { Method } from "../types";
import ConfigComposer from "./ConfigComposer.vue";
import Decoder from "./Decoder.vue"
import Encoder from "./Encoder.vue"
import Dropdown from "primevue/dropdown";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

const props = defineProps<{
  methods: Method[];
}>();

const method = ref(props.methods[0]);
const config = ref(method.value.config);

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
        <Encoder :method="method" :config="config" />
      </TabPanel>
      <TabPanel header="Decode">
        <Decoder :method="method" :config="config" />
      </TabPanel>
    </TabView>
  </main>
</template>

<style>
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
