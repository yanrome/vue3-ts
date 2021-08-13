<template>
  <a-card class="g-search-card mb20">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <div class="flex">
        <a-form-item label="部门名称"
                     class="w50 mr20">
          <a-input v-model:value="formState.deptName" />
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
        <a-button type="primary"
                  style="margin-left: 10px;"
                  @click="reSet">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <!-- <a-table :columns="columns"
           :data-source="dataList"
           :row-selection="rowSelection" /> -->
  <!-- <access-tree></access-tree> -->

  <dynamic-table ref="tableRef"
                 :columns="columns"
                 :pageOption="formState"
                 :get-list-func="adminDept"
                 rowKey="id"
                 :row-selection="rowSelection">
    <template v-slot:title>
      <a-button @click="addItem"
                type="primary">
        添加
      </a-button>
      <a-button @click="deleteItems"
                v-permission="{ action: 'delete' }"
                :disabled="isDisabled"
                type="primary">
        删除
      </a-button>
    </template>
  </dynamic-table>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  UnwrapRef,
  ref
} from 'vue'
import { DynamicTable } from '@/components/dynamic-table'
import { adminDept, adminDeptAdd } from '@/api/system/dept/index'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'
import { Moment } from 'moment'
import { DatePicker } from 'ant-design-vue'
import AccessTree from './components/access-tree.vue'

interface FormState {
  name: string
  region: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  deptName: string
  starTime: string
  endTime: string
}

interface Param {
  pageNum: number
  pageSize: number
}

export default defineComponent({
  name: 'system-dept',
  components: {
    DynamicTable,
    aRangePicker: DatePicker.RangePicker,
    AccessTree
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      deptName: '',
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

    // 删除多项
    // const deleteItems = () => {
    //   Modal.confirm({
    //     title: '提示',
    //     icon: createVNode(QuestionCircleOutlined),
    //     content: '您确定要删除所有选中吗？',
    //     onOk: async () => {
    //       await delAdminRole(state.rowSelection.selectedRowKeys.toString())
    //       tableRef.value.refreshTableData()
    //       state.rowSelection.selectedRowKeys = []
    //     }
    //   })
    // }
    // 添加用户
    const addItem = () => {
      useFormModal({
        title: '添加用户',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          const { description, title, accessIdsList } = modelRef

          const params = {
            description,
            title,
            accessIdsList: accessIdsList.toString()
          }
          console.log('添加用户-params', params)
          await adminDeptAdd(params)
          tableRef.value.refreshTableData()
        }
      })
      // useCreateModal(OperateModal, {
      //   callback: () => tableRef.value.refreshTableData()
      // })
    }
    // const isDisabled = computed(
    //   () => state.rowSelection.selectedRowKeys.length == 0
    // )
    // 选择时间-处理
    const ChooseTime = (time) => {
      formState.starTime = time[0]
      formState.endTime = time[1]
    }
    // 重置后
    const reSet = () => {
      formState.deptName = ''
      formState.starTime = ''
      formState.endTime = ''
      state.rangeTime = []
    }

    return {
      ...toRefs(state),
      columns,
      tableRef,
      adminDept,
      formState,
      addItem,
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
