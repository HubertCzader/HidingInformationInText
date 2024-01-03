<!-- Renders custom config edit panel -->

<script setup lang="ts">
import { watch } from "vue";
import { MethodConfig } from "../types";
import InputSwitch from "primevue/inputswitch"
import InputText from "primevue/inputtext"
import InputNumber from "primevue/inputnumber"
import Dropdown from "primevue/dropdown";

const props = defineProps<{
  template: MethodConfig,
  config: MethodConfig
}>();

const emit = defineEmits(["changeConfig"]);
const update = (key: String, value: string | number | boolean) => emit("changeConfig", { key, value });

watch(() => props.template, () => {
  // initialize select inputs
  for (const [key, value] of Object.entries(props.template ?? {})) {
    if (Array.isArray(value)) update(key, value[0]);
  }
});
</script>

<template v-if="!!props">
  <div v-for="(value, name) in props.template" :key="name">
    <div v-if="typeof value === 'string'">
      <label :for="name">{{ name }}</label>
      <InputText :id="name" :model-value="String(props.config?.[name])"
        @update:modelValue="val => val && update(name, val)" />
    </div>

    <div v-if="typeof value === 'number'">
      <label :for="name">{{ name }}</label>
      <InputNumber :id="name" :model-value="Number(props.config?.[name])" :format="false"
        @update:modelValue="val => update(name, val)" />
    </div>

    <div v-if="typeof value === 'boolean'">
      <label :for="name">{{ name }}</label>
      <InputSwitch :id="name" :model-value="Boolean(props.config?.[name])"
        @update:modelValue="val => update(name, val)" />
    </div>

    <div v-else-if="Array.isArray(value)">
      <label :for="name">{{ name }}</label>
      <Dropdown :name="name" :model-value="props.config?.[name]" :options="value"
        @update:model-value="(val: any) => update(name, val)" />
    </div>
  </div>
</template>

<style scoped>
label {
  text-transform: capitalize;
  display: block;
  margin-bottom: 0.5rem;
}
</style>
