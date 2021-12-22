<template>
    <a-drawer
            title="Create a new account"
            :width="500"
            :visible="visible"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose">
        <schema-form ref="dynamicForm"
                     :fields="fields"
                     :form-schema="dynamicValidateForm" />
        <div
                :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
        >
            <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
            <a-button type="primary" @click="onOk">提交</a-button>
        </div>
    </a-drawer>
</template>

<script lang="ts">
    import {defineComponent, PropType, reactive, ref, toRefs} from 'vue'
    import {Drawer,Button} from "ant-design-vue";
    import {FormSchema} from "@/types/schema";
    import {SchemaForm} from "@/components/JSON-schema-form";

    export default defineComponent({
        name: "form-drawer",
        components:{
            [Drawer.name]:Drawer,
            [Button.name]:Button,
            SchemaForm
        },
        props: {
            remove: {
                // 移除模态框
                type: Function,
                default: () => ({})
            },
            formSchema: {
                // 表单项
                type: Object as PropType<FormSchema>,
                default: () => ({})
            },
            fields: {
                // 默认值，一般编辑时传入
                type: Object,
                default: () => ({})
            },
            hiddenFields: {
                // 不需要显示的字段（表单项）
                type: Array,
                default: () => []
            },
            handleOk: {
                // 点击确定
                type: Function
            }
        },
        setup(props){
            const dynamicForm = ref<any>(null)
            const state = reactive({
                visible: true,
                confirmLoading: false,
                // dynamicValidateForm: cloneDeep(props.formSchema)
                dynamicValidateForm: props.formSchema
            })


            props.hiddenFields.forEach(
                (field) =>
                    (state.dynamicValidateForm.formItem.find(
                        (item) => item.field == field
                    )!.hidden = !!props.fields)
            )

            const onOk = () => {
                state.confirmLoading = true
                dynamicForm.value
                    .validate()
                    .then(async (res) => {
                        await (
                            props.handleOk && props.handleOk(dynamicForm.value.modelRef, state)
                        ).finally(() => (state.confirmLoading = false))
                        state.visible = false
                    })
                    .catch((err) => {
                        console.log('error', err)
                        state.confirmLoading = false
                    })
            }

            const onClose = () =>{
                state.visible = false
                setTimeout(()=>{
                    props?.remove()
                },500)
            }

            return {
                ...toRefs(state),
                onOk,
                dynamicForm,
                onClose
            }

        },
    })
</script>

<style scoped>

</style>
