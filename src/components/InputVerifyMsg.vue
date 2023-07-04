<script setup>
import { onMounted, ref, watch } from 'vue';
import lang from '../assets/lang';

const props = defineProps({
    modelValue: {},
    isError: {
        type: Boolean,
        default: false,
    },
    sentSMSCallback: {
        type: Function,
        default: () => {},
    },
});

const inputRef = ref();

const inputValue = ref(props.modelValue || '');

const errorMsg = ref('');

const conutValue = ref(60);

const loading = ref(false);

const emit = defineEmits(['update:modelValue', 'initError']);

watch(
    () => inputValue.value,
    (val, oldVal) => {
        // console.log(oldVal);

        if (('' + val).length > 4) {
            inputValue.value = '' + oldVal;
        }
        emit('initError', false);
        errorMsg.value = '';
    }
);

watch(
    () => props.isError,
    (val) => {
        if (val) {
            errorMsg.value = '驗證碼錯誤，請重新輸入';
        }
    }
);

const handleInput = (e) => {
    // console.log('e.data',e.data)
    let str = inputValue.value;
    if (!/[0-9]/.test(e.data)) {
        errorMsg.value = '請輸入數字';
        str = inputValue.value.replace(/[^0-9]/g, '');
        inputValue.value = str;
    } else {
        errorMsg.value = '';
    }
    emit('update:modelValue', str);
};

const handleFocus = () => {
    inputRef.value.focus();
};

const startCountDown = () => {
    conutValue.value = 60;
    let interval = setInterval(() => {
        let val = conutValue.value - 1;
        conutValue.value = val;
        if (val == 0) {
            clearInterval(interval);
        }
    }, 1000);
};

const handleSentSMS = async () => {
    loading.value = true;
    await props.sentSMSCallback();
    loading.value = false;
    startCountDown();
};

defineExpose({
    focus: handleFocus,
    startCountDown: startCountDown,
});

const handleClear = () => {
    inputValue.value = '';
    errorMsg.value = '';
    emit('update:modelValue', '');
    handleFocus();
};

onMounted(() => {
    // handleFocus();
});
</script>

<template>
    <div class="input-verigy-msg-wrapper">
        <input ref="inputRef" class="input-text" v-model="inputValue" @input="handleInput" />
        <div class="numberBox" @click="handleFocus">
            <div
                class="number-item"
                :class="[('' + inputValue)[i - 1] ? (isError ? 'active is-error' : 'active') : '']"
                v-for="i in 4"
                :key="i"
            >
                {{ ('' + inputValue)[i - 1] }}
            </div>
        </div>

        <div
            class="close-icon"
            @click.stop="
                () => {
                    handleClear();
                }
            "
        >
            <i class="close-icon fas fa-times"></i>
        </div>
        <span class="error-msg">{{ errorMsg }}</span>
    </div>
    <p v-if="conutValue" class="send-again-text">{{ conutValue + lang.info5 }}</p>
    <p v-else-if="loading" class="send-again-text">
        <div class="loading"></div>
    </p>
    <p v-else class="send-again-text cursor-pointer" @click="handleSentSMS">{{ lang.reSentSMS }}</p>
</template>

<style lang="scss">
.input-verigy-msg-wrapper {
    @apply relative;
    padding: 0 30px 0px 30px;
    transition: all 0.3s ease-in-out;
    .input-text {
        // display: none;
        opacity: 0;
    }
    .numberBox {
        @apply flex justify-center items-center;
        gap: 40px;
        .number-item {
            width: 80px;
            height: 160px;
            max-width: 760px;
            padding: 20px 0;
            @apply text-black0 font-medium text-center mx-auto bg-white;
            font-size: 32px;
            line-height: 110px;
            border: 2px solid;
            border-color: rgba(153, 153, 153, 0.5);
            border-radius: 10px;
            letter-spacing: 2px;
            @apply cursor-pointer;
            transition: all 0.3s ease-in-out;

            &.active {
                border-color: rgba(0, 165, 58, 0.5);
            }

            &.is-error {
                border-color: rgba(228, 23, 73, 0.5);
            }
        }
    }

    .close-icon {
        @apply absolute;
        top: 45px;
        right: 0px;
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
        padding-left: 30px;
        @apply text-danger font-medium absolute left-0;
        bottom: -24px;
    }
}

.send-again-text{
    .loading{
        @apply text-center border-4 border-solid border-transparent border-l-green0 rounded-full;
        width: 24px;
        height: 24px;
        animation: loading 1s linear infinite;
    }
}
</style>
