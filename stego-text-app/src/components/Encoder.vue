<script setup lang="ts">
import { computed, ref } from 'vue';
import { Method, MethodConfig, PdfFormat } from '../types';
import { readFile, saveByteArray, textToPdf } from '../utils/file';
import VuePdfEmbed from "vue-pdf-embed";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';
import Textarea from "primevue/textarea";

const props = defineProps<{
    method: Method
    config: MethodConfig
}>();

const usePlaintext = ref(false);
const encodeUpload = ref<ArrayBuffer | null>(null);
const coverText = ref(props.method.defaultCover ?? "");
const stegoText = ref(props.method.defaultStego ?? "");
const pdf = ref<PdfFormat | null>(null);

const canEncode = computed(() => stegoText && usePlaintext.value ? !!coverText.value : !!encodeUpload.value)

const handleGenerate = async () => {
    const source = usePlaintext.value ? await textToPdf(coverText.value) : encodeUpload.value;
    if (!source) return
    const out = await props.method.execute(
        source,
        stegoText.value,
        props.config
    );
    if (out) {
        pdf.value = out;
    }
};

const onFileChange = async (files: File | File[]) => {
    encodeUpload.value = await readFile([files].flat()[0])
}

const downloadPdf = () => {
    const name = `${props.method.name} method`
        .toLowerCase()
        .replaceAll(/\s+/g, "_");
    pdf.value && saveByteArray(name, pdf.value);
};

</script>

<template>
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
                <Textarea id="cover" name="cover-text" style="flex: 1" v-model="coverText" spellcheck="false" />
            </div>
        </div>
        <div>
            <FileUpload v-if="!usePlaintext" mode="basic" style="width: 100%; height: 2.75rem; margin-top: 0.5rem;"
                name="encode-source" :multiple="false" accept="application/pdf" @select="e => onFileChange(e.files)"
                chooseLabel="Choose source file" customUpload @uploader="() => encodeUpload = null" />
        </div>
        <div class="tall">
            <label for="secret" style="margin-bottom:0.5rem">
                Message to hide
            </label>
            <Textarea v-model="stegoText" id="secret" name="secret-text" style="flex: 1" spellcheck="false" />
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
</template>
