<template>
  <a-card class="g-search-card mb20">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <div class="flex">
        <a-form-item label="角色名称"
                     class="w50">
          <a-input v-model:value="formState.roleName" />
        </a-form-item>
        <a-form-item label="角色状态"
                     class="w50 mr20">
          <a-select v-model:value="formState.status">
            <a-select-option value="">所有</a-select-option>
            <a-select-option value="1">在线</a-select-option>
            <a-select-option value="0">离线</a-select-option>
          </a-select>
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
  <dynamic-table ref="tableRef"
                 :columns="columns"
                 :get-list-func="getAdminRole"
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
import { adminRoleRemove, getAdminRole, adminRoleAdd } from '@/api/system/role'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { Moment } from 'moment'
import { DatePicker } from 'ant-design-vue'
import { getFormSchema } from './form-schema'

interface FormState {
  roleName: string
  status: string
  starTime: string
  endTime: string
}

interface Param {
  pageNum: number
  pageSize: number
}

export default defineComponent({
  name: 'system-role',
  components: {
    DynamicTable,
    aRangePicker: DatePicker.RangePicker
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      roleName: '',
      status: '',
      starTime: '',
      endTime: ''
    })

    const param = ref<Param>({
      pageNum: 1,
      pageSize: 10
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
    const deleteItems = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await adminRoleRemove(state.rowSelection.selectedRowKeys.toString())
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }
    // 添加角色
    const addItem = () => {
      console.log('添加用户modelRef-1')
      useFormModal({
        title: '添加用户',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          console.log('添加用户-参数', modelRef)
          modelRef.status = modelRef.status == true ? '1' : '0'
          await adminRoleAdd(modelRef)
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(
      () => state.rowSelection.selectedRowKeys.length == 0
    )
    // 选择时间-处理
    const ChooseTime = (time) => {
      formState.starTime = time[0]
      formState.endTime = time[1]
    }
    // // 搜索后
    // const search = () => {
    //   const mergeParam = { ...formState, ...param.value }
    //   const res = getAdminRole(mergeParam)
    //   console.log('搜索后', res)
    //   // columns.values = res.data
    // }
    // 重置后
    const reSet = () => {
      formState.roleName = ''
      formState.status = ''
      formState.starTime = ''
      formState.endTime = ''
      state.rangeTime = []
      // const res = getAdminRole(param.value)
      // console.log('重置后', res)
    }

    return {
      ...toRefs(state),
      columns,
      tableRef,
      getAdminRole,
      isDisabled,
      // 方法
      addItem,
      formState,
      deleteItems,
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