<template>
  <a-select v-model:value="modelValue"
            v-bind="formItem.props"
            v-on="formItem.eventObject">
    <template v-for="option in formItem.options"
              :key="option.value">
      <Option :value="option.value">
        {{ option.label }}
      </Option>
    </template>
  </a-select>
</template>
<script lang="ts">
import { defineComponent, PropType, computed ,watch} from 'vue'
import { Select } from 'ant-design-vue'
import { FormItem } from '@/types/schema'
import {buttonList} from "@/views/auth/business/order/utils/btn-type";
export default defineComponent({
  name: 'SchemaFormSelect',
  components: {
    [Select.name]: Select,
    [Select.Option.name]: Select.Option
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
    // console.log('props-value', props.formItem)
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
