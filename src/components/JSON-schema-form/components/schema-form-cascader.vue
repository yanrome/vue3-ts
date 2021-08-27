<template>
  <a-cascader :options="options"
              v-model:value="value">
    <!-- <template v-for="option in formItem.options"
              :key="option.value">
      <Option :value="option.value">
        {{ option.label }}
      </Option>
    </template> -->
  </a-cascader>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Cascader } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
export default defineComponent({
  name: 'schema-form-cascader',
  components: {
    [Cascader.name]: Cascader
    // [Cascader.Option.name]: Cascader.Option
  },
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  emits: ['update:value'],
  setup(props, { attrs, emit }) {
    console.log('props-value', props)
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