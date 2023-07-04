<script setup>
import GenderRadioboxVue from './GenderRadiobox.vue';
import InputText from './InputText.vue';
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {},
    labelText: {
        type: String,
        default: null,
    },
});

const inputRef = ref(null);

const typeRef = ref(props.modelValue?.type || '0');

const valueRef = ref(props.modelValue?.id || '');

const makeInputFocus = () => {
    // console.log('in', inputRef.value);
    inputRef.value.focus();
    inputRef.value.valid();
};

defineExpose({
    focus: makeInputFocus,
});

const emit = defineEmits(['update:modelValue']);

watch([() => valueRef.value, () => typeRef.value], () => {
    // console.log('in watch...', { type: typeRef.value, id: valueRef.value });
    emit('update:modelValue', { type: typeRef.value, id: valueRef.value });
});
</script>

<template>
    <div class="form-item-wrapper">
        <div v-if="labelText" class="label">{{ labelText }}</div>
        <div class="id-select-box">
            <div class="row-item">
                <GenderRadioboxVue v-model="typeRef" :values="['0', '1']" :labels="['身份證', '居留證']" />
            </div>
            <div class="row-item">
                <InputText
                    ref="inputRef"
                    v-model="valueRef"
                    :type="typeRef == '0' ? 'ID-tw' : 'ID-foreign'"
                    placeholder="身分證字號"
                    required
                />
            </div>
            <div class="row-item">
                <span class="row-item-text">
                    為確保您的會員權益，如手機尚未完成驗證，需提供身分證字號，作為往後身分識別之憑證
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.form-item-wrapper {
    .id-select-box {
        @apply flex flex-col justify-between items-center;
        gap: 15px;
        flex-grow: 2;
        .row-item {
            @apply flex justify-between items-center w-full;
            height: 78px;
            gap: 30px;
            .road {
                flex-grow: 2;
            }
            .form-item-wrapper {
                flex-grow: 2;
            }
        }
        .row-item-text {
            font-size: 24px;
            line-height: 26px;
            padding-top: 10px;
            @apply text-gray0 font-medium text-left;
        }
    }
}
</style>
