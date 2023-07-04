<script setup>
import { computed, ref, onUpdated, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { appInfo } from '../stores';
import InputButtonVue from './InputButton.vue';
import { clientModeEnumMap } from '../stores/index';

const { rootBase } = clientModeEnumMap.posB;

const DialogEnum = {
    COMFIRM: 'comfirm',
    DELETE: 'delete',
    lg: { maxWidth: 1200, maxHeight: window.innerHeight - 200 },
    md: { maxWidth: 800, maxHeight: window.innerHeight - 200 },
    sm: { maxWidth: 360, maxHeight: window.innerHeight - 200 },
};

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    align: {
        type: String,
        default: 'left',
    },
    handleCallback: {
        type: Function,
        default: () => {},
    },
    mode: {
        type: String,
        default: 'comfirm',
    },
    size: {
        type: String,
        default: 'sm',
    },
    width: {
        type: Number,
        default: null,
    },
    height: {
        type: Number,
        default: null,
    },
    showFooter: {
        type: Boolean,
        default: true,
    },
    withCancel: {
        type: Boolean,
        default: false,
    },
    btnLabels: {
        type: Array,
        default: [],
    },
});

const maxWidth = computed(() => {
    return props.width ? props.width : DialogEnum[props.size]?.maxWidth || 360;
});
const maxHeight = computed(() => {
    return props.height ? props.height - 100 : DialogEnum[props.size]?.maxHeight || 820;
});
const dialogBodyIn = ref();
const isScroll = ref(false);
const emit = defineEmits(['update:modelValue']);

const handleComfirm = () => {
    if (props.btnLabels[1]) {
        props.handleCallback('comfirm');
    } else {
        props.handleCallback();
    }

    emit('update:modelValue', false);
};

const handleCloseWrapper = (e) => {
    if (props.btnLabels[0]) {
        props.handleCallback('cancel');
    }

    if (e.target.classList.contains('gt-dialog-wrapper')) {
        emit('update:modelValue', false);
    }
};

const handleClose = (e) => {
    emit('update:modelValue', false);
};

const IDref = ref();
const wrapperClassComputed = computed(() => {
    let list = IDref.value?.classList;
    let arr = ['gt-dialog-wrapper'];
    if (props.modelValue) arr.push('active');
    if (!props.modelValue && list && list.contains('active')) arr.push('in-active');
    return arr;
});

const Router = useRouter();

const handleToRouteBelongFlow = ()=>{
    console.log('in',`${rootBase}/member-belonged`);
    Router.push(`${rootBase}/member-belonged`)
}

onUpdated(() => {
    let bodyHight = Math.ceil(dialogBodyIn.value.getBoundingClientRect()?.height);
    // console.log(bodyHight, maxHeight.value);
    isScroll.value = bodyHight > maxHeight.value - 160 ? true : false;
});
</script>

<template>
    <div ref="IDref" :class="wrapperClassComputed" @click="handleCloseWrapper">
        <div
            class="gt-dialog"
            :class="[`gt-text-${align}`, modelValue ? 'active' : 'in-active']"
            @click.prevent="() => {}"
            :style="{
                maxWidth: maxWidth + 'px',
            }"
        >
            <div class="dialog-head">
                {{ title }}
                <div class="closeIcon" @click="handleClose"><i class="close-icon fas fa-times"></i></div>
            </div>
            <div
                class="dialog-body"
                :class="showFooter ? '' : 'fixShowFooter'"
                :style="{
                    maxHeight: maxHeight + 'px',
                    overflowY: isScroll ? 'scroll' : 'none',
                }"
            >
                <div class="dialog-body-in" ref="dialogBodyIn">
                    <slot></slot>
                </div>
            </div>
            <div v-if="showFooter" class="dialog-footer">
                <InputButtonVue v-if="withCancel" class="btn-cancel" @click="handleClose"
                    >{{ btnLabels[0] || '取消' }}
                </InputButtonVue>
                <template v-if="mode == DialogEnum.COMFIRM">
                    <InputButtonVue @click="handleComfirm">{{ btnLabels[1] || '確定' }}</InputButtonVue>
                </template>
                <template v-else>
                    <InputButtonVue @click="handleComfirm">刪除</InputButtonVue>
                </template>
            </div>
        </div>

        <div @click.stop="handleToRouteBelongFlow" class="dialog-btn-icon">
            <img src="../assets/images/gt-icon-gray.png" alt="">
        </div>
    </div>
</template>

<style lang="scss">
.gt-dialog-wrapper {
    width: 100vw;
    height: 100vh;
    @apply flex justify-center items-center;
    background-color: rgba(0, 0, 0, 0.25);
    @apply fixed left-0 top-0;
    opacity: 0;
    z-index: -10;

    &.in-active {
        animation: tpFadeOutNoTransform 0.5s both;
    }

    &.active {
        animation: tpFadeInNoTransform 0.5s both;
    }
}
.gt-dialog {
    width: 100%;
    @apply flex;
    @apply flex-col bg-white text-black0;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    font-size: 32px;
    letter-spacing: 0.8px;

    &.in-active {
        animation: tpFadeOut 0.5s both;
    }

    &.active {
        animation: tpFadeIn 0.5s both;
    }

    .dialog-head {
        width: 100%;
        height: 44px;
        padding: 12px 10px 8px 40px;
        line-height: 24px;
        font-weight: 500;
        @apply relative;
        .closeIcon {
            @apply absolute cursor-pointer;
            right: 20px;
            top: 10px;
            @apply text-gray0;
            &:hover {
                @apply text-black0;
            }
        }
    }

    .dialog-body {
        min-height: 83px;
        padding: 20px 0px 40px 0px;
        line-height: 23px;
        font-weight: 400;
        @apply text-center;
        .dialog-body-in {
            width: 100%;
            height: 100%;
        }

        p {
            padding: 0px 10px;
            line-height: 40px;
        }

        &::-webkit-scrollbar {
            width: 5px;
            height: 1px;
            background-color: #d9d9d9;
            border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: #aaaaaa;
            &:hover {
                background-color: #666666;
            }
        }

        &.fixShowFooter {
            padding: 0px 0px 40px 0px;
        }
    }
    .dialog-footer {
        height: 56px;
        padding: 60px 0;

        @apply flex justify-end items-center;
        .btn-cancel {
            margin-right: 10px;
            @apply bg-white border border-solid border-main;
        }

        .input-button {
            width: 280px;
            height: 58px;
            line-height: 58px;
            padding: 0;
        }
    }
}

.dialog-btn-icon{
    width: 80px;
    height: 80px;
    @apply fixed right-2 bottom-2 cursor-pointer;

}

</style>
