<template>
    <a-descriptions :labelStyle="{color:'rgba(0,0,0,0.45)',fontSize: '14px'}"
                    :contentStyle="{fontWeight:'500',fontSize:'16px'}"
                    :column="2" layout="vertical" title="订单信息">
        <a-descriptions-item   label="预订人">{{orderRoomMsg?.order?.roomUser}}</a-descriptions-item>
        <a-descriptions-item label="房型名称">{{orderRoomMsg?.roomScale?.scaleName}}</a-descriptions-item>
        <a-descriptions-item label="入住日期">Hangzhou, Zhejiang</a-descriptions-item>
        <a-descriptions-item label="房间数量">empty</a-descriptions-item>
        <a-descriptions-item label="备注">无</a-descriptions-item>
    </a-descriptions>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Descriptions} from "ant-design-vue";
    export default defineComponent({
        name: "order-msg",
        props:{
            orderRoomMsg:{
                type:Object
            }
        },
        components:{
            [Descriptions.name]: Descriptions,
            aDescriptionsItem: Descriptions.Item,
        },
        setup(){

        },
    })
</script>

<style scoped>

</style>
