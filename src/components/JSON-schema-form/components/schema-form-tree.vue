<template>
  <!-- <a-select v-model:value="modelValue"
            v-on="formItem.eventObject"
            v-bind="formItem.props">
    <template v-for="option in formItem.options"
              :key="option.dictValue">
      <Option :value="option.dictValue">
        {{ option.dictLabel }}
      </Option>
    </template>
  </a-select> -->
  <a-tree
    :tree-data="formItem.treeOptions"
  >
    <template #title0010>ss</template>
  </a-tree>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Tree } from 'ant-design-vue'
import { FormItem } from '@/types/schema'

export default defineComponent({
  name: 'schema-form-tree',
  emits: ['update:value'],
  components: {
    [Tree.name]: Tree,
  },
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  setup(props, { attrs, emit }) {
    console.log('props', props.formItem.options)
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    return {
      modelValue
    }
  }
})
</script>
