<template>
  <a-card>
    <hotel-month></hotel-month>
  </a-card>

  <a-row style="margin-top: 12px" :gutter="16">
    <a-col :span="8">
      <a-card style="width: 100%">
        <ota-source></ota-source>
      </a-card>
    </a-col>
    <a-col :span="16">
      <a-card style="width: 100%">
        <week-order-source></week-order-source>
      </a-card>
    </a-col>
  </a-row>
  <a-card style="margin-top: 12px;width: 100%">
    <order-room></order-room>
  </a-card>

</template>

<script lang="ts">
  import {defineComponent, reactive} from 'vue'
  import hotelMonth from './components/hotel-month.vue'
  import otaSource from  './components/ota-source.vue'
  import weekOrderSource from  './components/week-order-source.vue'
  import orderRoom from  './components/order-room.vue'
  import {getBusinessBillRecordInterNightHotelMonth,getBusinessBillRecordOtaSourceSumHotelMonth,
    getBusinessBillRecordOrderSourceHotelMonth} from '@/api/index/index'
  import store, { useStore } from '@/store'
  import components from  "./components"

  import hotel from "@/router/constantRouter/hotel";
  export default defineComponent({
    name: "index",
    components:{
      ...components,
      hotelMonth,
      otaSource,orderRoom,
      weekOrderSource
    },
    setup(){
      let state = reactive({
        hotelId: store.getters.hotelId,
        billMonth:'2021-10'
      })

      //查询酒店本月间夜数据
      const getHotelNight = ()=>{
        getBusinessBillRecordInterNightHotelMonth({hotelId:state.hotelId,billMonth:state.billMonth})
      }

      //查询七天订单数量
      const getHotelOrderNumber = () =>{
        getBusinessBillRecordOrderSourceHotelMonth({hotelId:state.hotelId})
      }


      const createFn = () =>{
        getHotelNight();
        getHotelOrderNumber();
        // getOrderSource()
      }


    },


  })
</script>

<style scoped>

</style>
