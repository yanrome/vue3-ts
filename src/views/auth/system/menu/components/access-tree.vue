<template>
  <a-spin :spinning="spinning">
    <a-tree-select v-model:value="label"
                   style="width: 100%;"
                   :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                   :tree-data="treeData"
                   :treeNodeLabelProp='id'
                   @select='onSelect' />
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
import { systemMenuMenuTreeData } from '@/api/system/menu/index'

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
      parentId: '',
      label: ''
    })

    const z_modelRef: string | null = window.localStorage.getItem('z_modelRef')
    if (z_modelRef) {
      if (JSON.parse(z_modelRef).parentId >= '0' && JSON.parse(z_modelRef).id) {
        // 编辑
        state.parentId = JSON.parse(z_modelRef).parentId
      } else if (
        !JSON.parse(z_modelRef).parentId &&
        JSON.parse(z_modelRef).id
      ) {
        // 新增
        state.parentId = JSON.parse(z_modelRef).id
      } else if (!JSON.parse(z_modelRef).id) {
        // 新增
        state.parentId = '99999'
      }
    }
    // if (z_modelRef) {
    //   JSON.parse(z_modelRef)
    //   if (JSON.parse(z_modelRef).parentId >= '0') {
    //     // 编辑
    //     state.parentId = JSON.parse(z_modelRef).parentId
    //   } else {
    //     // 新增
    //     state.parentId = JSON.parse(z_modelRef).id
    //   }
    // }
    // alert(state.parentId)
    onMounted(async () => {
      // 查询所有菜单列表树
      state.spinning = true
      const res = await systemMenuMenuTreeData().finally(
        () => (state.spinning = false)
      )
      if (state.parentId == '0') {
        state.label = '无'
      } else if (state.parentId == '99999') {
        state.label = '主目录'
      } else {
        state.label = res.data?.find((item) =>
          state.parentId
            ? item.id == state.parentId
            : item.pId == state.parentId
        ).name
      }
      state.treeData = list2tree(res.data)
    })

    // 列表转树
    const list2tree = (arr) => {
      let temp = {}
      let tree = {}
      // 数组转 键值对
      arr.forEach((item) => {
        item.value = item.title
        temp[item.id] = item
        temp[item.value] = item.title
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
      emit('update:value', extra.selectedNodes[0].props.id)
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
