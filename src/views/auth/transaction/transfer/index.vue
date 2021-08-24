<template>
    <a-card>
        <schema-form ref="dynamicForm"
                     :formSchema="formSchema">
            <template #operate-button>
                <a-button @click="confirm" type="primary">
                    确定
                </a-button>
                <a-button style="margin-left: 20px" @click="cancel" type="primary">
                    重置
                </a-button>
            </template>
        </schema-form>
    </a-card>
    <a-card>
        <dynamic-table :pageOption="pageOption" rowKey="id" :columns="columns(getDictFn())"
                       :get-list-func="postTransferList"></dynamic-table>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from 'vue'
    import {Card} from "ant-design-vue";
    import {AButton} from '@/components/button/'
    import {SchemaForm} from '@/components/JSON-schema-form'
    import {formSearch} from './form-search'
    import {DynamicTable} from '@/components/dynamic-table'
    import {toRefs} from "@vueuse/core";
    import { postTransferList } from "@/api/system/transition/transfer";
    import {columns} from "./columns"
    import {getDict} from "@/hooks/dict-list";
    import moment from 'moment'

    export default defineComponent({
        name: "退款记录",
        components: {
            [Card.name]: Card,
            SchemaForm, AButton, DynamicTable
        },
        setup() {
            const dynamicForm = ref<any>(null)
            let state = reactive({
                pageOption: {},
            })

            const getDictFn = async () => {
                const status = await getDict(
                    'business_transfer_status',
                    'businessAccountFlowType',
                    false
                )
                const type = await getDict(
                    'business_transfer_type',
                    'businessPayment',
                    false
                )
                return {
                    status: status,
                    type:type,
                }
            }

            const confirm = () => {
                console.log(dynamicForm.value.modelRef.time)
                if(dynamicForm.value.modelRef.time){
                    dynamicForm.value.modelRef.time = dynamicForm.value.modelRef.time.map(item=>{
                        return moment(item).format('YYYY-MM-DD')
                    })
                }
                state.pageOption = Object.assign(state.pageOption, dynamicForm.value.modelRef)
            }

            //重置按钮
            const cancel = () =>{
                let nothing = {
                    transferSn:'',
                    status:''
                }
                state.pageOption = Object.assign(state.pageOption, nothing)
                dynamicForm.value.modelRef= Object.assign(dynamicForm.value.modelRef, nothing)
            }

            return {
                ...toRefs(state),
                getDictFn,
                confirm,
                cancel,
                dynamicForm,
                formSchema: formSearch(),
                postTransferList,
                columns
            }
        },
    })
</script>

<style scoped>

</style>
