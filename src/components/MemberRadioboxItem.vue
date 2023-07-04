<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    nameID: {
        type: String,
        default: null,
    },
    labelText: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Boolean,
        default: false,
    },
    currentRadio:{},
    handleValChange:{}
});

</script>

<script>
export default {
    name: 'MemberRadioboxItem',
};
</script>

<template>
    <div class="member-radiobox-item" :class="currentRadio?.value===nameID?'clicked':''">
        <Radiobox :currentRadio="currentRadio" :handleValChange="handleValChange"  :value="nameID"
            ><span class="label-slot">{{ labelText }}</span> <span class="phone-slot">{{ phone }}</span>
            <span class="member-slot">{{ isMember ? '已歸戶' : '' }}</span>
        </Radiobox>
    </div>
</template>

<style lang="scss">
.member-radiobox-item {
    @apply flex justify-center items-center;
    @apply text-black0 font-medium bg-white;
    @apply max-w-ipadMini;
    transition: all .3s ease-in-out;
    border: 2px solid ;
    border-color: rgba(153, 153, 153, 0.5);
    border-radius: 10px;
    width: 100%;
    margin: 0 auto 40px auto;

    .gt-radiobox {
        width: 100%;
        height: 78px;
        padding-left: 43px;
        @apply flex justify-start items-center;

        position: relative;
        svg {
            margin-right: 98px;
        }
        .label-text{
            @apply flex justify-around items-center;
        }

        .label-slot {
            width: 90px;
            margin-right: 40px;
        }

        .member-slot {
            @apply text-green1 absolute;
            top: 23px;
            right: 40px;
        }
    }

    &.clicked{
        @apply border-green1 bg-green2;
    }
}
</style>
