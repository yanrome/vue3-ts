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
          <a-select v-model:value="formState.visible">
            <a-select-option value="2">所有</a-select-option>
            <a-select-option value="1">显示</a-select-option>
            <a-select-option value="0">影藏</a-select-option>
          </a-select>
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
                 :pageOption="formState"
                 :get-list-func="adminMenu"
                 :row-selection="rowSelection"
                 rowKey="id"
                 @expand="expand">
    <template v-slot:title>
      <a-button @click="addItem"
                type="primary">
        添加
      </a-button>
      <!-- <a-button @click="isOpen"
                type="primary">
        展开/折叠
      </a-button> -->
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
import { useExpandLoading } from '@/components/dynamic-table/hooks'
import { createVNode } from 'vue'
import AddModal from './add-modal.vue'
import { useCreateModal } from '@/hooks'
import { keyBy } from 'lodash'

interface FormState {
  parentId: string
  menuType: number | string
  menuScene: number | string
  menuName: string
  url: string
  perms: string
  orderNum: number | string,
  isAll:boolean,
  icon: string,
  visible: string
}
interface Param {
  pageNum: number
  pageSize: number
}

export default defineComponent({
  name: 'system-menu',
  components: {
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)
    const itemRefs = ref({})
    const param = ref<Param>({
      pageNum: 1,
      pageSize: 10
    })
    const formState = reactive({
      parentId: '0',
      menuType: '',
      menuScene: '',
      menuName: '',
      url: '',
      perms: '',
      orderNum: '',
      icon: '',
      visible: '2'
    })
    // const state = reactive({
    //   expandedRowKeys: [] as string[],
    //   tableLoading: false,
    //   rowSelection: {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       state.rowSelection.selectedRowKeys = selectedRowKeys
    //     },
    //     selectedRowKeys: []
    //   }
    // })
    // const isDisabled = computed(
    //   () => state.rowSelection.selectedRowKeys.length == 0
    // )
    // 添加菜单
    const addItem = () => {
      useFormModal({
        title: '添加菜单',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          // console.log('添加菜单', modelRef)
          // console.log('添加菜单', formState)
          // console.log('添加菜单', {...formState,...modelRef})
          await adminMenuAdd({...formState,...modelRef})
          tableRef.value.refreshTableData()
        }
      })
    }
    // 全部展开与折叠
    const isOpen = () => {
      console.log('2312全部展开与折叠')
    }
    // 点击展开图标
    const expand = async (expanded, record) => {
      const expandItemEl = itemRefs.value[record.id]
      // 点击展开图标loading
      const result = await useExpandLoading({
        expanded,
        record,
        expandItemEl,
        asyncFunc: getSystemDictDataByType,
        params: { id: record.id, limit: 100 }
      })
      if (result?.data) {
        record.children = result.data
      }
    }
    // 重置后
    const reSet = () => {
      formState.menuName = ''
      formState.visible = '2'
    }

    return {
      columns,
      tableRef,
      adminMenu,
      addItem,
      formState,
      adminMenuRemove,
      reSet,
      isOpen,
      expand
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

