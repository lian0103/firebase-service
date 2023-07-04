<script setup>
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { appInfo, setPageStep } from '../stores/index';

const props = defineProps({
    steps: {
        type: Number,
        default: 3,
    },
    current: {
        type: Number,
        default: 2,
    },
});

const Router = useRouter();

const handleStep = (step) => {
    // console.log(step);
    if (appInfo.value.pageSteps[Router.currentRoute.value.path]) {
        setPageStep(Router.currentRoute.value.path, step);
    }
};

const widthComputed = computed(() => {
    return `${props.steps * 20 + (props.steps - 1) * 160}px`;
});

const getDotClass = (step) => {
    let arr = [];
    if (step === props.current) arr.push('current');
    if (step !== props.steps) arr.push('progress');
    return arr;
};
</script>

<template>
    <div class="steps-box" :style="{ width: widthComputed }">
        <div
            class="dot"
            :class="getDotClass(i)"
            v-for="i in steps"
            @click="
                () => {
                    handleStep(i);
                }
            "
        ></div>
    </div>
</template>

<style lang="scss">
.steps-box {
    padding: 24px 0 20px 0;
    @apply flex justify-between items-center;
    .dot {
        width: 20px;
        height: 20px;
        @apply rounded-full bg-gray0 relative;
        @apply cursor-pointer;
        &.current {
            @apply rounded-full bg-green0;
        }

        &.progress {
            position: relative;
            &::after {
                content: '';
                width: 160px;
                height: 1px;
                @apply absolute;
                @apply border border-gray1;
                right: -160px;
                top: 9px;
            }
        }
    }
}
</style>
