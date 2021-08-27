<template>
  <a-spin :spinning="spinning">
    <a-tree style="min-height: 40px;"
            v-if="treeData.length"
            :tree-data="treeData"
            @select="onSelect"
            defaultExpandAll='true'
            :defaultExpandAllRows='true'>
    </a-tree>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { Tree, Spin } from 'ant-design-vue'
import { adminDeptTreeData } from '@/api/system/dept/index'
export default defineComponent({
  name: 'access-tree',
  components: {
    [Tree.name]: Tree,
    [Spin.name]: Spin
  },
  emits: ['aaaaa'], // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      treeData: [] as any,
      spinning: false,
      replaceFields: {
        key: 'id'
      }
    })
    // 人员管理-右边-组织机构-1
    onMounted(async () => {
      state.spinning = true
      const res = await adminDeptTreeData().finally(
        () => (state.spinning = false)
      )
      state.treeData = list2tree(res.data)
    })

    // 人员管理-右边-组织机构-2
    const list2tree = (arr) => {
      let temp = {}
      let tree = {}
      // 数组转 键值对
      arr.forEach((item) => {
        item.title = item.name
        item.key = item.id
        // item.children = name
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
    // 选择树节点
    const onSelect = (selectedKeys, e) => {
      emit('aaaaa', {'parentId':e.selectedNodes[0].props.pId,'deptId':e.selectedNodes[0].props.id})
      
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

    return {
      ...toRefs(state),
      state,
      // 方法
      onSelect
    }
  }
})
</script>

<style scoped>
</style>
