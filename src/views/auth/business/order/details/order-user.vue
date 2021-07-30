<template>
<div>
    <dynamic-table  ref="tableRef"
                    :columns="userColumns"
                    :bordered="false"
                    :pageOption="pageOption"
                    :get-list-func="getBusinessOrderRoomUser"
                    rowKey="id" >
        <template v-slot:footer>
            <div @click="addItem" class="s-footer">新增入住人</div>
        </template>
    </dynamic-table>
</div>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, toRefs} from 'vue'
    import {getBusinessOrderRoomUser,postUserAdd} from '@/api/system/order/order-user'
    import { DynamicTable } from '@/components/dynamic-table'
    import {userColumns} from './user-columns'
    import {useFormModal} from "@/hooks";
    import {getFormSchema} from "./add-user";


    export default defineComponent({
        name: "order-user",
        components:{
            DynamicTable
        },
        props:{
            id:{
                type:Number
            }
        },
        setup(props) {
            const tableRef = ref<any>(null)
            // const uRoute = useRoute()
            const state = reactive({
                orderUser: {},
                pageOption:{
                    orderRoomId: props.id
                }
            })

            //获取用户列表
            const getOrderRoomUser = async () => {
                const params = {
                    orderRoomId: props.id
                }

                const {data} = await getBusinessOrderRoomUser(params)
                state.orderUser = data
            }

            //添加入住人
            const addItem = () => {
                useFormModal({
                    title: '添加入住人',
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        console.log(modelRef)
                        const params = {
                            orderRoomId:props.id,
                            roomUser:modelRef
                        }
                       const {data} = await  postUserAdd(params)
                        tableRef.value.refreshTableData()
                    }
                })

            }
            // getOrderRoomUser()
            return {
                ...toRefs(state),
                getOrderRoomUser,
                addItem,
                getBusinessOrderRoomUser,
                userColumns,
            }
        },
    })
</script>

<style lang="scss" scoped>
.s-footer{
    width: 100%;
    text-align: center;
    padding: 5px 0;
    border: 1px dashed #D9D9D9;
}
</style>
