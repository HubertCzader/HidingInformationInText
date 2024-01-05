<script setup lang="ts">
import { ref } from "vue";
import { Method, MethodConfig } from "../types"
import { readFile, copyPdfBuffer } from "../utils/file";
import VuePdfEmbed from "vue-pdf-embed";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import FileUpload from 'primevue/fileupload';
import Textarea from "primevue/textarea";

const props = defineProps<{
    method: Method,
    config: MethodConfig
}>()

const decodedText = ref("")
const decodeUpload = ref<ArrayBuffer | null>(null);

const onFileChange = async (files: File | File[]) => {
    decodeUpload.value = await readFile([files].flat()[0])
}

const handleDecode = async () => {
    if (!decodeUpload.value) return
    const copy = copyPdfBuffer(decodeUpload.value)
    decodedText.value = await props.method.decode(copy, props.config)
}

</script>

<template>
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
            style="width: 100%; height: 2.75rem; margin-top: 0.5rem;" @select="e => onFileChange(e.files)" customUpload
            @uploader="() => decodeUpload = null" chooseLabel="Choose stego file" />
        <div class="tall">
            <label for="decoded" style="margin-bottom: 0.5rem">
                Decoded message
            </label>
            <Textarea v-model="decodedText" readonly id="decoded" name="decoded-message" style="flex: 1" />
        </div>
        <Button :disabled="!decodeUpload" label="Decode" outlined @click="handleDecode" />
    </div>
</template>