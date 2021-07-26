<template>
    <a-card class="g-search-card">
        <a-radio-group @change="orderRoomStatusChange" v-model:value="orderRoomStatus">
            <a-radio-button value="">全部订单</a-radio-button>
            <a-radio-button v-for="item in orderRoomStatusData" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
        </a-radio-group>
        <div class=" g-search-input">
            <a-row type="flex" align="middle" :gutter="[72,16]">
<!--                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">-->
<!--                    <a-row  type="flex" align="middle">-->
<!--                        <a-col :span="6">房间号:</a-col>-->
<!--                        <a-col :span="18">-->
<!--                            <a-input placeholder="请输入"></a-input>-->
<!--                        </a-col>-->
<!--                    </a-row>-->
<!--                </a-col>-->
                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <a-row  type="flex" align="middle">
                        <a-col :span="6">检索条件:</a-col>
                        <a-col :span="18">
                            <a-input v-model="pageOption.searchValue" placeholder="请输入"></a-input>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <a-button @click="reset">重置</a-button>
                </a-col>
            </a-row>
        </div>

    </a-card>
    <a-card class="w100 mtp8 g-card">
        <dynamic-table ref="tableRef" :listType="'list'" :orderSource="orderSource" @callbackMore="callbackMore"  :columns="columns" :pageOption="pageOption"
                       :get-list-func="postBusinessOrderRoomList" rowKey="id">
            <template v-slot:title>
            </template>
        </dynamic-table>
        <!--        <order-list></order-list>-->
    </a-card>

</template>
<script lang="ts">
    import {defineComponent, reactive, ref, toRefs, watch} from 'vue';
    import {columns} from "./columns";
    import {DynamicTable} from '@/components/dynamic-table'
    import {OrderList} from '@/components/order-list'
    import {postBusinessOrderRoomList} from '@/api/system/order'
    import {useStore} from "@/store";
    import {usePages} from '@/hooks'
    import {OrderMutationType} from "@/store/modules/order/mutations";
    import {Row,Col,Input,Button} from 'ant-design-vue'
    import {getDict} from "@/hooks/dict-list";
    import AddModal from './details/index.vue'
    import { useCreateModal } from '@/hooks'
    import { fromIcons } from "@/utils/dict";


    export default defineComponent({
        components: {
            [Row.name]:Row,
            [Col.name]:Col,
            [Input.name]:Input,
            [Button.name]:Button,
            DynamicTable,
            OrderList,

        },
        setup() {
            const store = useStore()


            let orderRoomStatus = ref(store.getters.orderRoomStatus || '1')
            let state = reactive({
                pageOption: {
                    hotelId: store.getters.hotelId,
                    status: orderRoomStatus,
                    searchValue:''
                },
                orderSource:{},
                orderRoomStatusData: [] as any
            })

            //获取订单房间状态
            const getDictFn = async ()=>{
                const data = await getDict('business_orderroom_status','businessOrderroomStatus',true)
                let orderSource = await getDict('business_order_source','businessOrderSource',true)
                const orderSourceObj = {}
                orderSource = orderSource.map(item=>{
                    item.icon = fromIcons[item.value] || undefined
                    orderSourceObj[item.value] = item
                    return item
                })
                state.orderSource= orderSourceObj
                state.orderRoomStatusData = data

            }
            getDictFn()

            //watch监听
            watch(() => store.getters.hotelId, (val) => {
                state.pageOption.hotelId = val
            })

            //重置筛选条件
            const reset = () =>{
                console.log(usePages())
            }

            //切换订单筛选状态
            const orderRoomStatusChange = (val) => {
                store.commit(OrderMutationType.setOrderRoomStatus, val.target.value)
            }

            //callback
            const callbackMore = (id) => {
                useCreateModal(AddModal, {
                    id:id,
                    orderSource:state.orderSource,
                    callback: () => {}
                })
            }

            return {
                columns,
                postBusinessOrderRoomList,
                ...toRefs(state),
                orderRoomStatus,
                reset,
                orderRoomStatusChange,
                callbackMore,
            };
        },
    });
</script>
<style lang="scss" scoped>
    .mtp8{
        margin-top: 8px;
    }
    .g-search-card{
        height: auto;
        .g-search-input{
            padding-top: 20px;
        }
    }
    /*.g-card{*/
    /*    height: calc( 100vh - 265px - 108px );*/
    /*    overflow-y: auto;*/
    /*}*/
</style>
