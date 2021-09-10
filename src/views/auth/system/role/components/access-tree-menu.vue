<template>
  <a-spin :spinning="spinning">
    <!-- :replace-fields="replaceFields" -->
    <a-tree checkable
            :checkStrictly='true'
            :selectable="false"
            :tree-data="treeData"
            v-model:checkedKeys="checkedKeys"
            @check="onCheck">
    </a-tree>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { Tree, Spin } from 'ant-design-vue'
import { systemMenuRoleMenuTreeData } from '@/api/system/menu/index'
import { concat } from 'lodash'
import { number } from 'echarts'

export default defineComponent({
  name: 'access-tree',
  components: { [Tree.name]: Tree, [Spin.name]: Spin },
  emits: ['update:value'], // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      treeData: [] as any,
      checkedKeys: [] as any,
      spinning: false
    })

    onMounted(async () => {
      // 获取权限资源列表
      state.spinning = true
      const res = await systemMenuRoleMenuTreeData(props.value).finally(
        () => (state.spinning = false)
      )
      let checkedChilds = res.data.map((item) => {
        if (item.checked == true) {
          return item.id
        }
      })
      state.checkedKeys = checkedChilds.filter(Boolean)
      state.treeData = list2tree(res.data)
    })
    // 列表转树
    const list2tree = (arr) => {
      let temp = {}
      let tree = {}
      // 数组转 键值对
      arr.forEach((item) => {
        // item.title = item.name
        item.key = item.id
        temp[item.id] = item
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

    // 获取所有父节点的key
    const getParentsKey = (treeNode, arr: number[] = []) => {
      if (treeNode.eventKey) {
        arr.push(treeNode.eventKey)
        return getParentsKey(treeNode.vcTreeNode, arr)
      }
      return arr
    }

    // 获取所有子节点的key
    const getChildrenKeys = (treeNode, arr: number[] = []) => {
      if (treeNode?.children.length > 0) {
        return treeNode.children.reduce((prev, curr) => {
          if (curr.children.length > 0) {
            prev.push(...getChildrenKeys(curr, prev), [])
          }
          return prev.concat([curr.id])
        }, arr)
      }
      return arr
    }

    // 勾选事件处理函数
    const onCheck = (keys, { node, checked }) => {
      emit('update:value', state.checkedKeys)
    }

    return {
      ...toRefs(state),
      onCheck
    }
  }
})
</script>

<style scoped>
</style>
