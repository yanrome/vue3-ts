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
        <dynamic-table ref="tableRef" :pageOption="pageOption" rowKey="id" :columns="columns()"
                       :get-list-func="postBusinessRoom">
            <template v-slot:title>
                <a-button @click="addItem"
                          type="primary">
                    新增
                </a-button>
            </template>
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
    import {formModal} from "./form-modal";
    import {useStore} from "@/store";
    import {transFormStr} from "@/utils/common";
    import {DictActions} from "@/store/modules/dict/actions";
    import {postBusinessRoom, postBusinessRoomAdd} from "@/api/system/hotel/room";
    import {useRoute} from "vue-router";


    export default defineComponent({
        name: "大门信息",
        components: {
            [Card.name]: Card,
            [Button.name]:Button,
            SchemaForm, AButton, DynamicTable
        },
        setup() {
            const store = useStore()
            const uRouter = useRoute()
            const dynamicForm = ref<any>(null)
            const tableRef = ref<any>(null)
            let state = reactive({
                pageOption: {
                    hotelId:uRouter.query.id,
                    isGate:1
                },
                status:{},
            })


            const addItem = () =>{
                useFormModal({
                    title: '编辑',
                    formSchema:formModal(),
                    handleOk:async (data)=>{
                        const params  = {
                            roomScaleId:0,
                            hotelId:uRouter.query.id,
                            isGate:1,
                            ...data
                        }
                        postBusinessRoomAdd(params).then(()=>{
                            tableRef.value.refreshTableData()
                        })
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
                addItem,
                confirm,
                cancel,
                dynamicForm,
                formSchema: formSearch(),
                postBusinessPoliceList,
                columns,
                tableRef,
                postBusinessRoom,
            }
        },
    })
</script>

<style scoped>

</style>
