<template>
    <a-descriptions :labelStyle="{color:'rgba(0,0,0,0.45)',fontSize: '14px'}"
                    :contentStyle="{fontWeight:'500',fontSize:'16px'}"
                    :column="3" layout="vertical" title="订单信息">
        <a-descriptions-item v-if="orderRoomMsg?.roomSn"  label="房间号">{{orderRoomMsg?.roomSn}}</a-descriptions-item>
        <a-descriptions-item   label="预订人">{{orderRoomMsg?.order?.roomUser}}</a-descriptions-item>
        <a-descriptions-item label="房型名称">{{orderRoomMsg?.roomScale?.scaleName}}</a-descriptions-item>
        <a-descriptions-item label="入住日期">
            {{formatDate(orderRoomMsg?.order?.startTime,'YYYY-MM-DD')}} ~ {{formatDate(orderRoomMsg?.order?.startTime,'YYYY-MM-DD')}}   共{{orderRoomMsg?.order?.diffDay}}晚</a-descriptions-item>
        <a-descriptions-item label="房间数量">{{orderRoomMsg?.order?.roomNum}}间</a-descriptions-item>
        <a-descriptions-item label="备注">无</a-descriptions-item>
    </a-descriptions>
    <a-divider/>
    <h3>房费：￥121.00</h3>
    <a-descriptions v-if="orderRoomMsg?.priceRecord" :column="6" layout="vertical" bordered>
        <a-descriptions-item label="日期">房价</a-descriptions-item>
        <a-descriptions-item v-for="item in toObj(orderRoomMsg?.priceRecord,true) " :key="item.value" :label="item.value">{{item.label}}</a-descriptions-item>
    </a-descriptions>
    <a-space :size="30">
        <span>房费：  ￥128.00</span>
        <span>会员优惠：  -￥1.00</span>
        <span>连住优惠：  -￥8.00</span>
    </a-space>
    <a-divider/>
    <h3>押金：￥50.00</h3>

</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Descriptions,Divider,Space} from "ant-design-vue";
    import {formatDate} from "@/utils/common";
    import {toObj} from "@/utils/common";

    export default defineComponent({
        name: "order-msg",
        props:{
            orderRoomMsg:{
                type:Object
            }
        },
        components:{
            [Descriptions.name]: Descriptions,
            [Divider.name]:Divider,
            [Space.name]:Space,
            aDescriptionsItem: Descriptions.Item,
        },
        setup(){

            return{
                formatDate,
                toObj
            }
        },
    })
</script>

<style scoped>

</style>
