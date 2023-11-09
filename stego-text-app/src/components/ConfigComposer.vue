<!-- Renders custom config edit panel -->

<script setup lang="ts">
import { MethodConfig } from "../types";

const props = defineProps<{
  config?: MethodConfig,
}>()

const emit = defineEmits(['changeConfig'])
const update = (key: String, value: string | number | boolean) => emit("changeConfig", { key, value })
for (const [key, value] of Object.entries(props.config ?? {})) {
  if (Array.isArray(value)) update(key, value[0])
}

</script>

<template v-if="!!props">
  <table v-for="(value, name) in props.config">
    <label v-if="typeof value === 'string'">
      <span>{{ name }}</span>
      <input type="text" :value="props.config?.[name]" @input="e => update(name, e?.target?.value)" />
    </label>

    <label v-else-if="typeof value === 'number'">
      <span>{{ name }}</span>
      <input type="number" :value="props.config?.[name]" @input="e => update(name, parseFloat(e?.target?.value))" />
    </label>

    <label v-else-if="typeof value === 'boolean'">
      <span>{{ name }}</span>
      <input type="checkbox" :checked="Boolean(props.config?.[name])" @input="e => update(name, e?.target?.checked)" />
    </label>

    <label v-else-if="Array.isArray(value)">
      <span>{{ name }}</span>
      <select :defaultValue="props.config?.[name]?.[0]" @input="e => update(name, e?.target?.value)">
        <option v-for="item in value" :value="item">
          {{ item }}
        </option>
      </select>
    </label>
  </table>
</template>

<style scoped>
label {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem 2rem;
  align-items: center;
  text-transform: capitalize;
}

input:not([type="checkbox"]),
textarea,
select {
  flex: 1;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
  margin: 0;
}
</style>