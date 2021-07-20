<template>
    <a-card>
        <a-descriptions
                title="酒店信息"
                :labelStyle="{color:'rgba(0,0,0,0.65)' }"
                :contentStyle="{color:'rgba(0,0,0,0.45)' }"
                :column="1">
            <a-descriptions-item label="酒店名称">
                {{hotelMsg.hotelName}}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
                {{hotelMsg.phone}}
            </a-descriptions-item>
            <a-descriptions-item label="地址">
                {{hotelMsg.province}}  {{hotelMsg.city}} {{hotelMsg.county}} {{hotelMsg.location}}
            </a-descriptions-item>
            <a-descriptions-item label="经纬度">
                <div>经度:{{hotelMsg.longitude}}</div>
                <div>纬度:{{hotelMsg.latitude}}</div>
            </a-descriptions-item>
        </a-descriptions>
    </a-card>
    <a-card>
        <a-descriptions
                title="详细信息"
                :labelStyle="{color:'rgba(0,0,0,0.65)' }"
                :contentStyle="{color:'rgba(0,0,0,0.45)' }"
                :column="1">
            <a-descriptions-item label="酒店类型">
                {{ hotelType[hotelMsg.hotelType] }}
            </a-descriptions-item>
            <a-descriptions-item label="开业年月">
                {{formatDate(hotelMsg.termStartTime,'YYYY-MM-DD')}}
            </a-descriptions-item>
            <a-descriptions-item label="酒店简介">
                {{hotelMsg.description}}
            </a-descriptions-item>
        </a-descriptions>
    </a-card>
    <a-card>
        <a-descriptions
                title="收款信息"
                :labelStyle="{color:'rgba(0,0,0,0.65)' }"
                :contentStyle="{color:'rgba(0,0,0,0.45)' }"
                :column="1">
            <a-descriptions-item v-for="item in account" :key="item.id" :label="accountType[item.accountType]">
                {{item.account}}
            </a-descriptions-item>
        </a-descriptions>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, watch,reactive} from 'vue'
    import {useStore} from '@/store'
    import {getBusinessHotelHotelId} from '@/api/system/hotel'
    // import {getSystemDictDataByType} from '@/api/system/dict'
    import {postBusinessHotelAccountList} from '@/api/system/hotel/account'
    import {toRefs} from "@vueuse/core";
    import {Card,Descriptions} from "ant-design-vue";
    // import {changeDict} from '@/utils/common'
    import {getDict} from '@/hooks/dict-list'
    import {formatDate} from '@/utils/common'
    import {accountType} from "@/utils/dict";

    export default defineComponent({
        name: "index",
        components:{
            [Card.name]:Card,
            [Descriptions.name]:Descriptions,
            aDescriptionsItem:Descriptions.Item
        },
        setup(){
            const store = useStore()
            const state = reactive({
                hotelMsg:{},
                hotelType: {},
                account:{},
                accountType: {}
            })

            const getHotelMsg = async ()=>{
                const [hotelType,accountType] =[
                    await getDict('hotel_type','hotelType'),
                    await getDict('account_type','accountType')
                ]
                state.hotelType = hotelType
                state.accountType = accountType

                const params = {
                    hotelId:store.getters.hotelId
                }
                const [{data},{data:account}] =  [await getBusinessHotelHotelId(params),await postBusinessHotelAccountList(params)]
                state.hotelMsg = data
                state.account = account
            }
            getHotelMsg()

            //watch监听
            watch(() => store.getters.hotelId, (val) => {
                getHotelMsg()
            })

            return{
                ...toRefs(state),
                formatDate,
                accountType
            }
        },
    })
</script>

<style scoped>
.g-map{
    width: 230px;
    height: 150px;
    background: #00ff6f;
}
</style>
