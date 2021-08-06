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
          <a-select v-model:value="formState.status"
                    placeholder="please select your zone">
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">
            <template v-slot:title>
              <SearchOutlined />
            </template>
            搜索
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">
            <template v-slot:title>
              <RetweetOutlined />
            </template>
            重置
          </a-button>
        </a-form-item>
        <!-- <a-form-item label="创建时间">
          <a-range-picker v-model:value="formState.date1"
                          show-time
                          type="date"
                          placeholder="Pick a date"
                          style="width: 100%;" />
        </a-form-item> -->
      </div>
    </a-form>
  </a-card>
  <dynamic-table ref="tableRef"
                 :columns="columns"
                 :get-list-func="getAdminRole"
                 rowKey="id"
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
import { hasPermission } from '@/utils/permission/hasPermission'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'

interface FormState {
  name: string
  region: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

export default defineComponent({
  name: 'system-role',
  components: {
    DynamicTable
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      region: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const tableRef = ref<any>(null)

    const state = reactive({
      tableLoading: false,
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
          console.log('添加用户modelRef', modelRef)
          const { description, title, accessIdsList } = modelRef

          const params = {
            description,
            title,
            accessIdsList: accessIdsList.toString()
          }
          console.log('添加用户', params)
          await adminRoleAdd(params)
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(
      () => state.rowSelection.selectedRowKeys.length == 0
    )

    return {
      ...toRefs(state),
      columns,
      tableRef,
      getAdminRole,
      isDisabled,
      addItem,
      formState,
      deleteItems
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