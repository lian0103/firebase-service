<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    option: {
        default: {},
    },
    label: {
        default: null,
    },
    value: {
        default: null,
    },
    icon: {
        default: false,
    },
    parentValue: {
        default: null,
    },
    handleChildClick: {
        default: () => {},
    },
});
const isCurrentClick = ref(false);

const isCurrent = computed(() => {
    return props.parentValue?.value
        ? props.parentValue?.value === props.option.value || props.parentValue?.value === props.value
        : '';
});

const handleMouseLeave = () => {
    // console.log('in');
    isCurrentClick.value = false;
};

const classComputed = computed(() => {
    let arr = [];
    if (isCurrentClick.value) {
        arr.push('curClicked');
    } else if (isCurrent.value) {
        arr.push('current');
    }
    return arr;
});

const emit = defineEmits(['itemClick']);

const handleClick = () => {
    emit('itemClick', { label: props.label, value: props.value });
};
</script>

<template>
    <div
        v-if="label"
        @mouseleave="handleMouseLeave"
        class="gt-dropdown-item"
        :class="classComputed"
        @click.stop="
            (e) => {
                e.stopPropagation();
                if (props.handleChildClick) {
                    props.handleChildClick(value || null);
                }
                handleClick();

                isCurrentClick = true;
            }
        "
    >
        <!-- <g-icon v-if="icon" class="icon" name="check" /> -->
        <span :class="isCurrent ? 'text-black0' : ''" :style="icon ? {} : { 'padding-left': '14px' }"
            ><div class="txt">{{ label }}</div></span
        >
    </div>
</template>
