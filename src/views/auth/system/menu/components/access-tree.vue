<template>
  <a-spin :spinning="spinning">
    <!-- :replace-fields="replaceFields" -->
    <!-- checkable -->
    <!-- <a-tree-select style="min-height: 40px;"
                   :checkStrictly='true'
                   :selectable="false"
                   :dropdown-style="{ maxHeight: '400px', overflow: 'auto'}"
                   :tree-data="treeData"
                   v-model:checkedKey="checkedKey"
                   @change="onSelect">
    </a-tree-select> -->
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
      label: ''
    })

    // console.log('=============>', props.value)

    onMounted(async () => {
      // 查询所有菜单列表树
      state.spinning = true
      const res = await systemMenuMenuTreeData().finally(
        () => (state.spinning = false)
      )
      let pId = props.value
        ? res.data?.find((item) => item.id == props.value).pId
        : '主目录'
      // console.log('=============>', pId)
      state.label =
        pId != '主目录'
          ? res.data?.find((item) => item.pId == pId).name
          : '主目录'
      state.treeData = list2tree(res.data)
      // console.log('-----', list2tree(res.data))
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