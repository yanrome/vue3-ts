<template>
    <a-descriptions :labelStyle="{color:'rgba(0,0,0,0.45)',fontSize: '14px'}"
                    :contentStyle="{fontWeight:'500',fontSize:'16px'}"
                    :column="3" layout="vertical" title="订单信息">
        <a-descriptions-item v-if="orderRoomMsg?.roomSn"  label="房间号">{{orderRoomMsg?.roomSn}}</a-descriptions-item>
        <a-descriptions-item   label="预订人">{{orderRoomMsg?.order?.roomUser}}</a-descriptions-item>
        <a-descriptions-item label="房型名称">{{orderRoomMsg?.roomScale?.scaleName}}</a-descriptions-item>
        <a-descriptions-item label="入住日期">
            {{formatDate(orderRoomMsg?.order?.startTime,'YYYY-MM-DD')}} ~ {{formatDate(orderRoomMsg?.order?.endTime,'YYYY-MM-DD')}}   共{{orderRoomMsg?.order?.diffDay}}晚</a-descriptions-item>
        <a-descriptions-item label="房间数量">{{orderRoomMsg?.order?.roomNum}}间</a-descriptions-item>
        <a-descriptions-item label="备注">无</a-descriptions-item>
    </a-descriptions>
    <a-divider/>
    <h3>房费：￥{{ point(orderRoomMsg?.invoiceAmount)}}</h3>
    <a-descriptions v-if="orderRoomMsg?.priceRecord" :column="6" layout="vertical" bordered>
        <a-descriptions-item label="日期">房价</a-descriptions-item>
        <a-descriptions-item v-for="item in toObj(orderRoomMsg?.priceRecord,true) " :key="item.value" :label="item.value">{{ point( item.label)}}</a-descriptions-item>
    </a-descriptions>
    <div style="margin: 18px 0">
        <a-space :size="30">
            <span>房费：  ￥{{ point( orderRoomMsg?.roomRealAmount)}}</span>

            <span v-if="orderRoomMsg?.discountPrice">
                连住折扣：  -￥{{point(orderRoomMsg?.discountPrice) }}
            </span>
            <span v-if="orderRoomMsg?.discountMember">
                会员优惠：  -￥{{point( orderRoomMsg?.discountMember) }}
            </span>
            <span v-if="orderRoomMsg?.couponAmount">优惠劵优惠：  -￥{{point( orderRoomMsg?.couponAmount)}}</span>
        </a-space>
    </div>
    <a-space :size="30">
        <span>实际支付：  ￥{{ point( orderRoomMsg?.invoiceAmount)}}</span>
    </a-space>
    <a-divider/>
    <h3>押金：{{orderRoomMsg?.deposit}}</h3>
    <div class="z-right">
        <handle :list="list"
                :orderRoomMsg="orderRoomMsg"
                :fun="getBusinessDetails"
        ></handle>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, watch} from 'vue'
    import {Descriptions,Divider,Space,Button} from "ant-design-vue";
    import {formatDate} from "@/utils/common";
    import {toObj} from "@/utils/common";
    import handle from '../components/handle'
    import {buttonList} from '../utils/btn-type'
    import {toRefs} from "@vueuse/core";
    import {point} from '@/utils/common'
    import {getBusinessRoomScaleDiscountInfo} from "@/api/system/hotel/room";
    import store from "@/store";
    import {OrderActions} from "@/store/modules/order/actions";

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
            [Button.name]:Button,
            aDescriptionsItem: Descriptions.Item,
            handle
        },
        setup(props){
            const state = reactive({
                list: buttonList.filter(item=>{
                    return item.author?.includes(props?.orderRoomMsg?.status)
                })
            })

            //获取订单详情
            const getBusinessDetails = async (params = {}) => {
                await store.dispatch(OrderActions.getOrderRoomMsg,params)
            }


            watch(() => props.orderRoomMsg, (val) => {
                if(val){
                    state.list = buttonList.filter(item=>{
                        return item.author?.includes(props?.orderRoomMsg?.status)
                    })
                }
            },{deep:true})
            return{
                ...toRefs(state),
                getBusinessDetails,
                point,
                formatDate,
                toObj
            }
        },
    })
</script>

<style scoped>
.z-right{
    float: right;
}
</style>
