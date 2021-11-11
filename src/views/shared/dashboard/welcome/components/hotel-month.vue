<template>
    <div style=" padding: 20px;">
        <a-row :gutter="32">
            <a-col v-for="(item,index) in monthData" :span="4">
                <a-card bodyStyle="padding: 0;height:110px">
                    <div class="s-card-item">
                        <div class="s-ci-right" :style="'background:'+ publicColor[index+1] ">￥</div>
                        <div class="s-ci-left">
                            <div>
                                <div>{{item.value}}</div>
                                <spam>{{item.name}}</spam>
                            </div>
                        </div>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch} from 'vue'
    import {getBusinessBillRecordSumHotelMonth} from '@/api/index/index'
    import components from  "../components"
    import store from "@/store";
    import {publicColor} from "@/utils/dict";
    import {toRefs} from "@vueuse/core";


    export default defineComponent({
        name: "hotel-month",
        components:{
            ...components
        },
        setup(){
            let state = reactive({
                hotelId: store.getters.hotelId,
                billMonth:'2021-10',
                monthData:Array as Object
            })


            const createFn = ()=>{
                getBusinessBillRecordSumHotelMonth({hotelId:state.hotelId,billMonth:state.billMonth}).then(res=>{
                    const monthData = [
                        {name:'总业绩',value:res.data.totalPay},
                        {name:'平台业绩',value:res.data.aiyoPlatPay},
                        {name:'美团业绩',value:res.data.mtPlatPay},
                        {name:'携程业绩',value:res.data.xcPlatPay},
                        {name:'飞猪业绩',value:res.data.fzPlatPay},
                        {name:'其他业绩',value:res.data.otherPlatPay},
                    ]
                    state.monthData = monthData
                })
            }

            createFn()

            watch(
                () => store.getters.hotelId,
                (val) => {
                    state.hotelId = val
                    createFn()
                }
            )

            return {
                ...toRefs(state),
                publicColor,
            }
        },
    })
</script>

<style lang="scss" scoped>

.s-fm{
    width: 80px;
    background: #8cc8ff;
}
    .s-card-item{
        width: 100%;
        height: 100%;
        display: flex;
        .s-ci-right{
            width: 35%;
            font-size: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
        .s-ci-left{
            width: 65%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
