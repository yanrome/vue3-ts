<template>
    <div ref='orderCharts'
         :style="{ width: '100%', height: '450px' }">
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch,ref} from 'vue'
    import {getBusinessBillRecordInterNightHotelMonth} from '@/api/index/index'
    import store from "@/store";
    import {DictActions} from "@/store/modules/dict/actions";
    import * as echarts from 'echarts';
    import {getWxHotel} from '@/api/system/hotel/index'
    import list from "ant-design-vue/es/transfer/list";
    export default defineComponent({
        name: "ota-source",
        setup(){
            let state = reactive({
                hotelId: store.getters.hotelId,
                billMonth:'2021-10',
                data:Object
            })

            //初始化ref
            let orderCharts =  ref<HTMLElement>()
            let myOrderCharts = ref<any>()


            //查询订单来源
            const getOrderSource =  () =>{

                // const {data}= await getWxHotel({hotelId:state.hotelId}).then()  //store.dispatch(DictActions.getDict,{dictType:'business_order_source'})
                // let roomScales = data.roomScales
                getBusinessBillRecordInterNightHotelMonth({hotelId:state.hotelId,billMonth:state.billMonth}).then(res=>{
                    let arr = Object.values(res.data)
                    let resArr = arr.map(item=>{
                        if(typeof item == "object" && item)
                            return Object.keys(item)
                    })
                    let resData = Array.prototype.concat.apply([],resArr)
                    let legendData = [...new Set(resData)]

                    let  xAxisData:any = Object.entries(res.data).sort((a, b) => new Date(a[0]).getTime()  - new Date(b[0]).getTime())
                   let xAxis = xAxisData.map(item=>item[0])
                    let series = legendData.map((item,index)=>{
                        let array = xAxisData.map(xAxisDataItem=>{
                            return xAxisDataItem.length && xAxisDataItem[1].hasOwnProperty(item) && xAxisDataItem[1][item] || 0
                        })
                        return {
                            name:item,
                            type: 'line',
                            data: array, //[120, 132, 101, 134, 90, 230, 210, 210, 210, 210, 210],
                            smooth: true
                        }
                    })


                    myOrderCharts.value = echarts.init(orderCharts.value!);
                    let option = {
                       title: {
                           text: '近30天房型统计'
                       },
                       tooltip: {
                           // trigger: 'axis'
                       },
                       legend: {
                           data:legendData,// ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                       },
                       grid: {
                           left: '3%',
                           right: '4%',
                           bottom: '3%',
                           containLabel: true
                       },
                       toolbox: {
                           feature: {
                               saveAsImage: {}
                           }
                       },
                       xAxis: {
                           data:xAxis
                       },
                       yAxis: {
                           type: 'value'
                       },
                       series: series
                   };
                    console.log('this.options',option)
                    setTimeout(() => {
                        try {
                            option && myOrderCharts.value.setOption(option);
                        } catch (error) {}
                    }, 1000)


                })

            }

            getOrderSource()




            watch(
                () => store.getters.hotelId,
                (val) => {
                    state.hotelId = val
                    getOrderSource()
                }
            )

            return {
                orderCharts
            }
        },
    })
</script>

<style scoped>

</style>
