<template>
    <a-card>
        <h3>订单详情</h3>
        <div class="flex-bet">
            <div class="z-flex">
                <div class="details-top-item fontsize20">
                    <div>订单号：{{orderRoomMsg.id}}</div>
                    <div>
                        <a-tag color="blue">订单同步</a-tag>
                        <a-tag color="blue">个人</a-tag>
                    </div>
                </div>
                <div class="details-top-item fontsize14 fontcolor00045">
                    订单渠道:
                </div>
                <div class="details-top-item fontsize14 fontcolor00045">
                    渠道订单号：{{uRoute.query.id}}
                </div>
            </div>
            <div>
                <a-button type="primary">办理入住</a-button>
            </div>
        </div>
        <a-divider/>

        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="订单信息">
                <order-msg :order-room-msg="orderRoomMsg"></order-msg>
            </a-tab-pane>
            <a-tab-pane key="2" tab="房间客人" >
                <order-user></order-user>
            </a-tab-pane>
            <a-tab-pane key="3" tab="操作日志">
                <order-log></order-log>
            </a-tab-pane>
        </a-tabs>


    </a-card>
</template>

<script lang="ts">
    import {GetBusinessOrderRoomOrderRoomId} from '@/api/system/order/index'
    import {defineComponent, reactive, toRefs, ref} from 'vue'
    import {useRoute} from "vue-router";
    import OrderMsg from './order-msg.vue'
    import OrderLog from './order-log.vue'
    import OrderUser from './order-user.vue'
    import {Card, Tag, Divider, Tabs, Descriptions} from "ant-design-vue";

    export default defineComponent({
        name: "details",
        components: {
            [Card.name]: Card,
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
        setup() {
            const uRoute = useRoute()

            const state = reactive({
                orderRoomMsg: {},
                activeKey: ref('1'),
            })

            //获取订单详情
            const getBusinessDetails = async (params = {}) => {
                params = {
                    orderRoomId: uRoute.query.id,
                    ...params
                }
                const {data} = await GetBusinessOrderRoomOrderRoomId(params)
                state.orderRoomMsg = data
            }

            getBusinessDetails()

            return {
                ...toRefs(state),
                uRoute
            }
        },
    })
</script>

<style lang="scss" scoped>
    .details-top-item {
        margin-right: 35px;
    }
    .contentStyle{
        color: #FFFF00;
    }
</style>
