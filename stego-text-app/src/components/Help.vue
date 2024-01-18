<script setup lang="ts">
import {helpWhiteText} from "../utils/helpWhiteText";


</script>

<template>
    <div class="help">
        <div class="tall">
            <div v-html="helpWhiteText" style="margin-bottom: 0.75rem"></div>
        </div>
    </div>
</template>