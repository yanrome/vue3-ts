<template>
    <a-modal width="100%"
             wrapClassName="full-modal"
             @cancel="cancel"
             v-model:visible="visible">
        <a-card>
            <h3>订单详情</h3>
            <div class="flex-bet">
                <div class="z-flex">
                    <div class="details-top-item fontsize20">
                        <div>订单号：{{orderRoomMsg?.id}}</div>
                        <div>
                            <a-tag :color="orderTypeColor[orderRoomMsg?.status]">{{orderRoomStatusData[orderRoomMsg?.status]}}</a-tag>
                        </div>
                    </div>
                    <div class="details-top-item fontsize14 fontcolor00045">
                        订单渠道:
                        <img v-if="orderSource?.[orderRoomMsg?.orderType]?.['icon']"
                             :src="orderSource?.[orderRoomMsg?.orderType]?.['icon']" alt="">
                        <span v-else> {{ orderSource?.[orderRoomMsg?.orderType]?.['label']}}</span>
                    </div>
                    <div class="details-top-item fontsize14 fontcolor00045">
                        渠道订单号：{{uRoute.query.id}}
                    </div>
                </div>
                <div>
<!--                    <a-button type="primary">办理入住</a-button>-->
                </div>
            </div>
            <a-divider/>

            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="订单信息">
                    <order-msg :id="uRoute.query.id" :order-room-msg="orderRoomMsg"></order-msg>
                </a-tab-pane>
                <a-tab-pane key="2" tab="房间客人">
                    <order-user :id="uRoute.query.id"></order-user>
                </a-tab-pane>
                <a-tab-pane key="3" tab="操作日志">
                    <order-log :id="uRoute.query.id"></order-log>
                </a-tab-pane>
            </a-tabs>


        </a-card>
        <template #footer>
            <a-button key="back" @click="cancel">Return</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts">
    import {GetBusinessOrderRoomOrderRoomId} from '@/api/system/order/index'
    import {defineComponent, reactive, toRefs, ref,watch} from 'vue'
    import {useRoute} from "vue-router";
    import OrderMsg from './order-msg.vue'
    import OrderLog from './order-log.vue'
    import OrderUser from './order-user.vue'
    import {Card, Tag, Divider, Modal, Tabs, Descriptions} from "ant-design-vue";
    import {OrderMutationType} from "@/store/modules/order/mutations";
    import {OrderActions} from "@/store/modules/order/actions";
    import store from '@/store'
    import {getDict} from "@/hooks/dict-list";

     const orderTypeColor = {
        1: '#5A7EF8',
        2: '#6CC178',
        3: '#FA7D41',
        4: '#F95252',
        7: '#108ee9',
    }
    export default defineComponent({
        name: "details",
        components: {
            [Card.name]: Card,
            [Modal.name]: Modal,
            [Tag.name]: Tag,
            [Tabs.name]: Tabs,
            [Divider.name]: Divider,
            [Descriptions.name]: Descriptions,
            aTabPane: Tabs.TabPane,
            aDescriptionsItem: Descriptions.Item,
            OrderMsg,
            OrderLog,
            OrderUser
        },
        props: {
            id: {
                type: Number
            },
            orderSource: {
                type: Object
            },
            callback:{
                type:Function
            }
        },
        setup(props) {
            const uRoute = useRoute() || {query: props}
            store.commit(OrderMutationType.setOrderRoomId,uRoute.query.id)
            const state = reactive({
                visible: true,
                orderRoomMsg: {},
                orderRoomStatusData:{},
                activeKey: ref('1'),
            })

            //弹出框取消回调
            const cancel = () =>{
                state.visible = false
                store.commit(OrderMutationType.setOrderRoomMsg,null)
            }

            //获取订单详情
            const getBusinessDetails = async (params = {}) => {
                 await store.dispatch(OrderActions.getOrderRoomMsg,params)
                const data = await getDict('business_orderroom_status','businessOrderroomStatus',false)

                state.orderRoomStatusData = data
            }

            getBusinessDetails()

            watch(() => store.getters.orderRoomMsg, (val,oldValue) => {
                state.orderRoomMsg = store.getters.orderRoomMsg
                // if (oldValue){
                //    props?.callback?.()
                // }
            },{deep:true})

            return {
                ...toRefs(state),orderTypeColor,
                cancel,
                uRoute
            }
        },
    })
</script>

<style lang="scss">
    .details-top-item {
        margin-right: 35px;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .contentStyle {
        color: #FFFF00;
    }

    .full-modal {
        .ant-modal {
            max-width: 100%;
            top: 0;
            padding-bottom: 0;
            margin: 0;
        }

        .ant-modal-content {
            display: flex;
            flex-direction: column;
            height: calc(100vh);
        }

        .ant-modal-body {
            flex: 1;
        }
    }
</style>

　　
