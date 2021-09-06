<template>
  <a-spin :spinning="spinning">
    <a-tree-select v-model:value="label"
                   style="width: 100%;"
                   :treeDataSimpleMode="true"
                   :treeDefaultExpandAll="true"
                   :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                   :tree-data="treeData"
                   @select='onSelect'>

    </a-tree-select>
  </a-spin>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  ref
} from 'vue'
import { Tree, Spin, TreeSelect } from 'ant-design-vue'
import { adminDeptTreeData } from '@/api/system/dept/index'

export default defineComponent({
  name: 'AccessTree',
  components: {
    [Tree.name]: Tree,
    [TreeSelect.name]: TreeSelect,
    [Spin.name]: Spin
  }, // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const state = reactive({
      treeData: [] as any,
      spinning: false,
      parentId: null,
      label: ''
    })

    const z_modelRef: string | null = window.localStorage.getItem('z_modelRef')
    if (z_modelRef) {
      JSON.parse(z_modelRef)
      if (JSON.parse(z_modelRef).parentId) {
        // 编辑
        state.parentId = JSON.parse(z_modelRef).parentId
      } else {
        // 新增
        state.parentId = JSON.parse(z_modelRef).id
      }
    }

    onMounted(async () => {
      // 查询所有菜单列表树
      state.spinning = true
      const res = await adminDeptTreeData().finally(
        () => (state.spinning = false)
      )
      res.data = res.data.map((item) => {
        item.key = item.id
        item.value = item.name
        return item
      })
      // let pId = props.value
      //   ? res.data?.find((item) => item.id == props.value).pId
      //   : '未选择'
      state.label = res.data?.find((item) => item.id == state.parentId).name || '未选择'
      state.treeData = list2tree(res.data)
    })

    // 列表转树
    const list2tree = (arr) => {
      let temp = {}
      let tree = {}
      // 数组转 键值对
      arr.forEach((item) => {
        // item.value = item.name
        temp[item.id] = item
        // temp[item.value] = item.value
      })
      let tempKeys = Object.keys(temp)
      tempKeys.forEach((key) => {
        // 获取当前项
        let item = temp[key]
        // 当前项 pId
        let _itemPId = item.pId
        // 获取父级项
        let parentItemByPid = temp[_itemPId]
        if (parentItemByPid) {
          if (!parentItemByPid.children) {
            parentItemByPid.children = []
          }
          parentItemByPid.children.push(item)
        } else {
          tree[item.id] = item
        }
      })
      // 对象转数组并返回
      return Object.keys(tree).map((key) => tree[key])
    }
    const onSelect = (value, label, extra) => {
      // console.log('1111111111111111',value)
      // console.log('1111111111111111',label)
      // console.log('1111111111111111',extra)
      // state.label = extra.selectedNodes[0].props.name
      emit('update:value', {
        deptId: extra.selectedNodes[0].props.pId,
        id: extra.selectedNodes[0].props.id,
        deptName: extra.selectedNodes[0].props.name
      })
    }

    return {
      ...toRefs(state),
      onSelect
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
