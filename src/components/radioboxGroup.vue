<script>
import { h, ref, computed, watch, toRef } from 'vue';

export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        const currentRadio = ref(props.modelValue || '');
        const handleValChange = (newCurrent) => {
            currentRadio.value = newCurrent;
            emit('update:modelValue', newCurrent);
        };

        const genNodeTree = (item) => {
            return item.type.name === 'Radiobox' || item.type.name === 'MemberRadioboxItem'
                ? {
                      ...item,
                      props: {
                          ...item.props,
                          currentRadio: computed(() => currentRadio.value),
                          handleValChange
                      },
                  }
                : {
                      ...item,
                      currentRadio: computed(() => currentRadio.value),
                      handleValChange,
                      children: Array.isArray(item.children)
                          ? item.children.map((cItem) => genNodeTree(cItem))
                          : item.children,
                  };
        };

        const validChilds = slots.default() ? slots.default().map((item) => genNodeTree(item)) : [];

        // console.log('validChilds', validChilds);
        return () => h('div', { class: 'radiobox-group' }, validChilds);
    },
};
</script>

<style lang="scss">
.radiobox-group {
    width: 100%;
    @apply flex;
    .radiobox-group-item {
        flex-grow: 2;
    }
}
</style>
