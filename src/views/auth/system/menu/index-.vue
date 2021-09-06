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
  <a-table :columns="columns"
           :data-source="formState">
    <template #operation="{ record }">
      <a-button @click="edit(record.key)">新增</a-button>
      <a-button @click="edit(record.key)">编辑</a-button>
      <a-button @click="edit(record.key)">删除</a-button>
    </template>
  </a-table>
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
// import { DynamicTable } from '@/components/dynamic-table'
// import { columns } from './columns'
import { useFormModal } from '@/hooks/useFormModal'
import { getFormSchema } from './form-schema'
import { getSystemDictDataByType } from '@/api/system/user/index'
import { useExpandLoading } from '@/components/dynamic-table/hooks'
import { getDict } from '@/hooks/dict-list'
import { generateTree } from '../../../../utils/common'
import { createVNode } from 'vue'
import AddModal from './add-modal.vue'
import { useCreateModal } from '@/hooks'
import { keyBy } from 'lodash'

const columns = [
  { title: '菜单名称', dataIndex: 'menuName', key: 'menuName' },
  { title: '场景', dataIndex: 'menuScene', key: 'menuScene' },
  { title: '请求地址', dataIndex: 'url', key: 'url' },
  { title: '类型', dataIndex: 'menuType', key: 'menuType' },
  { title: '可见', dataIndex: 'visible', key: 'visible' },
  { title: '权限标识', dataIndex: 'perms', key: 'perms' },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

interface Param {
  pageNum: number
  pageSize: number
}

export default defineComponent({
  name: 'system-menu',
  setup() {
    const tableRef = ref<any>(null)
    const itemRefs = ref({})
    const param = ref<Param>({
      pageNum: 1,
      pageSize: 10
    })

    const state = reactive({
      formState: [] as any
    })

    const getCurrent = async () => {
      let res = await adminMenu(param)
      // generateTree(res.data)
      console.log('菜单列表', res)
      state.formState = generateTree(res.data)
      console.log('菜单列表==========', generateTree(res.data))
    }
    getCurrent()

    // 添加菜单
    // const addItem = () => {
    //   useFormModal({
    //     title: '添加菜单',
    //     formSchema: getFormSchema(),
    //     handleOk: async (modelRef, state) => {
    //       // console.log('添加菜单', modelRef)
    //       // console.log('添加菜单', formState)
    //       // console.log('添加菜单', {...formState,...modelRef})
    //       // await adminMenuAdd({ ...formState, ...modelRef })
    //       // tableRef.value.refreshTableData()
    //     }
    //   })
    // }
    // 全部展开与折叠
    // const isOpen = () => {
    //   console.log('全部展开与折叠ing')
    // }
    // // 点击展开图标
    // const expand = async (expanded, record) => {
    //   const expandItemEl = itemRefs.value[record.id]
    //   // 点击展开图标loading
    //   const result = await useExpandLoading({
    //     expanded,
    //     record,
    //     expandItemEl,
    //     asyncFunc: getSystemDictDataByType,
    //     params: { id: record.id, limit: 100 }
    //   })
    //   if (result?.data) {
    //     record.children = result.data
    //   }
    // }
    // 重置后
    // const reSet = () => {
    //   // formState.menuName = ''
    //   // formState.visible = '2'
    // }

    // 字典查询
    // const getHotelMsg = async () => {
    //   const [sysMenuType] = [await getDict('sys_menu_type')]
    //   // state.aaaaaaaaaaa = sysMenuType
    // }
    // getHotelMsg()

    return {
      ...toRefs(state),
      columns,
      // data,
      tableRef,
      adminMenu,
      // addItem,
      // formState,
      adminMenuRemove
      // reSet,
      // isOpen,
      // expand
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

