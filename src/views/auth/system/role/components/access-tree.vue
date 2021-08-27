<template>
  <a-spin :spinning="spinning">
<<<<<<< HEAD
    <a-tree checkable
            v-if="treeData.length"
            :checkStrictly='true'
            :selectable="false"
            :tree-data="treeData"
            v-model:checkedKeys="checkedKeys"
            :show-line="true"
            :defaultExpandAll='true'
=======
    <a-tree style="min-height: 40px;"
            checkable
            checkStrictly
            :selectable="false"
            :tree-data="treeData"
            :replace-fields="replaceFields"
            v-model:checkedKeys="checkedKeys"
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
            @check="onCheck">
    </a-tree>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import { Tree, Spin } from 'ant-design-vue'
<<<<<<< HEAD
import { systemDeptRoleDeptTreeData } from '@/api/system/menu/index'
import { concat } from 'lodash'
import { number } from 'echarts'
=======
import { getAdminRoleAccess } from '@/api/system/role'
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b

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
<<<<<<< HEAD
      treeData: [] as any,
      checkedKeys: [] as any,
      spinning: false
=======
      treeData: [],
      spinning: false,
      replaceFields: {
        key: 'id'
      }
    })

    // 列表转树
    const list2tree = (items, parent = -1) => {
      return items
        .filter((item) => item.moduleId == parent)
        .map((item) => ({
          ...item,
          title: item.moduleName || item.actionName,
          children: list2tree(items, item.id)
        }))
    }

    // 已勾选的节点
    const checkedKeys = computed({
      get: () => props.value,
      set: (val: any) =>
        emit('update:value', Array.isArray(val) ? val : val.checked)
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
    })

    onMounted(async () => {
      // 获取权限资源列表
      state.spinning = true
<<<<<<< HEAD
      const res = await systemDeptRoleDeptTreeData(props.value).finally(
        () => (state.spinning = false)
      )
      let checkedChilds = res.data.map((item) => {
        if (item.checked == true) {
          return item.id
        }
      })
      state.checkedKeys = checkedChilds.filter(Boolean)
      state.treeData = list2tree(res.data)
      // console.log('查询角色对应所有模板菜单列表树', list2tree(res.data))
      // console.log('原来的length=====111>', state.checkedKeys)
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
=======
      const data = await getAdminRoleAccess().finally(
        () => (state.spinning = false)
      )
      state.treeData = list2tree(data)
    })
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b

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
<<<<<<< HEAD
=======
        console.log(treeNode.children, 'children')
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
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
<<<<<<< HEAD
      console.log('原来的length=====>', state.checkedKeys.checked)
      emit('update:value', state.checkedKeys)
=======
      let tempKeys: number[] = checkedKeys.value
      // 子节点选中，父节点必然要选中
      if (checked) {
        tempKeys = [
          ...new Set([
            ...checkedKeys.value,
            ...keys.checked,
            ...getParentsKey(node.vcTreeNode),
            ...getChildrenKeys(node.dataRef)
          ])
        ]
      } else {
        const childrenKeys = getChildrenKeys(node.dataRef)
        console.log(childrenKeys, 'childrenKeys')
        if (childrenKeys.length > 0) {
          tempKeys = keys.checked.filter((item) => !childrenKeys.includes(item))
        } else {
          tempKeys = keys.checked
        }
        // 获取所有同级节点
        const children =
          node.vcTreeNode?.dataRef?.children?.map((item) => item.id) || []
        // 如果当前所有选中的节点中没有包含任何一个直属子节点
        if (!children.some((item) => tempKeys.includes(item))) {
          tempKeys = tempKeys.filter(
            (item) => item != node.vcTreeNode?.eventKey
          )
        }
      }
      checkedKeys.value = tempKeys
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
    }

    return {
      ...toRefs(state),
<<<<<<< HEAD
=======
      checkedKeys,
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
      onCheck
    }
  }
})
</script>

<style scoped>
</style>
