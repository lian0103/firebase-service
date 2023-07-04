<script>
export default {
    name: 'Radiobox',
};
</script>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
    currentRadio: {},
    label: {
        default: null,
    },
    value: {
        default: null,
    },
    handleValChange: {
        type: Function,
    },
});

// console.log(props.currentRadio);

const isChecked = props.currentRadio ? computed(() => props.value === props.currentRadio.value) : ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

const onClick = () => {
    if (props.handleValChange) {
        // console.log('in step1', props.value);
        props.handleValChange(props.value);
    }

    if (!props.disabled && props.modelValue) {
        let val = !isChecked.value;
        isChecked.value = val;
        emit('update:modelValue', val);
    }
};
</script>

<template>
    <div :class="disabled ? 'disabled' : ''" @click.prevent="onClick" class="gt-radiobox">
        <svg fill="none" height="30" width="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect
                :fill="disabled ? (isChecked ? '#AAAAAA' : '') : '#fff'"
                height="29"
                rx="9.5"
                width="29"
                x="0.5"
                y="0.5"
            />
            <circle
                :class="isChecked ? 'circle show' : 'circle'"
                :fill="disabled ? (isChecked ? '#AAAAAA' : '') : isChecked ? '#4AD5A9' : '#999999'"
                cx="15"
                cy="15"
                r="7.25"
            />

            <rect :stroke="isChecked ? '#4AD5A9' : '#AAA'" height="29" rx="20.5" width="29" x="0.5" y="0.5" />
        </svg>

        <span :class="disabled ? 'label-disabled' : ''" class="label-text" v-if="label">{{ label }}</span>
        <span class="label-text"> <slot></slot> </span>
    </div>
</template>

<style lang="scss">
.gt-radiobox {
    width: fit-content;
    padding: 0 20px 0 26px;
    line-height: 30px;
    height: 30px;
    min-width: 20px;
    @apply relative cursor-pointer flex justify-start;
    transition: all 0.3s ease-in-out;

    &.disabled {
        @apply cursor-not-allowed;
    }

    svg {
        margin-right: 10px;
    }

    .circle {
        opacity: 0;
        &.show {
            opacity: 1;
        }
    }

    .label-text {
        @apply select-none;
        font-size: 24px;
        @apply text-black0 font-medium;
        &.label-disabled {
            @apply cursor-not-allowed;
        }
    }
}
</style>
