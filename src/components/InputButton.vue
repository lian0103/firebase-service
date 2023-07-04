<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({ disabled: { type: Boolean, default: false } });

const disabledComputed = computed(()=>{
    return props.disabled;
})

</script>

<template>
    <div class="input-button" :class="disabledComputed ? 'disabled' : ''">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.input-button {
    @apply text-black0 font-medium text-center mx-auto select-none;
    font-size: 32px;
    line-height: 38px;
    width: 360px;
    height: 78px;
    padding: 20px 0;
    border-radius: 50px;
    @apply bg-green0 cursor-pointer;
    transition: all 0.3s ease-in-out;

    &.disabled {
        outline: 2px solid rgba(153, 153, 153, 0.5);
        @apply cursor-not-allowed text-gray0 bg-transparent;
    }
}
</style>
