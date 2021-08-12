<template>
  <a-modal v-model:visible="visible">
    <div class="add_title">添加菜单111</div>
    <a-form>
      <a-form-item label="上级菜单">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="菜单类型">
        <a-radio-group v-model:value="modalRef.menuType">
          <a-radio :value="0">目录</a-radio>
          <a-radio :value="1">菜单</a-radio>
          <a-radio :value="2">按钮</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单场景">
        <a-radio-group v-model:value="modalRef.menuScene">
          <a-radio :value="1">PC</a-radio>
          <a-radio :value="2">MOBILE</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="菜单名称">
        <a-input placeholder="请输入菜单名称"
                 v-model:value="modalRef.menuName"></a-input>
      </a-form-item>
      <a-form-item label="请求地址">
        <a-input placeholder="请输入请求地址"
                 v-model:value="modalRef.url"></a-input>
      </a-form-item>
      <a-form-item label="权限标识">
        <a-input placeholder="请输入权限标识"
                 v-model:value="modalRef.perms"></a-input>
      </a-form-item>
      <a-form-item label="显示排序">
        <a-input placeholder="请输入显示排序"
                 v-model:value="modalRef.orderNum"></a-input>
      </a-form-item>
      <a-form-item label="图标">
        <a-input placeholder="请选择图标"
                 v-model:value="modalRef.icon"></a-input>
      </a-form-item>
      <a-form-item label="菜单状态">
        <a-radio-group v-model:value="modalRef.visible">
          <a-radio :value="1">显示</a-radio>
          <a-radio :value="2">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { Modal, Form, Radio, Input } from 'ant-design-vue'
import { reactive, defineComponent, toRefs } from 'vue'

interface IState {
  visible: boolean
}
interface modalRef {
  menuType: number
  menuScene: number
  menuName: string
  url: string
  perms: string
  orderNum: number
  icon: string
  visible: number
}
export default defineComponent({
  name: 'add-model',
  components: {
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Radio.name]: Radio,
    [Input.name]: Input,
    aRadioGroup: Radio.Group,
    aFormItem: Form.Item
  },
  props: {},
  setup() {
    const state: IState = reactive({
      visible: true,
      confirmLoading: false,
      moduleList: []
    })

    let modalRef: modalRef = reactive({
      menuType: 0,
      menuScene: 1,
      menuName: '',
      url: '',
      perms: '',
      orderNum: 0,
      icon: '',
      visible: 1
    })

    return {
      ...toRefs(state),
      modalRef
    }
  }
})
</script>

<style scoped>
.add_title {
  padding: 20px 0;
  font-weight: bold;
}
/deep/ .ant-form-item-label > label {
  width: 70px;
}
</style>
