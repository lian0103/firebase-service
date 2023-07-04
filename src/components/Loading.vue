<script setup>
import { ref } from 'vue';

const gLoadingShow = ref(false);

const handleLoadingTrigger = (value = false) => {
    // console.log('handleLoadingTrigger', value);
    gLoadingShow.value = value;
};

defineExpose({
    handleLoading: handleLoadingTrigger,
});
</script>
<script>
export default {
    name: 'GLoading',
};
</script>
<template>
    <div v-if="gLoadingShow" class="gt-loading-wrapper">
        <div class="gt-loadBox relative">
            <div class="gt-loadAni"></div>
            <div class="gt-loadText"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.gt-loading-wrapper {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    @apply fixed left-0 top-0 z-top-10;
    @apply flex justify-center items-center;
    .gt-loadBox {
        width: 140px;
        height: 140px;
        border-radius: 30px;
        background-color: rgba(74, 213, 169, 0.5);
    }

    .gt-loadAni {
        @apply z-top text-center border-4 border-solid border-transparent border-l-white rounded-full;
        width: 85px;
        height: 85px;
        @apply absolute;
        left: 28px;
        top: 28px;
        animation: loading 1s linear infinite;
    }
    .gt-loadText {
        @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
        font-size: 16px;
    }
}

</style>
