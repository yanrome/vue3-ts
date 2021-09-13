<template>
  <a-card class="g-search-card mb20">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <div class="flex">
        <a-form-item label="字典名称"
                     class="w50 mr20">
          <a-input v-model:value="formState.dictName" />
        </a-form-item>
        <a-form-item label="字典类型"
                     class="w50">
          <a-input v-model:value="formState.dictType" />
        </a-form-item>
      </div>
      <div class="flex">
        <a-form-item label="创建时间">
          <a-range-picker v-model:value="rangeTime"
                          @change="ChooseTime"
                          :valueFormat="'YYYY-MM-DD'" />
        </a-form-item>
      </div>
      <a-form-item>
        <!-- <a-button type="primary"
                  @click="search">
          搜索
        </a-button> -->
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
                 :get-list-func="adminDict"
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
import {
  defineComponent,
  reactive,
  toRefs,
  createVNode,
  computed,
  UnwrapRef,
  ref
} from 'vue'
import { Modal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { DynamicTable } from '@/components/dynamic-table'
import { adminDictRemove, adminDict, adminDictAdd } from '@/api/system/dict'
import { getFormSchema } from './form-schema'
import { columns } from './columns'
import { hasPermission } from '@/utils/permission/hasPermission'
import { useFormModal } from '@/hooks/useFormModal/'
import { Moment } from 'moment'
import { DatePicker } from 'ant-design-vue'
import router from '@/router'

export default defineComponent({
  name: 'system-dict',
  components: {
    DynamicTable,
    aRangePicker: DatePicker.RangePicker
  },
  setup() {
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      dictName: '',
      dictType: '',
      starTime: '',
      endTime: ''
    })

    const tableRef = ref<any>(null)

    const state = reactive({
      tableLoading: false,
      rangeTime: ref<Moment[]>([]),
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys
        },
        selectedRowKeys: []
      }
    })

    // 添加字典
    const addItem = () => {
      useFormModal({
        title: '添加字典',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          await adminDictAdd(modelRef)
          tableRef.value.refreshTableData()
        }
      })
    }
    
    // 选择时间-处理
    const ChooseTime = (time) => {
      formState.starTime = time[0]
      formState.endTime = time[1]
    }

    // 重置后
    const reSet = () => {
      formState.dictName = ''
      formState.dictType = ''
      formState.starTime = ''
      formState.endTime = ''
      state.rangeTime = []
    }

    return {
      ...toRefs(state),
      columns,
      tableRef,
      adminDict,
      addItem,
      formState,
      reSet,
      ChooseTime
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
