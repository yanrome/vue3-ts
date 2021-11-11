<template>
    <div ref='otaCharts' :style="{ width: '100%', height: '450px' }"></div>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch,ref} from 'vue'
    import {getBusinessBillRecordOtaSourceSumHotelMonth} from '@/api/index/index'
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
            let otaCharts =  ref<HTMLElement>()
            let myCharts = ref<any>()


            //查询订单来源
            const getOrderSource = async () =>{
                const orderSource = await store.dispatch(DictActions.getDict,{dictType:'business_order_source'})
                getBusinessBillRecordOtaSourceSumHotelMonth({hotelId:state.hotelId,billMonth:state.billMonth}).then(res=>{
                    let data = res.data.map(item=>{
                        let mapObj = {
                            value:item.platCount,
                            name:orderSource.find(source=>source.dictValue == item.billPlat).dictLabel
                        }
                        return mapObj
                    })

                    myCharts.value = echarts.init(otaCharts.value!);

                    let  option = {
                        title: {
                            text: '订单来源统计',
                            subtext: '',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
                        series: [
                            {
                                name: '来源统计',
                                type: 'pie',
                                radius: '50%',
                                data: data,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    option && myCharts.value.setOption(option);
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
                otaCharts
            }
        },
    })
</script>

<style scoped>

</style>
