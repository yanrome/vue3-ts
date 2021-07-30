<template>
    <a-modal width="900px" v-model:visible="visible" ok-text="结账退房" @ok="handleOk">
        <h3>订单信息</h3>
        <h4 class="text-indent">{{orderRoomMsg?.roomScale?.scaleName}}</h4>
        <div class="text-indent">
            <span>入住: {{ formatDate(orderRoomMsg?.order?.startTime,'YYYY-MM-DD')}} </span>
            <span>退房: {{ formatDate(orderRoomMsg?.order?.endTiime,'YYYY-MM-DD')}} </span>
        </div>
        <a-divider></a-divider>
        <h3>账单信息</h3>
        <h4 class="text-indent">{{orderRoomMsg?.roomScale?.scaleName}}</h4>
        <div class="text-indent">
            <div>房费金额: {{ orderRoomMsg?.roomRealAmount}} </div>
            <div>押金金额: {{ orderRoomMsg?.deposit}} </div>
        </div>
    </a-modal>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, toRefs} from 'vue'
    import {Modal,Divider} from "ant-design-vue";
    import {formatDate} from "@/utils/common";
    import {postOrderRoomLeave} from "@/api/system/order";

    export default defineComponent({
        name: "check-in",
        components: {
            [Modal.name]: Modal,
            [Divider.name]:Divider
        },
        props: {
            orderRoomMsg: {
                type: Object
            }
        },
        setup(props) {
            const visible = ref<boolean>(true)
            const state = reactive({
                leaveParams:{
                    orderRoomId:props?.orderRoomMsg?.id,
                    orderId:props?.orderRoomMsg?.orderId,
                    depositCut:'' , //扣押金额
                    depositCutReason:'' //扣押原因
                }
            })
            //办理退房
            const handleOk = async () =>{
                const params = state.leaveParams
                const {data} = await postOrderRoomLeave(params)
            }

            return {
                ...toRefs(state),
                visible,
                handleOk,
                formatDate
            }
        },


    })
</script>

<style lang="scss" scoped>

    .s-room-item {
        border: 1px solid #D4D4D4;
        cursor: pointer;
        border-radius: 2px;
        display: inline-block;
        margin: 6px;
        width: 102px;
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
    }

    .active {
        border: 1px solid #1890FF;
        position: relative;

        &:after {
            position: absolute;
            content: '√';
            width: 18px;
            height: 18px;
            background: #1890FF;
            color: #ffffff;
            border-radius: 50%;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            top: 11px;
            right: 11px;
        }
    }
    .text-indent{
        text-indent: 2em;
    }
</style>
