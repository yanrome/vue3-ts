<template>
  <a-card class="g-search-card mb20">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <div class="flex">
        <a-form-item label="菜单名称"
                     class="w50">
          <a-input v-model:value="formState.menuName" />
        </a-form-item>
        <a-form-item label="菜单状态"
                     class="w50 mr20">
          <a-select v-model:value="formState.visible"
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
                 :pageOption="pageOption"
                 :get-list-func="adminMenu"
                 :rowKey="rowKey">
    <template v-slot:title>
      <a-button v-permission="{ action: undefined, effect: 'disabled' }"
                @click="addItem"
                type="primary">
        添加
      </a-button>
      <a-button @click="isOpen"
                type="primary">
        展开/折叠
      </a-button>
    </template>
  </dynamic-table>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  UnwrapRef,
  ref
} from 'vue'
import {
  adminMenu,
  adminMenuAdd,
  adminMenuRemove
} from '@/api/system/menu/index'
import { DynamicTable } from '@/components/dynamic-table'
import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'
import { getSystemDictDataByType } from '@/api/system/user/index'
import AddModal from './add-modal.vue'
import { useCreateModal } from '@/hooks'
import { keyBy } from 'lodash'

interface FormState {
  name: string
  region: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

export default defineComponent({
  name: 'system-menu',
  components: {
    DynamicTable
  },
  created(){
    
  },
  setup() {
    console.log('jiehifiwhoh', columns)
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

    // 添加菜单
    const addItem = () => {
      useFormModal({
        title: '添加菜单',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          await adminMenuAdd(modelRef)
          tableRef.value.refreshTableData()
        }
      })
    }
    const isDisabled = computed(
      () => state.rowSelection.selectedRowKeys.length == 0
    )
    // const aaa = () => {
    //   const abc = getSystemDictDataByType({ dictType: 'sys_menu_type' })
    //   console.log('abc', abc)
    // }

    return {
      ...toRefs(state),
      columns,
      // aaa,
      tableRef,
      adminMenu,
      isDisabled,
      addItem,
      formState,
      adminMenuRemove
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

