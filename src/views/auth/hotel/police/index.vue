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
        <dynamic-table :pageOption="pageOption" rowKey="id" :columns="columns(getFn)"
                       :get-list-func="postBusinessPoliceList">
        </dynamic-table>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref} from 'vue'
    import {Card,Button} from "ant-design-vue";
    import {AButton} from '@/components/button/'
    import {SchemaForm} from '@/components/JSON-schema-form'
    import {formSearch} from './form-search'
    import {DynamicTable} from '@/components/dynamic-table'
    import {toRefs} from "@vueuse/core";
    import { postBusinessPoliceList } from "@/api/system/hotel/police";
    import {columns} from "./columns"
    import {getDict} from "@/hooks/dict-list";
    import moment from 'moment'
    import {useFormModal} from "@/hooks";
    import {formModal} from "@/views/auth/hotel/roomdev/form-modal";
    import {useStore} from "@/store";
    import {transFormStr} from "@/utils/common";
    import {DictActions} from "@/store/modules/dict/actions";

    export default defineComponent({
        name: "退款记录",
        components: {
            [Card.name]: Card,
            [Button.name]:Button,
            SchemaForm, AButton, DynamicTable
        },
        setup() {
            const store = useStore()
            const dynamicForm = ref<any>(null)
            let state = reactive({
                pageOption: {},
                status:{},
            })
            const getDictFn = async () => {
                const status = await store.dispatch(DictActions.getDict,{dictType:'business_room_dev_type'})
                const devDomain =  await store.dispatch(DictActions.getDict,{dictType:'business_room_dev_domain'})
                return {
                    status: status,
                    devDomain:devDomain,
                }
            }
            const getFn = getDictFn()

            const addItem = () =>{
                useFormModal({
                    title: '编辑账号',
                    formSchema:formModal(getFn),
                    handleOk:async (data)=>{
                    }
                })
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
                getFn,
                addItem,
                confirm,
                cancel,
                dynamicForm,
                formSchema: formSearch(getFn),
                postBusinessPoliceList,
                columns
            }
        },
    })
</script>

<style scoped>

</style>
