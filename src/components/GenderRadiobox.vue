<script setup>
import { ref, watch } from 'vue';
import GRadioboxGroup from './radioboxGroup.vue';
import GRadiobox from './radiobox.vue';

const props = defineProps({
    modelValue: {},
    labelText: {
        type: String,
        default: null,
    },
    labels:{
        type:Array,
        default:['女性','男性']
    },
    values:{
        type:Array,
        default:['F','M']
    }
    
});

const emit = defineEmits(['update:modelValue']);

const valueRef = ref('' + props.modelValue);

watch(()=>valueRef.value,()=>{
    emit('update:modelValue', valueRef.value);
})

</script>

<template>
    <div class="form-item-wrapper">
        <div v-if="labelText" class="label">{{ labelText }}</div>
        <div class="gender-rediobox">
            <g-radiobox-group v-model="valueRef">
                <g-radiobox :value="values[0]" :label="labels[0]" />
                <g-radiobox :value="values[1]" :label="labels[1]" />
            </g-radiobox-group>
        </div>
    </div>
</template>

<style lang="scss">
.form-item-wrapper {
    .gender-rediobox {
        @apply flex justify-between items-center;
        flex-grow: 2;
        gap: 30px;
        .radiobox-group{
            @apply justify-evenly items-center;
            height: 72px;
        }
    }
}
</style>
