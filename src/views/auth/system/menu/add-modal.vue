<template>
    <a-modal  v-model:visible="visible">
        <a-form>
            <a-form-item label="菜单类型">
                <a-radio-group v-model:value="modalRef.resource">
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
                <a-input placeholder="请输入菜单名称" v-model:value="modalRef.name"></a-input>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts">
    import {Modal, Form, Radio, Input} from 'ant-design-vue'
    import { reactive,defineComponent,toRefs } from 'vue'

    interface IState {
        visible: boolean
    }
    interface modalRef{
        resource:number,
        menuScene:number,
        name:string | number
    }
    export default  defineComponent( {
        name: "add-model",
        components:{
            [Modal.name]:Modal,
            [Form.name]:Form,
            [Radio.name]:Radio,
            [Input.name]: Input,
            aRadioGroup:Radio.Group,
            aFormItem:Form.Item
        },
        props:{

        },
        setup(){
            const state: IState = reactive({
                visible: true,
                confirmLoading: false,
                moduleList: []
            })

            let modalRef:modalRef = reactive({
                resource:0,
                menuScene:1,
                name:''
            })

            return{
                ...toRefs(state),
                modalRef
            }

        },
    })
</script>

<style scoped>

</style>
