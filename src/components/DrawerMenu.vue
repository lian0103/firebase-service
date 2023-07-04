<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const handleClose = () => {
    emit('update:modelValue', false);
};
</script>

<template>
    <div class="drawer-wrapper" :class="modelValue ? 'open' : 'close'" @click="handleClose">
        <div class="drawer-box" @click.stop="() => {}" :style="{ width: modelValue ? '300px' : '0px' }">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.drawer-wrapper {
    @apply w-screen h-screen fixed left-0 top-0;

    transition: all 0.3s ease-in-out;

    &.open {
        z-index: 100;
        opacity: 1;
        background: rgba(79, 79, 79, 0.35);
    }

    &.close {
        z-index: -10;
        opacity: 0;
        background: transparent;
    }

    .drawer-box {
        // width: 300px;
        padding: 40px 20px;
        transition: all 0.3s ease-in-out;
        @apply h-full bg-white;
    }
}
</style>
