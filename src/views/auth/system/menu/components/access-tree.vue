<template>
  <a-spin :spinning="spinning">
    <a-tree-select
      v-model:checkedKeys="checkedKeys"
      style="min-height: 40px"
      checkable
      checkStrictly
      :selectable="false"
      :tree-data="treeData"
      :replace-fields="replaceFields"
      @check="onCheck"
    >
    </a-tree-select>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import {Tree, Spin,TreeSelect, Empty} from 'ant-design-vue'
import { adminMenu } from '@/api/system/menu/index'
import {constantRouterComponents} from "@/router/constantRouterComponents";

export default defineComponent({
  name: 'AccessTree',
  components: {
    [Tree.name]: Tree,
    [TreeSelect.name]: TreeSelect,
    [Spin.name]: Spin }, // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const state = reactive({
      treeData: [],
      spinning: false,
      replaceFields: {
        key: 'id'
      }
    })

    // 列表转树
    const list2tree = (items, parent = 0) => {
      return items
        .filter((item) => item.parentId == parent)
        .map((item) => ({
          ...item,
          title: item.menuName ,
          children: list2tree(items, item.id)
        }))
    }
    // const list2tree = (children) => {
    //
    //   return children.map((item: any) => {
    //     const {children: child, id, url = '', icon, menuName, keepAlive = false,pathPrefix='',perms =''} = item
    //
    //     return {
    //       children: list2tree(child),
    //       title:menuName,
    //       key:id,
    //       ...item
    //     }
    //   })
    // }

    // 已勾选的节点
    const checkedKeys = computed({
      get: () => props.value,
      set: (val: any) => emit('update:value', Array.isArray(val) ? val : val.checked)
    })

    onMounted(async () => {
      // 获取权限资源列表
      state.spinning = true
      const {data} = await adminMenu({}).finally(() => (state.spinning = false))
      state.treeData = list2tree(data)
    })

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
        console.log(treeNode.children, 'children')
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
        const children = node.vcTreeNode?.dataRef?.children?.map((item) => item.id) || []
        // 如果当前所有选中的节点中没有包含任何一个直属子节点
        if (!children.some((item) => tempKeys.includes(item))) {
          tempKeys = tempKeys.filter((item) => item != node.vcTreeNode?.eventKey)
        }
      }
      checkedKeys.value = tempKeys
    }

    return {
      ...toRefs(state),
      checkedKeys,
      onCheck
    }
  }
})
</script>

<style scoped></style>
　　446

　　“大哥哥！”

　　“秦公子！”

　　见秦川被扫飞出去，纪火儿，灵仙儿还有萧长风等人惊呼，纷纷激射过来，跃上貔貅之上，围在秦川身边，关切询问。

　　他们如今与黄泉殿发生了如此大战，已然是不死不休的局面，现在秦川是他们最大的依仗，若是秦川都败了，他们也必然没有好下场。

　　秦川整个人却是没事一般，忍着浑身散架一般的剧痛，站了起来，摆了摆手，漠然说道：“没事，她想杀我，还不够资格。”

　　对方乃是上界的大能，早已突破大帝，对于肉身的掌控与开发远远超过这一世的秦川，只不过是因为觊觎灵武大墓中的灵宝才压制境界进入此地。

　　面对对方突破到道宫境的全力一击，动用了补天教无上神通，融合了玄灵巨神的一丝传承。

　　在他没有动用帝魂之力，没有借助法宝，仅仅依靠灵武境的肉身之力的情况下，他也不足以对抗对方。

　　如果秦川帝魂没有陷入沉睡，或许还有一战之力。

　　而如今，单凭肉身之力，他恐怕难以对付黄泉圣女。

　　不过他帝魂虽然陷入了沉睡之中，但是他手中还有吞天鼎和无上道莲，他相信这两样法宝现世，足以镇压对方。

　　但是不到万不得已，他不准备动用这两件东西。

　　秦川丝毫不惧，他站立在貔貅背部，俾睨八荒，体内先天真气急速运转，飞速的修复他身上的伤势。

　　“玄灵巨神的传承，补天神掌，不过尔尔。”秦川青丝倒立，平淡的看着黄泉圣女，如果对方乃是一名神荒土著，将他击的身受重伤，他还会对其另眼相看。

　　不过可惜，黄泉圣女不过是压制了自身境界，动用神通与神灵传承的上界之人罢了。

　　若是放在同一高度，甚至就是在当下，他暴露某些底牌的情况下，秦川想要镇杀她，宛如捏死一只蚂蚁一般简单。

　　“什么！你竟然没死！”黄泉圣女见秦川竟然再度站了起来，悚然惊骇。

　　“我这一掌，融合了我修炼补天一道数万年的精粹，就算是在我教中也没有人能够承受的住！你不可能还活着！”

　　黄泉圣女说的我教自然不是黄泉殿，而是上界中的补天教。

　　但她随即恢复正常，既然秦川也是来自上界那个地方，想必也是有些本事。

　　而就在双方说话之际，众人都没有发现，就在秦川站在貔貅背部之时，从他身上的血液缓缓流淌下来，随着滴落在那貔貅之上，那些血迹竟然迅速的融入进貔貅的体内，消失不见。

　　“哼，莫说是你，就算是莫问天那老东西来了也奈何不得本公子。”秦川斜睨，漠然说道。

　　“你……胆敢侮辱老祖，竖子找死！”黄泉圣女柳眉倒竖，美目中爆出闪电，射向秦川。

　　她再度出手，双掌化作白玉，一片灿烂而可怕的神光从她双掌之中横空扫过来，她倾尽全力，势要斩杀秦川。

　　而就在此时，异变突起。

　　就在秦川身上的血液淌入那尊石像貔貅体内，那道恐怖的神光横扫过来之际，突然，那尊貔貅口中吐出一道璀璨的虹芒。

　　那道虹芒快若闪电，强如惊雷，径直与黄泉神女的那一团神光撞在一起。

　　“轰！”

　　双方发生碰撞，发出一道撼动天地的恐怖气息，耀眼的光芒耀起，绚烂而刺眼。

　　“那尊貔貅活过来了？”

　　“它真的活过来了！”

　　这一刻，所有人都惊呆了，目瞪口呆的看着眼前的这尊貔貅，无比震撼。

　　貔貅，乃是传闻中的上古凶兽，众人皆以为那只是一尊石像，没想到竟然真的活了过来。

　　只见这尊貔貅通体变成金黄，一缕缕黄金一般的毛发倒竖，矗立在青铜石门之前，不怒自威。

　　秦川和黄泉圣女两人双眸之中爆出惊人而炽盛的光芒，照耀在那尊貔貅之上。

　　两人同时明白，这并不是貔貅活了，而是他吸收了足够多的精血，唤醒了它存留在这具石像之中的一缕残魂。

　　黄泉圣女更是大喜，这尊貔貅镇守于此，永镇青铜之门，若不将它体内的那一缕残魂击败，他们永远无法打开青铜之门。

　　如今。

　　貔貅的残魂现世，打开青铜之门又更近一步了。

　　那尊貔貅守护青铜之门，如今被唤醒，它苏醒后的第一件事便是杀戮，镇杀所有的人。

　　“吼！”

　　它发出一道恐怖的怒吼声，声音化作实质化的波纹，层层滚涌出去，瞬间将无数武者横扫出去。

　　接着，它双翅展开，扑扇着巨大的翅膀，一根黄金棍一般的尾巴向着背部的秦川等人横扫过来。

　　它乃是伟大的貔貅，在上古神魔横行的年代，它也是大名鼎鼎，无敌于世间的存在，何时有人敢站在它的背上。

　　“小心！”

　　秦川爆喝，身形暴动，凝聚自身肉身所有的力量汇聚在一双拳头之上，向着横扫过来的黄金铁棍一般的尾巴轰去。

　　“砰！”

　　秦川感觉像是一柄天神的战锤击打在身上一般，排上倒海的力道从对方的尾巴传来。

　　这貔貅的力道，竟然丝毫不逊于突破到道宫境，融合了玄灵巨神传承，动用补天神掌的黄泉圣女的全力一击。

　　秦川整个人再度倒飞出去，砰的一声，砸在了那一道青铜之门上。

　　那青铜之门原本蒙着厚厚的尘埃，此时被秦川一顿撞击，发出一道清脆悠扬的声响同时，无数的尘埃落下，露出了这道青铜之门原本的模样。

　　这道青铜之门上雕刻着密密麻麻的神秘符号。

　　秦川凛然，这些符号正是当初在天魔森林中那座石碑上所见的符文一模一样。

　　“这些都是某种文字。”

　　他凝目望去，他在青铜之门的某一处，看见一个残缺的角落，其形状正与他从古石手中得来的那一块青铜碎片相吻合。

　　秦川虽然被貔貅横扫出去，但却安然无恙，这惹恼了貔貅，它双目射出璀璨的光芒，铜铃一般的眼睛盯着秦川，将他锁定，山岳一般的身躯再度向着他扑来。
