<template>
  <a-checkbox-group v-model:value="modelValue"
                    v-on="formItem.eventObject"
                    style="width: 100%;">
    <a-row>
      <template v-for="option in formItem.options"
                :key="option.value">
        <a-col :span="8">
          <a-checkbox :value="option.value"
                      @change="isFlag(option)">
            {{ option.label }}
          </a-checkbox>
        </a-col>
      </template>
    </a-row>
  </a-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, watch } from 'vue'
import { Checkbox, Row, Col } from 'ant-design-vue'
import { FormItem } from '@/types/schema'

export default defineComponent({
  name: 'schema-form-checkbox',
  emits: ['update:value'],
  components: {
    [Checkbox.name]: Checkbox,
    [Row.name]: Row,
    [Col.name]: Col,
    [Checkbox.Group.name]: Checkbox.Group
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
    const modelValue = computed({
      get: () =>
        props.formItem.options
          ?.map((item) => {
            if (item.flag == true) {
              return item.value
            }
          })
          .filter(Boolean),
      set: (val) => emit('update:value', val)
    })
    const isFlag = (e) => {
      e.flag = !e.flag
    }
    return {
      modelValue,
      isFlag
    }
  }
})
</script>
