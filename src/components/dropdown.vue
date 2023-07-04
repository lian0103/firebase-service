<script>
import { h, ref, computed, watch, shallowRef } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import GDropdownItem from './dropdownitem.vue';
import { appInfo } from '../stores';

export default {
    name: 'GDropdown',
    props: {
        name: { default: null },
        modelValue: {},
        formParentValue: { default: null },
        options: { type: Array },
        clicked: { type: Boolean, default: true },
        hover: { type: Boolean, default: false },
        icon: { type: Boolean, default: false },
        validResult: {
            default: {},
        },
        handleValChange: {
            type: Function,
        },
        handleRulesValid: {
            type: Function,
        },
        isDistrict: {
            type: Boolean,
            default: false,
        },
        itemsHeight:{
            type: String,
            default:'240px'
        }
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        // console.log(props);
        // console.log(slots.valueOf())
        const id = uuidv4();
        const rootObj = {
            [id]: shallowRef(),
        };
        const isShow = ref(false);
        const isHover = ref(false);
        const hasSelect = ref(false);
        const valRef = props.formParentValue ? ref(props.formParentValue) : ref(props.modelValue);
        const errorMsg = computed(() => {
            return props.validResult[props.name]?.message;
        });
        const slotOption = ref([]);

        const handleIsShow = () => {
            if (props.clicked) {
                let show = !isShow.value;
                isShow.value = show;
                isHover.value = false;
            }
        };

        const handleMouseenter = () => {
            if (props.hover) {
                isHover.value = true;
                isShow.value = true;
            }
        };

        const handleLeave = () => {
            if (props.hover) {
                isHover.value = false;
                isShow.value = false;
            }
        };

        const classHoverComputed = computed(() => {
            return props.hover && isHover.value ? 'gt-dropdown gt-dropdown-hover' : 'gt-dropdown';
        });

        const classShowComputed = computed(() => {
            // console.log('classShowComputed', classShowComputed.value);
            let hadOpend = classShowComputed.value && classShowComputed.value.includes('tp-aniIn');
            return props.clicked && isShow.value
                ? 'gt-dropdown-items tp-aniIn'
                : hadOpend
                ? 'gt-dropdown-items tp-aniOut'
                : 'gt-dropdown-items';
        });

        const labelComputed = computed(() => {
            // console.log(props.options, valRef.value);
            return props.options && props.options.findIndex((item) => item.value === valRef.value) != -1
                ? props.options.filter((item) => item.value === valRef.value)[0].label
                : slotOption.value.findIndex((item) => item.value === valRef.value) != -1
                ? slotOption.value.filter((item) => item.value === valRef.value)[0].label
                : props.isDistrict && props.options
                ? props.options[0]?.label
                : valRef.value;
        });

        const genNodeTree = (item) => {
            if (item.type.name === 'GDropdownItem') {
                slotOption.value.push({
                    label: item.props.label,
                    value: item.props.value,
                });
            }

            return item.type.name === 'GDropdownItem'
                ? {
                      ...item,
                      props: {
                          ...item.props,
                          icon: props.icon,
                          parentValue: computed(() => valRef.value),
                          handleChildClick: (val) => {
                              hasSelect.value = true;
                              emit('update:modelValue', val);
                              if (props.handleValChange) {
                                  props.handleValChange(val, props.name);
                              }
                              valRef.value = val;
                          },
                      },
                  }
                : {
                      ...item,
                      children: Array.isArray(item.children)
                          ? item.children.map((cItem) => genNodeTree(cItem))
                          : item.children,
                  };
        };

        const childs = computed(() => {
            let childArr = props.options
                ? props.options?.map((item) => {
                      return h(GDropdownItem, {
                          option: item,
                          label: item.label,
                          value: item.value,
                          icon: props.icon,
                          parentValue: computed(() => valRef.value),
                          handleChildClick: (val) => {
                              hasSelect.value = true;
                              emit('update:modelValue', val);
                              if (props.handleValChange) {
                                  props.handleValChange(val, props.name);
                              }
                              valRef.value = val;
                          },
                      });
                  })
                : slots?.default()?.map((item) => genNodeTree(item)) || [];
            return childArr;
        });
        // console.log('childs',childs)

        const textClassComputed = computed(() => {
            let arr = [];
            if (props.icon) arr.push('span-text');
            if (hasSelect.value) arr.push('text-black0');
            return arr;
        });

        const forceClose = () => {
            isShow.value = false;
        };

        const popupStyle = ref({});

        appInfo.value.dropdowns[id] = forceClose;

        watch(
            () => isShow.value,
            (val, oldVal) => {
                if(val){
                    Object.keys(appInfo.value.dropdowns).forEach(keyID=>{
                        if(keyID !== id){
                            appInfo.value.dropdowns[keyID]();
                        }
                    })
                }

                if (val && document.getElementsByTagName('html')[0]) {
                    document.getElementsByTagName('html')[0].addEventListener('click', forceClose, false);

                    if (rootObj[id]) {
                        popupStyle.value = {
                            'max-height':props.itemsHeight,
                            position: 'absolute',
                            top: '76px',
                            left: '0px',
                        };
                    }
                } else {
                    document.getElementsByTagName('html')[0]?.removeEventListener('click', forceClose);
                }
            }
        );

        return () =>
            h(
                'div',
                {
                    ref: rootObj[id],
                    class: classHoverComputed.value,
                    onMouseenter: handleMouseenter,
                    onMouseleave: handleLeave,
                    onClick: (e) => {
                        e.stopPropagation();
                        handleIsShow();
                    },
                },
                [
                    h(
                        'span',
                        {
                            class: 'gt-dropdown-span',
                        },
                        [h('span', { class: textClassComputed.value }, [labelComputed.value])]
                    ),
                    h(
                        'span',
                        {
                            class: 'gt-dropdown-icon',
                        },
                        [h('i', { class: 'fas fa-sort-down' })]
                    ),
                    h(
                        'div',
                        {
                            class: classShowComputed.value,
                            onMouseleave: handleLeave,
                            style: popupStyle.value,
                        },
                        childs.value
                    ),
                    errorMsg.value
                        ? h('span', {
                              class: 'dropdown-error-msg',

                              innerHTML: errorMsg.value,
                          })
                        : [],
                ]
            );
    },
};
</script>

<style lang="scss">
.gt-dropdown {
    @apply flex justify-start items-center relative cursor-pointer text-center text-black0 font-medium;
    width: 100%;
    font-size: 24px;
    line-height: 20px;

    letter-spacing: 0.7px;
    .gt-dropdown-span {
        min-width: 92px;
        height: 72px;
        padding: 20px 50px 20px 10px;

        @apply bg-white rounded-md select-none;
        @apply w-full leading-9 overflow-hidden;
        @apply flex justify-start items-center;

        border: 2px solid rgba(153, 153, 153, 0.5);
        border-radius: 10px;
        letter-spacing: 2px;
        flex-grow: 2;

        .pre-icon {
            margin-left: 5px;
        }
        svg {
            font-size: 28px;
        }
        .span-text {
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
        }
        span {
            @apply text-center w-full;
        }
    }

    .gt-dropdown-icon {
        @apply absolute;
        top: 13px;
        right: 12px;
        height: 36px;
        line-height: 36px;
        svg {
            font-size: 32px;
            @apply text-color3;
        }
    }

    .gt-dropdown-items {
        @apply hidden w-full -z-10 opacity-0;
        @apply py-1 px-0 bg-white rounded-10;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
        max-height: 300px;
        overflow-y: scroll;

        &.tp-aniIn,
        &.tp-aniOut {
            @apply block z-top opacity-100;
            @apply absolute;
        }
    }
}
.gt-dropdown-hover {
    .gt-dropdown-items {
        @apply z-100 opacity-100;
        @apply flex flex-col;
        @apply absolute;
        &::before {
            content: '';
            height: 50px;
            @apply w-full block bg-transparent absolute left-0 -top-10 z-10;
        }
        animation: tpFadeIn 0.5s forwards;
    }
}

.gt-dropdown-item {
    @apply select-none text-gray0;
    @apply flex justify-start items-center cursor-pointer mx-auto;
    width: calc(100% - 14px);
    white-space: nowrap;
    border-radius: 5px;
    letter-spacing: 0.7px;
    padding: 15px 0;
    &:hover {
        @apply bg-gray1 text-black0;
    }
    svg {
        width: 22px;
    }
    > span {
        overflow: hidden;
        padding: 5px 0px 5px 0px;
        .txt {
            // @apply overflow-hidden;
            text-overflow: ellipsis;
        }
    }
    &.current {
        @apply text-black0;
    }

    &.curClicked {
        @apply bg-gray1 text-black0;
    }

    .icon {
        margin-left: 3px;
    }
}

.dropdown-error-msg {
    @apply absolute left-0.5 -bottom-5 text-danger;
    letter-spacing: 0.6px;
    white-space: nowrap;
}
</style>
