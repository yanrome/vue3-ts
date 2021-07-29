<template>
    <div>
        <a-button class="m-btn"
                  @click="handleOk(btn)"
                  v-for="btn in list"
                  v-show="btn.fun(orderRoomMsg)"
                  :type="btn.type">
            {{btn.title}}
        </a-button>
    </div>
</template>

<script lang="ts">
    import {defineComponent, watch} from 'vue'
    import {AButton} from '@/components/button'
    import checkInModal from './check-in.vue'
    import checkoutModal from './check-out.vue'
    import exchangeModal from './exchange.vue'
    import { useCreateModal } from '@/hooks'

    export default defineComponent({
        name: "handle-index",
        components: {
            AButton
        },
        props: {
            list: Array,
            orderRoomMsg:{
                type:Object
            }
        },
        setup(props) {
            const handleOk = (btn) => {
                switch (btn.name) {
                    case 'check-in' :
                        //办理入住
                        openModal('checkin','办理入住')
                        break
                    case 'send-coupons':
                        //发送优惠券
                        sendCoupons()
                        // openModal('sendCoupons')
                        break
                    case 'check-out' :
                        //退房
                        openModal('checkout','办理退房')
                        break
                    case 'exchange':
                        //换房
                        openModal('exchange','办理换房')
                    default:
                        break
                }
            }

            //openModal
            const openModal = (modal,title) =>{
                const obj =  {
                    checkin:checkInModal,
                    checkout:checkoutModal,
                    exchange:exchangeModal
                }
                useCreateModal(obj[modal],{
                    title:title,
                    orderRoomMsg:props?.orderRoomMsg
                })
            }


            //发送优惠券
            const sendCoupons = ()=>{}




            watch(() => props.list, (val) => {
                console.log('val',val)
            },{deep:true})
            return {
                handleOk
            }
        },
    })
</script>

<style scoped>
    .m-btn {
        margin: 0 10px;
    }
</style>
