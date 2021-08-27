<template>
    <div>
        <div  v-for="(btn,index) in list"
              v-show="btn.fun(orderRoomMsg)"
              class="m-inline">
            <template v-if="btn.action && btn.action.type == 'popconfirm'">
                <a-popconfirm
                        :key="index"
                        cancel-text="取消操作"
                        ok-text="确认"
                        @confirm="btn.callBackFun(orderRoomMsg,fun)"
                >
                    <template #title> {{btn.action.title}}？ </template>
                    <a-button class="m-btn"
                              :type="btn.type">
                        {{btn.title}}
                    </a-button>
                </a-popconfirm>
            </template>
            <template v-else>
                <a-button class="m-btn"
                          @click="btn.callBackFun(orderRoomMsg,fun)"
                          :type="btn.type">
                    {{btn.title}}
                </a-button>
            </template>

        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, watch} from 'vue'
    import {AButton} from '@/components/button'
    import checkInModal from './check-in.vue'
    import checkoutModal from './check-out.vue'
    import exchangeModal from './exchange.vue'
    import { useCreateModal } from '@/hooks'
    import {Popconfirm} from "ant-design-vue";
    import store from "@/store";
    import {OrderActions} from "@/store/modules/order/actions";

    export default defineComponent({
        name: "handle-index",
        components: {
            AButton,
            [Popconfirm.name]: Popconfirm,
        },
        props: {
            list: Array,
            orderRoomMsg:{
                type:Object
            },
            fun:Function
        },
        emits:['callback'],
        setup(props,{emit}) {
            // const handleOk = (btn) => {
            //     switch (btn.name) {
            //         case 'check-in' :
            //             //办理入住
            //             openModal('checkin','办理入住',btn)
            //             break
            //         case 'send-coupons':
            //             //发送优惠券
            //             sendCoupons()
            //             break
            //         case 'check-out' :
            //             //退房
            //             openModal('checkout','办理退房',btn)
            //             break
            //         case 'exchange':
            //             //换房
            //             openModal('exchange','办理换房',btn)
            //             break
            //         case 'resend-code':
            //             resendCode()
            //             break
            //         default:
            //             break
            //     }
            // }

            // //openModal
            // const openModal = (modal,title,btn) =>{
            //     const obj =  {
            //         checkin:checkInModal,
            //         checkout:checkoutModal,
            //         exchange:exchangeModal
            //     }
            //     useCreateModal(obj[modal],{
            //         title:title,
            //         orderRoomMsg:props?.orderRoomMsg,
            //         callback:async () =>{
            //             await store.dispatch(OrderActions.getOrderRoomMsg)
            //         }
            //     })
            // }


            //发送优惠券
            // const sendCoupons = ()=> {}
            //
            // //重现发送短信
            // const  resendCode = () => {}

            watch(() => props.list, (val) => {
            },{deep:true})
            return {
                // handleOk
            }
        },
    })
</script>

<style scoped>
    .m-btn {
        margin: 0 10px;
    }
    .m-inline{
        display: inline-block;
    }
</style>
