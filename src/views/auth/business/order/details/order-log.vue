<template>
<a-steps progress-dot :current="1" direction="vertical">
    <a-step v-for="item in logMsg" :key="item.id" :title="item.title"
            :description="item.realName +' ' + item.operTime" />
</a-steps>
</template>

<script lang="ts">
    import {defineComponent,reactive,toRefs} from 'vue'
    import {getBusinessOrderLogByOrderRoomOrderRoomId} from '@/api/system/order/index'
    import {useRoute} from "vue-router";
    import {getDict} from "@/hooks/dict-list";
    import {Steps} from "ant-design-vue";

    export default defineComponent({
        name: "order-log",
        components:{
            [Steps.name]:Steps,
            aStep:Steps.Step
        },
        props:{
            id:{
                type:Number
            }
        },
        setup(props){
            // const uRoute = useRoute()
            const state = reactive({
                logMsg:{},
            })

            const getOrderLog = async ()=>{
                let orderTypeArray = await getDict('business_order_oper_type','',false)
                const {data} = await getBusinessOrderLogByOrderRoomOrderRoomId({orderRoomId:props.id})
                state.logMsg = data.map(item=>{
                    item.title = orderTypeArray[item.orderOperType]
                    return item
                })
            }
            getOrderLog()


            return{
                ...toRefs(state)
            }
        },
    })
</script>

<style scoped>

</style>
