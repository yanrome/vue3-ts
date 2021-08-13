<template>
  <div style="display: flex;">
    <div class="flex left_tree">
      <div v-if="show">
        <access-tree></access-tree>
      </div>
      <!-- <div>
        我是子组件传过来的值：{{selectedKeys}}
      </div> -->
      <div class="right_btn"
           @click='show=!show'>
        <!-- <CaretLeftOutlined v-if='show' />
        <CaretRightOutlined v-else /> -->
      </div>

    </div>
    <div>
      <a-card class="g-search-card mb20">
        <a-form :model="formState"
                :label-col="labelCol"
                :wrapper-col="wrapperCol">
          <div class="flex">
            <a-form-item label="名称"
                         class="w50 mr20">
              <a-input v-model:value="formState.userName" />
            </a-form-item>
            <a-form-item label="手机号码"
                         class="w50">
              <a-input v-model:value="formState.phone" />
            </a-form-item>
          </div>
          <div class="flex">
            <a-form-item label="用户状态"
                         class="w50 mr20">
              <a-select v-model:value="formState.status">
                <a-select-option value="2">所有</a-select-option>
                <a-select-option value="0">非测试</a-select-option>
                <a-select-option value="1">测试</a-select-option>
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
                      style='margin-left: 10px;'
                      @click="reSet">
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <dynamic-table ref="tableRef"
                     :columns="columns"
                     :get-list-func="adminUser"
                     rowKey="id"
                     :pageOption="formState"
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, UnwrapRef, ref, watch } from 'vue'
import { DynamicTable } from '@/components/dynamic-table'
import { adminUser, adminUserAdd } from '@/api/system/user/index'
import AccessTree from './components/access-tree.vue'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'
import { Moment } from 'moment'
import { DatePicker, Tree } from 'ant-design-vue'
import { setupCustomComponents } from '@/plugins'
interface FormState {
  name: string
  region: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  status: string
  userName: string
  phone: string
  starTime: string
  endTime: string
}

interface Param {
  pageNum: number
  pageSize: number
}

export default defineComponent({
  name: 'system-user',
  components: {
    AccessTree,
    DynamicTable,
    [Tree.name]: Tree,
    aRangePicker: DatePicker.RangePicker
  },
  setup() {
    let selectedKeys = reactive({})
    const value = ref<string>()
    const param = ref<Param>({
      pageNum: 1,
      pageSize: 10
    })

    console.log('setupCustomComponents', setupCustomComponents)

    watch(value, () => {
      console.log(value.value)
    })

    const show = ref('false')
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      region: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      status: '2',
      userName: '',
      phone: '',
      starTime: '',
      endTime: ''
    })

    const tableRef = ref<any>(null)

    const state = reactive({
      tableLoading: false,
      rangeTime:ref<Moment[]>([]),
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys
        },
        selectedRowKeys: []
      }
    })
    const visible: any = ref(false)
    //这个是接收子组件传来的方法
    const afterVisibleChange = (val: boolean) => {
      visible.value = val
    }
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
          console.log('添加用户-参数', modelRef)
          modelRef.status = modelRef.status == true ? '1' : '0'
          debugger
          await adminUserAdd(modelRef)
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
    // 搜索后
    const search = () => {
      const mergeParam = { ...formState, ...param.value }
      const res = adminUser(mergeParam)
      console.log('搜索后', res)
      // columns.values = res.data
    }
    // 重置后
    const reSet = () => {
      formState.userName = ''
      formState.status = '2'
      formState.phone = ''
      formState.starTime = ''
      formState.endTime = ''
      state.rangeTime = []
      const res = adminUser(param.value)
      console.log('重置后', res)
      // columns.values = res.data
    }
    return {
      ...toRefs(state),
      columns,
      tableRef,
      adminUser,
      formState,
      addItem,
      value,
      show,
      selectedKeys,
      search,
      visible,
      reSet,
      ChooseTime,
      afterVisibleChange
    }
  }
})
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.left_tree {
  align-items: normal;
  margin-right: 10px;
  background: #fff;
}
.right_btn {
  display: flex;
  align-items: center;
  width: 12px;
  background: #ddd;
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
