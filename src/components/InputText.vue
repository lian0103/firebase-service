<script setup>
import { watch } from '@vue/runtime-core';
import lang from '../assets/lang';
import { phoneRegex, phoneFormat, emailRegex, checkTwID, checkForeignID, varigyGtNumber } from '../utils/index';

const props = defineProps({
    modelValue: {},
    placeholder: {},
    type: {
        type: String,
        default: '',
    },
    labelText: {
        type: String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
});

const inputRef = ref();

const inputValue = props.type === 'phone' ? ref(phoneFormat(props.modelValue)) : ref(props.modelValue);

const errorMsg = ref('');

const validMsg = ref('');

const emit = defineEmits(['update:modelValue']);

const doValid = (msg = lang.inputRequire) => {
    errorMsg.value = '';
    validMsg.value = !inputValue.value ? msg : '';

    if (props.required && props.type == 'ID-tw' && !checkTwID(inputValue.value)) {
        validMsg.value = lang.idInvalidMsg1;
    }
    if (props.required && props.type == 'ID-foreign' && !checkForeignID(inputValue.value)) {
        validMsg.value = lang.idInvalidMsg2;
    }
};

watch(
    () => inputValue.value,
    (val, oldVal) => {
        validMsg.value = '';
        if (props.type === 'phone' && val.length > oldVal.length) {
            if (val.length === 5) {
                let arr = val.split('');
                arr.splice(4, 0, '-');
                let str = arr.join('');
                inputValue.value = str;
            }
            if (val.length == 9) {
                let arr = val.split('');
                arr.splice(8, 0, '-');
                let str = arr.join('');
                inputValue.value = str;
            }
            if (val.length == 10) {
                let arr = val.replaceAll('-', '').split('');
                arr.splice(4, 0, '-');
                arr.splice(8, 0, '-');
                let str = arr.join('');
                inputValue.value = str;
            }
            if (!phoneRegex.test(val.replaceAll('-', '')) && val.length == 12) {
                errorMsg.value = '手機格式錯誤';
            } else {
                errorMsg.value = '';
            }
        }

        if (props.type === 'ID-tw') {
            if (val.length === 10) {
                errorMsg.value = checkTwID(val) ? '' : lang.idInvalidMsg1;
            } else if (val.length > 10) {
                let str = val.slice(0, 10);
                inputValue.value = str;
            } else {
                errorMsg.value = '';
            }
        }

        if (props.type === 'ID-foreign') {
            if (val.length === 10) {
                errorMsg.value = checkForeignID(val) ? '' : '居留證格式錯誤';
            } else if (val.length > 10) {
                let str = val.slice(0, 10);
                inputValue.value = str;
            } else {
                errorMsg.value = '';
            }
        }

        if (props.type === 'email' && val.length > oldVal.length) {
            errorMsg.value = emailRegex.test(val) ? '' : 'Email格式有誤';
        }

        if (props.type === 'gt-num') {
            if (val.length == 5) {
                errorMsg.value = varigyGtNumber.test(val) ? '' : '員工編號格式錯誤';
            } else if (val.length > 5) {
                let str = val.slice(0, 5);
                inputValue.value = str;
            }
        }
    }
);

watch(
    () => props.type,
    () => {
        doValid();
    }
);

const handleInput = (e) => {
    // console.log('e.data',e.data)
    let val = inputValue.value;
    if (props.type === 'phone') {
        if (!/[0-9\-]/.test(e.data) && e.data ) {
            // console.log(e.data);
            val = val.replace(/[^0-9\-]/g, '');
            errorMsg.value = '請輸入數字';
        }
        if (e.data === '-') {
            let strArr = val.split('');
            strArr = strArr.map((s, idx) => {
                if (s === '-' && !(idx == 4 || idx == 8)) {
                    return '';
                }
                return s;
            });
            strArr.filter((s) => s != '');
            val = strArr.join('');
            errorMsg.value = '請輸入數字';
        }
    }

    if (props.type === 'ID-tw') {
        if (!/[A-Z0-9]/.test(e.data)) {
            // console.log(e.data);
            val = val.replace(/[^A-Z0-9\-]/g, '');
            errorMsg.value = '請輸入大寫英文和數字';
        }
    }

    if (props.type === 'email') {
        if (!emailRegex.test(val)) {
            let str = val.replace(/[^0-9a-zA-z\-\@\.]/gi, '');
            // console.log('str',str)
            val = str;
        }
    }

    if (props.type === 'gt-num') {
        if (!/[0-9\-]/.test(e.data)) {
            // console.log(e.data);
            val = val.replace(/[^0-9\-]/g, '');
            errorMsg.value = '請輸入數字';
        }
    }

    inputValue.value = val;
    emit('update:modelValue', val);
};

const handleChange = () => {
    emit('update:modelValue', inputValue.value);
};

const handleClear = () => {
    inputValue.value = '';
    errorMsg.value = '';
    emit('update:modelValue', '');
};

const handleFocus = () => {
    inputRef.value.focus();
};

const handleBlur = () => {
    if (props.required) {
        doValid();
    }
};

defineExpose({
    focus: handleFocus,
    valid: doValid,
});
</script>

<template>
    <div class="form-item-wrapper" :class="disabled ? 'disabled' : ''">
        <div v-if="labelText" class="label">
            {{ labelText }}
        </div>

        <input
            ref="inputRef"
            class="input-text"
            :class="[validMsg ? 'valid-msg' : '', inputValue != '' ? 'hasValue' : '']"
            :maxlength="type === 'phone' ? 12 : ''"
            v-model="inputValue"
            @input="handleInput"
            @change="handleChange"
            @blur="handleBlur"
            :placeholder="placeholder"
            :disabled="disabled"
        />
        <div
            class="close-icon"
            @click.stop="
                () => {
                    handleClear();
                }
            "
        >
            <i v-if="!disabled" class="close-icon fas fa-times"></i>
        </div>
        <span class="error-msg" :class="labelText ? 'withLabel' : ''">{{ errorMsg || validMsg }}</span>
    </div>
</template>

<style lang="scss">
.form-item-wrapper {
    transition: all 0.3s ease-in-out;
    .input-text {
        flex-grow: 2;
        height: 78px;
        padding: 20px 0;
        @apply text-black0 font-medium text-center mx-auto bg-white;
        font-size: 32px;
        line-height: 43px;
        border: 2px solid;
        border-color: rgba(153, 153, 153, 0.5);
        border-radius: 10px;
        letter-spacing: 2px;
        &:focus {
            @apply outline-transparent;
        }
        &.hasValue {
            border-color: rgba(0, 165, 58, 0.5);
        }
        &.valid-msg {
            border-color: rgba(228, 23, 73, 0.5);
        }
    }

    .close-icon {
        @apply absolute;
        top: 15px;
        right: 10px;
        font-size: 24px;
        @apply text-gray0 cursor-pointer opacity-0;
    }

    &:hover {
        .close-icon {
            @apply opacity-100;
        }
    }

    .error-msg {
        font-size: 24px;
        @apply text-danger font-medium absolute left-0;
        bottom: -24px;

        &.withLabel {
            left: 20%;
        }
    }

    &.disabled {
        .input-text {
            @apply text-gray0 cursor-not-allowed;
            border-color: rgba(153, 153, 153, 0.5);
        }
    }
}
</style>
