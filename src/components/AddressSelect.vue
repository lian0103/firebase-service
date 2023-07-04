<script setup>
import { computed, reactive, ref, watch } from 'vue';
import GDropdown from './dropdown.vue';
import GDropdownItem from './dropdownitem.vue';
import InputText from './InputText.vue';
import TWJSON from '../assets/tw.json';

const props = defineProps({
    modelValue: {},
    labelText: {
        type: String,
        default: null,
    },
});

// console.log('TWJSON', TWJSON);
const emit = defineEmits(['update:modelValue']);

const valueReative = reactive(
    props.modelValue.split('-').length === 3
        ? {
              city: props.modelValue.split('-')[0] ? '' + props.modelValue.split('-')[0] : TWJSON[0].name,
              district: props.modelValue.split('-')[1]
                  ? '' + props.modelValue.split('-')[1]
                  : TWJSON[0].districts[0].name,
              last: props.modelValue.split('-')[2] ? '' + props.modelValue.split('-')[2] : '',
          }
        : {
              city: '請選擇',
              district: '請選擇',
              last: props.modelValue,
          }
);

const cityOptions = TWJSON.map((item) => ({ label: item.name, value: item.name }));

const districtOptions = computed(() => {
    return valueReative.city && valueReative.district
        ? TWJSON[TWJSON.findIndex((item) => item.name === valueReative.city)]?.districts.map((dItem) => ({
              label: dItem.name,
              value: dItem.name,
          }))
        : '';
});

// console.log(districtOptions);

watch(()=>valueReative.city, () => {
    if (valueReative.city !== '請選擇') {
        // console.log('in 1')
        let newDistrict = TWJSON[TWJSON.findIndex((item) => item.name === valueReative.city)].districts[0].name;
        valueReative.district = newDistrict;
    }
});

watch(
    valueReative,
    () => {
        // console.log('in 2')
        let address = `${valueReative.city !== '請選擇' ? valueReative.city + '-' : ''}${
            valueReative.district !== '請選擇' ? valueReative.district + '-' : ''
        }${valueReative.last}`;
        console.log(address);
        emit('update:modelValue', address);
    },
    { deep: true }
);
</script>

<template>
    <div class="form-item-wrapper">
        <div v-if="labelText" class="label">{{ labelText }}</div>
        <div class="address-select-box">
            <div class="row-item">
                <g-dropdown v-model="valueReative.city" :options="cityOptions">
                    <g-dropdown-item
                        v-for="item in cityOptions"
                        :key="'city-' + item.label"
                        :label="item.label"
                        :value="item.value"
                        :handleValChange="handleCity"
                    />
                </g-dropdown>

                <g-dropdown v-model="valueReative.district" :options="districtOptions" :isDistrict="true">
                    <g-dropdown-item
                        v-for="item in districtOptions"
                        :key="'district-' + item.label"
                        :label="item.label"
                        :value="item.value"
                    />
                </g-dropdown>
            </div>
            <div class="row-item">
                <InputText class="road" v-model="valueReative.last" placeholder="地址" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.form-item-wrapper {
    .address-select-box {
        @apply flex flex-col justify-between items-center;
        gap: 30px;
        flex-grow: 2;
        .row-item {
            @apply flex justify-between items-center w-full;
            gap: 30px;
            .road {
                flex-grow: 2;
            }
        }
    }
}
</style>
