<template>
    <div v-if="hotelStatus === 'show'">
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
                {{formatDate(hotelMsg.opening,'YYYY-MM-DD')}}
            </a-descriptions-item>
            <a-descriptions-item label="装修年月">
                {{formatDate(hotelMsg.decoration,'YYYY-MM-DD')}}
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
        <a-descriptions-item label="">
           <a-button @click="edit" >编辑</a-button>
        </a-descriptions-item>
    </a-card>
    </div>
    <div v-if="hotelStatus === 'edit'">
        <ai-edit @success="success" :hotelMsg="hotelMsg"></ai-edit>
    </div>
</template>

<script lang="ts">
    import {defineComponent, watch,reactive} from 'vue'
    import {useStore} from '@/store'
    import {getBusinessHotelHotelId} from '@/api/system/hotel'
    import {postBusinessHotelAccountList} from '@/api/system/hotel/account'
    import {toRefs} from "@vueuse/core";
    import {Card,Descriptions} from "ant-design-vue";
    import {getDict} from '@/hooks/dict-list'
    import {formatDate} from '@/utils/common'
    import {accountType} from "@/utils/dict";
    import router from "@/router";
    import {useRouter, useRoute} from "vue-router";
    import edit from "./edit.vue";

    export default defineComponent({
        name: "index",
        components:{
            [Card.name]:Card,
            [Descriptions.name]:Descriptions,
            aDescriptionsItem:Descriptions.Item,
            aiEdit:edit
        },
        setup(){
            const uRouter = useRouter()
            const uRoute = useRoute()
            const store = useStore()
            const state = reactive({
                hotelMsg:{},
                hotelType: {},
                hotelStatus:'show',
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

            //跳转编辑
            const edit = ()=>{
                state.hotelStatus = 'edit'
                // console.log('router',router)
                // const uRouter = useRouter()
                // const uRoute = useRoute()
<<<<<<< HEAD
=======
                // debugger
                return
>>>>>>> 67a2307eb0a45f8b4d3f345654ceec57a709d72b
                const component =  ()=>import('./edit.vue')
                const addRouter = {
                    component:component,
                    meta: {
                        title: '编辑',
                        icon: 'icon-zhuomian',
                        keepAlive: true,
                        reload: false,
                        componentName: component.name,
                        hidden: true
                    },
                    name: '/hotel/edit' || '',
                    path: '/hotel/edit',
                    props: false
                }
                uRouter.addRoute('/hotel',addRouter)
                uRouter.push({path:'/hotel/edit'})
            }

            //修改成功
            const success = (e) =>{
                state.hotelStatus = 'show'
                state.hotelMsg = Object.assign( state.hotelMsg,e)
            }

            return{
                ...toRefs(state),
                formatDate,
                edit,
                success,
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
