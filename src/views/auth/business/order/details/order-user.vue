<template>
<div>
    <dynamic-table  ref="tableRef"
                    :columns="userColumns"
                    :bordered="false"
                    :pageOption="pageOption"
                    :get-list-func="getBusinessOrderRoomUser"
                    rowKey="id" >
        <template v-slot:footer>
            <div class="s-footer">新增入住人</div>
        </template>
    </dynamic-table>
</div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs} from 'vue'
    import {getBusinessOrderRoomUser} from '@/api/system/order/order-user'
    import {useRoute} from "vue-router";
    import { DynamicTable } from '@/components/dynamic-table'
    import {userColumns} from './user-columns'

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
            // const uRoute = useRoute()
            const state = reactive({
                orderUser: {},
                pageOption:{
                    orderRoomId: props.id
                }
            })
            const getOrderRoomUser = async () => {
                const params = {
                    orderRoomId: props.id
                }

                const {data} = await getBusinessOrderRoomUser(params)
                state.orderUser = data
            }
            // getOrderRoomUser()
            return {
                ...toRefs(state),
                getOrderRoomUser,
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
