<script setup>
import { computed, reactive, ref, watch } from 'vue';
import GDropdown from './dropdown.vue';
import GDropdownItem from './dropdownitem.vue';
import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';

const props = defineProps({
    modelValue: {},
    labelText: {
        type: String,
        default: null,
    },
    infoText:{
        type: String,
        default: null,
    }
});

const emit = defineEmits(['update:modelValue']);

const valueReative = reactive({
    year: props.modelValue?.split('-')[0] ? '' + props.modelValue.split('-')[0] : '' + new Date().getFullYear(),
    month: props.modelValue?.split('-')[1] ? '' + props.modelValue.split('-')[1] : '' + (new Date().getMonth() + 1),
    day: props.modelValue?.split('-')[2] ? '' + props.modelValue.split('-')[2] : '' + new Date().getDate(),
});

const thisYear = new Date().getFullYear();
const yearOptions = new Array(100).fill('').map((i, idx) => ({ label: thisYear - idx, value: '' + (thisYear - idx) }));

const monthsOptions = new Array(12)
    .fill('')
    .map((i, idx) => ({
        label: '' + (12 - idx > 9 ? 12 - idx : '0' + (12 - idx)),
        value: '' + (12 - idx > 9 ? 12 - idx : '0' + (12 - idx)),
    }))
    .reverse();

// console.log('monthsOptions', monthsOptions);

const daysOptions = computed(() => {
    let endOfDay = valueReative.year
        ? dayjs(`${valueReative.year}-${valueReative.month}-${valueReative.day}`).endOf('month').$D
        : '';
    // console.log('endOfDay',endOfDay)
    return valueReative.year && valueReative.month
        ? new Array(endOfDay)
              .fill('')
              .map((i, idx) => ({
                  label: '' + (endOfDay - idx > 9 ? endOfDay - idx : '0' + (endOfDay - idx)),
                  value: '' + (endOfDay - idx > 9 ? endOfDay - idx : '0' + (endOfDay - idx)),
              }))
              .reverse()
        : '';
});

watch(valueReative,()=>{
    emit('update:modelValue', `${valueReative.year}-${valueReative.month}-${valueReative.day}`);
})

const handleYearClick = () => {};
</script>

<template>
    <div class="form-item-wrapper">
        <div v-if="labelText" class="label">{{ labelText }}</div>
        <div class="date-select-box">
            <g-dropdown v-model="valueReative.year" :options="yearOptions">
                <g-dropdown-item
                    v-for="item in yearOptions"
                    :key="'year-' + item.label"
                    :label="item.label"
                    :value="item.value"
                    @itemClick="handleYearClick"
                />
            </g-dropdown>

            <g-dropdown v-model="valueReative.month" :options="monthsOptions">
                <g-dropdown-item
                    v-for="item in monthsOptions"
                    :key="'month-' + item.label"
                    :label="item.label"
                    :value="item.value"
                    @itemClick="handleYearClick"
                />
            </g-dropdown>

            <g-dropdown v-model="valueReative.day" :options="daysOptions">
                <g-dropdown-item
                    v-for="item in daysOptions"
                    :key="uuidv4() + item.label"
                    :label="item.label"
                    :value="item.value"
                    @itemClick="handleYearClick"
                />
            </g-dropdown>
        </div>
        <span class="info-text" v-if="infoText">{{infoText}}</span>
    </div>
</template>

<style lang="scss">
.form-item-wrapper {
    .date-select-box {
        @apply flex justify-between items-center relative;
        flex-grow: 2;
        gap: 30px;
    }

    .info-text{
        @apply absolute;
        left: 20%;
        top: 76px;
        font-size: 24px;
        @apply text-gray0 font-medium;
    }
}
</style>
