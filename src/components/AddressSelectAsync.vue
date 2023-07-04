<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import GDropdown from './dropdown.vue';
import GDropdownItem from './dropdownitem.vue';
import InputText from './InputText.vue';
import { getCountryCode, getDistrictsCode } from '../api/index';

const props = defineProps({
    modelValue: {
        type: Array,
        default: [],
    },
    labelText: {
        type: String,
        default: null,
    },
});

const inputRef = ref(null);

const emit = defineEmits(['update:modelValue']);

const valueReative = reactive({
    city: props.modelValue[0] || '0',
    district: props.modelValue[1] || '0',
    // last: props.modelValue[2],
});

const valueLast = ref('');

const cityOptions = ref([{ label: '請選擇', value: '0' }]);
const districtOptions = ref([{ label: '請選擇', value: '0' }]);

const genDistrictOptions = async () => {
    let newDistrict = await getDistrictsCode({ country_code_id: valueReative.city });
    let arr = [];
    newDistrict.forEach((item) => {
        arr.push({ label: item.postal_name, value: '' + item.id, postal_code: item.postal_code });
    });
    districtOptions.value = arr;
    return arr;
};

const replaceAreaDistrictNameInLast = () => {
    console.log('districtOptions.value', districtOptions.value, valueReative.district);
    let city = cityOptions.value?.find((item) => item.value == valueReative.city).label;
    let district = districtOptions.value?.find((item) => item.value == valueReative.district).label;
    let str = valueLast.value
        ? valueLast.value.replaceAll(city, '').replaceAll(district, '')
        : props.modelValue[2].replaceAll(city, '').replaceAll(district, '');

    valueLast.value = str;
    // console.log('str', str);
};

const emitValueModel = () => {
    let address = [
        valueReative.city !== '0' ? valueReative.city : '',
        valueReative.district !== '0' ? valueReative.district : '',
        valueLast.value,
        `${
            valueReative.city !== '0' && cityOptions.value?.find((item) => item.value == valueReative.city)
                ? cityOptions.value?.find((item) => item.value == valueReative.city).label
                : ''
        }${
            valueReative.district !== '0' && districtOptions.value?.find((item) => item.value == valueReative.district)
                ? districtOptions.value?.find((item) => item.value == valueReative.district).label
                : ''
        }`,
        valueReative.district !== '0' && districtOptions.value?.find((item) => item.value == valueReative.district)
            ? districtOptions.value?.find((item) => item.value == valueReative.district).value
            : '',
        valueReative.district !== '0' && districtOptions.value?.find((item) => item.value == valueReative.district)
            ? districtOptions.value?.find((item) => item.value == valueReative.district).postal_code
            : '',
    ];

    // console.log(address);

    emit('update:modelValue', address);
};

watch(
    () => valueReative.city,
    async (val) => {
        if (valueReative.city !== '0') {
            let arr = await genDistrictOptions();
            valueReative.district = arr[0].value;
        } else {
            districtOptions.value = [{ label: '請選擇', value: '0' }];
            valueReative.district = '0';
        }
    }
);

watch(
    valueReative,
    () => {
        emitValueModel();
    },
    { deep: true }
);

watch(
    () => valueLast.value,
    () => {
        emitValueModel();
    }
);

const makeInputFocus = () => {
    // console.log('in', inputRef.value);
    inputRef.value.focus();
    inputRef.value.valid();
};

defineExpose({
    focus: makeInputFocus,
});

onMounted(async () => {
    let cityResult = await getCountryCode();
    cityResult.forEach((item) => {
        cityOptions.value.push({ label: item.postal_name, value: item.id });
    });

    if (valueReative.city !== '0') {
        // console.log('in onMounted 0000');
        await genDistrictOptions();
        replaceAreaDistrictNameInLast();
    }

    emitValueModel();
});
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
                <InputText v-if="valueLast" ref="inputRef" class="road" v-model="valueLast" placeholder="地址" />
                <InputText v-if="!valueLast" ref="inputRef" class="road" v-model="valueLast" placeholder="地址" />
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
