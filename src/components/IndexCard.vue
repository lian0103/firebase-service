<script setup>
const props = defineProps({
    cardInfo: {
        type: Object,
        default: {
            icon: '',
            label: '',
            path: '',
            text: '',
        },
    },
});
</script>

<template>
    <div class="card">
        <div class="card-top"><i :class="cardInfo.icon"></i> <span v-html="cardInfo.label"></span></div>
        <div class="card-down">
            <span v-html="cardInfo.text"></span>
        </div>
    </div>
</template>

<style lang="scss">
.card {
    @apply w-full overflow-hidden;
    height: 320px;
    padding: 0 20px;
    max-width: 280px;
    border-radius: 10px;
    @apply border border-solid border-green0;
    @apply flex flex-col justify-start items-center;
    @apply cursor-pointer;
    gap: 20px;

    @media screen and (max-width: 860px) {
        @apply mx-auto;
        max-width: 360px;
        height: 240px;
        margin-top: 20px;
    }

    .card-top {
        @apply flex flex-col items-center;
        white-space: nowrap;
        font-size: 36px;
        padding: 60px 10px 0 10px;
        gap: 15px;
        svg {
            @apply text-green0;
            margin-right: 10px;
        }
        span {
            @apply text-black0 font-medium;
            font-size: 36px;
        }
    }

    .card-down {
        @apply text-center text-2xl text-gray0;
        flex-grow: 2;
    }
}
</style>
