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
        <a-button type="primary"
                  style="margin-left: 10px;"
                  @click="reSet">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <dynamic-table ref="tableRef"
                 :columns="columns(getDictFn())"
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
import { getDict } from '@/hooks/dict-list'
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
  orderNum: number | string
  isAll: boolean
  icon: string
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
      visible: '2',
      isAll: false
    })

    const state = reactive({})

    // 添加菜单
    const addItem = () => {
      useFormModal({
        title: '添加菜单',
        formSchema: getFormSchema(),
        handleOk: async (modelRef, state) => {
          delete modelRef.id
          await adminMenuAdd({ ...formState, ...modelRef })
          tableRef.value.refreshTableData()
        }
      })
    }
    // 全部展开与折叠
    const isOpen = () => {
      formState.isAll = !formState.isAll
      console.log('2312全部展开与折叠', formState.isAll)
      tableRef.value.refreshTableData()
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

    // 字典查询
    const getDictFn = async () => {
      let sysMenuType = await getDict('sys_menu_type', '', false)
      let sysMenuScene = await getDict('sys_menu_scene', '', false)
      let sysShowHide = await getDict('sys_show_hide', '', false)
      return {
        sysMenuType: sysMenuType,
        sysMenuScene: sysMenuScene,
        sysShowHide: sysShowHide
      }
    }

    return {
      columns,
      tableRef,
      adminMenu,
      formState,
      // 方法
      addItem,
      adminMenuRemove,
      reSet,
      isOpen,
      expand,
      getDictFn
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

