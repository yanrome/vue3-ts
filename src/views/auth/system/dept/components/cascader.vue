<template>
  <a-spin :spinning="spinning">
    <a-cascader v-model:value="chooseValue"
                :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
                placeholder="请选择省市区"
                @change='onChange'
                :options="options" />
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { Cascader, Spin } from 'ant-design-vue'
import options from 'china-division/dist/pca-code.json'
import { getAdminRoleAccess } from '@/api/system/role'
import { join } from 'lodash'

export default defineComponent({
  name: 'Cascader',
  components: {
    [Cascader.name]: Cascader,
    [Spin.name]: Spin
  },
  emits: ['update:value'], // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      Option: [] as any,
      spinning: false,
      chooseValue: '',
      label: '',
      arr: [] as any
    })

    const z_modelRef: string | null = window.localStorage.getItem('z_modelRef')
    if (z_modelRef) {
      JSON.parse(z_modelRef)
      state.arr?.push(
        JSON.parse(z_modelRef).province,
        JSON.parse(z_modelRef).city,
        JSON.parse(z_modelRef).county
      )
      state.chooseValue = state.arr
    }

    const onChange = (value, selectedOptions) => {
      emit('update:value', {
        province: value[0],
        city: value[1],
        county: value[2]
      })
    }

    return {
      ...toRefs(state),
      options,
      // 方法
      onChange
    }
  }
})
</script>

<style scoped>
</style>
