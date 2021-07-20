<template>

</template>

<script lang="ts">
    import {defineComponent,reactive,toRefs} from 'vue'
    import {getBusinessOrderLogByOrderRoomOrderRoomId} from '@/api/system/order/index'
    import {useRoute} from "vue-router";
    export default defineComponent({
        name: "order-log",
        props:{

        },
        setup(){
            const uRoute = useRoute()
            const state = reactive({
                logMsg:{}
            })

            const getOrderLog = async ()=>{
                const {data} = await getBusinessOrderLogByOrderRoomOrderRoomId({orderRoomId:uRoute.query.id})
                state.logMsg = data
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
