<template>
    <div ref='weekCharts'
         :style="{ width: '100%', height: '450px' }">
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch,ref} from 'vue'
    import {getBusinessBillRecordOrderSourceHotelMonth} from '@/api/index/index'
    import store from "@/store";
    import {DictActions} from "@/store/modules/dict/actions";
    import * as echarts from 'echarts';

    export default defineComponent({
        name: "ota-source",
        setup(){
            let state = reactive({
                hotelId: store.getters.hotelId,
                billMonth:'2021-10',
                data:Object
            })

            //初始化ref
            let weekCharts =  ref<HTMLElement>()
            let myWeekCharts = ref<any>()


            //查询订单来源
            const getOrderSource = async () =>{
                const orderSource = await store.dispatch(DictActions.getDict,{dictType:'business_order_source'})

                getBusinessBillRecordOrderSourceHotelMonth({hotelId:state.hotelId,billMonth:state.billMonth}).then(res=>{
                    let product = ['product',...orderSource.map(item=>item.dictLabel)]
                    let resKey = Object.entries(res.data)
                    let source = resKey.map(item=>{
                        let product = {product:item[0]}
                        let value = item[1]
                       //  { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
                       // {1:4}
                        if ( typeof value === 'object'){
                            for (const itemKey in value) {
                                product[orderSource.find(orderSourceItem=>itemKey == orderSourceItem.dictValue).dictLabel] = value[itemKey]
                            }
                        }
                        return product
                    }).sort((a, b) => new Date(a.product).getTime()  - new Date(b.product).getTime())

                    let series = orderSource.map(()=>{
                        return { type: 'bar' }
                    })
                    myWeekCharts.value = echarts.init(weekCharts.value!);

                   let option = {
                       legend: {},
                       title: {
                           text: '七天数据统计',
                       },
                       tooltip: {},
                       dataset: {
                           dimensions:product,
                           source: source,
                       },
                       xAxis: { type: 'category' },
                       yAxis: {},
                       series: series
                   };
                    option && myWeekCharts.value.setOption(option);

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
                weekCharts
            }
        },
    })
</script>

<style scoped>

</style>
