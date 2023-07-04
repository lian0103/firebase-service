<script setup>
const props = defineProps({
    handleCallBack: {},
});
</script>

<template>
    <div class="go-back" @click="handleCallBack"><i class="fas fa-chevron-left"></i> 返回</div>
</template>

<style lang="scss">
.go-back {
    @apply text-gray0 cursor-pointer;
    padding-left: 10px;
    font-size: 32px;
    svg {
        margin-right: 20px;
    }
}
</style>
