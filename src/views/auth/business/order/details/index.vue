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
                    渠道订单号：
                </div>
            </div>
            <div>
                <a-button type="primary">办理入住</a-button>
            </div>
        </div>
        <a-divider/>

        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="订单信息">
                <a-descriptions :column="2" layout="vertical" title="订单信息">
                    <a-descriptions-item  :labelStyle="{color:'#fff'}" :contentStyle="{
                        color:'#fff'
                    }" label="预订人">预订人</a-descriptions-item>
                    <a-descriptions-item label="房型名称">1810000000</a-descriptions-item>
                    <a-descriptions-item label="入住日期">Hangzhou, Zhejiang</a-descriptions-item>
                    <a-descriptions-item label="房间数量">empty</a-descriptions-item>
                    <a-descriptions-item label="备注">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </a-descriptions-item>
                </a-descriptions>
            </a-tab-pane>
            <a-tab-pane key="2" tab="房间客人" force-render>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="操作日志">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>


    </a-card>
</template>

<script lang="ts">
    import {GetBusinessOrderRoomOrderRoomId} from '@/api/system/order/index'
    import {defineComponent, reactive, toRefs, ref} from 'vue'
    import {useRoute} from "vue-router";
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
                ...toRefs(state)
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
