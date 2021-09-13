<template>
  <a-card class="g-search-card mb20">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <div class="flex">
        <a-form-item label="字典名称"
                     class="w50 mr20">
          <a-select @change="changeDictType"
                    v-model:value="formState.dictType">
            <a-select-option v-for="(item,i) in dictTypaAll"
                             :value='item.dictType'
                             :label='item.dictName'
                             :key="i">{{ item.dictName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="字典标签"
                     class="w50">
          <a-input v-model:value="formState.dictLabel" />
        </a-form-item>
      </div>
      <a-form-item>
        <a-button @click="reSet"
                  style="margin-left: 10px;"
                  type="primary">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <dynamic-table ref="tableRef"
                 :columns="columns"
                 :get-list-func="adminDataDict"
                 rowKey="id"
                 :pageOption="formState"
                 :row-selection="rowSelection">
    <template v-slot:title>
      <a-button @click="addItem"
                type="primary">
        新增
      </a-button>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { DynamicTable } from '@/components/dynamic-table'
import {
  adminDataDictRemove,
  adminDataDict,
  adminDataDictAdd
} from '@/api/system/dict'
import { getFormSchema } from './form-schema'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal/'
import { adminDict } from '@/api/system/dict'

export default defineComponent({
  name: 'system-dict-data',
  components: {
    DynamicTable
  },
  setup() {
    const state = reactive({
      tableLoading: false,
      dataSource: [],
      dictTypaAll: [],
      dictType: null,
      z_dict: {
        dictName: '',
        dictType: ''
      }
    })

    const tableRef = ref<any>(null)

    const formState = reactive({
      dictLabel: '',
      dictType: '',
      pageSize: '10',
      pageNum: '1',
      orderByColumn: 'createTime',
      isAsc: 'desc'
    })

    const z_dict: string | null = window.localStorage.getItem('z_dict')
    if (z_dict) {
      state.z_dict = JSON.parse(z_dict)
      state.dictType = JSON.parse(z_dict).dictName
      formState.dictType = JSON.parse(z_dict).dictType
    }

    // 添加字典
    const addItem = () => {
      useFormModal({
        title: '添加字典',
        formSchema: getFormSchema(),
        fields: { dictType: state.z_dict.dictType },
        handleOk: async (modelRef, state) => {
          await adminDataDictAdd(modelRef)
          tableRef.value.refreshTableData()
        }
      })
    }

    // 字典名称
    const changeDictType = (value, e) => {
      state.z_dict.dictName = e.label
      state.z_dict.dictType = value
      localStorage.setItem('z_dict', JSON.stringify(state.z_dict))
    }

    // 重置
    const reSet = () => {
      formState.dictLabel = ''
      formState.dictType = state.z_dict.dictType
    }

    const getDictInfo = async () => {
      let res_dict = await adminDict('')
      state.dictTypaAll = res_dict.data
    }
    getDictInfo()

    return {
      ...toRefs(state),
      formState,
      columns,
      // 方法
      changeDictType,
      tableRef,
      adminDataDict,
      addItem,
      confirm,
      reSet
    }
  }
})
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.w50 {
  width: 50%;
}
.mr20 {
  margin-right: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
