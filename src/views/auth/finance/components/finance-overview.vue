<template>
  <div>
    <a-row class="box">
      <a-col :span="12"
             class="w50"
             style="margin-right: 2px;">
        <div class="c_ccc">
          <WechatFilled style="font-size: 20px;color: #00BB35;" />微信实时余额
        </div>
        <div class="flex c_00"><span class="normal">￥</span>{{ Number(dataAll.leftAmountByWx).toFixed(2) }}</div>
        <div class="flex">
          <div class="left">
            <div>预收房费</div>
            <div class="f000">{{ Number(dataAll.preRoomPriceByWx).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>已结算未转账</div>
            <div class="f000">{{ Number(dataAll.wxBalanceUntransfer).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>押金余额</div>
            <div class="f000">{{ Number(dataAll.depositOnPlatByWx).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>佣金总额</div>
            <div class="f000">{{ Number(dataAll.wxPlatCommission).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>已转账房费</div>
            <div class="f000">{{ Number(dataAll.wxBalanceAmount - dataAll.wxBalanceUntransfer).toFixed(2) }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span="12"
             class="w50">
        <div class="c_ccc">
          <AlipaySquareFilled style="font-size: 20px;color: #1296DB;" />支付宝实时余额
        </div>
        <div class="flex c_00"><span class="normal">￥</span>{{ Number(dataAll.leftAmountByAli).toFixed(2) }}</div>
        <div class="flex">
          <div class="left">
            <div>预收房费</div>
            <div class="f000">{{ Number(dataAll.preRoomPriceByAli).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>已结算未转账</div>
            <div class="f000">{{ Number(dataAll.aliBalanceUntransfer).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>押金余额</div>
            <div class="f000">{{ Number(dataAll.depositOnPlatByAli).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>佣金总额</div>
            <div class="f000">{{ Number(dataAll.aliPlatCommission).toFixed(2) }}</div>
          </div>
          <div class="left">
            <div>已转账房费</div>
            <div class="f000">{{ Number(dataAll.aliBalanceAmount - dataAll.aliBalanceUntransfer).toFixed(2) }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="flex p0">
      <div ref='myChart'
           class="left_title"
           :style="{ width: '60%', height: '450px' }">
      </div>
      <div class="w35">
        <div class="left_title">佣金收入排行</div>
        <div>
          <div v-for="(item,i) in dataAll.aiyoPlatCommissionByHotel"
               :key="i"
               class="right_bottom"
               :style="{'font-weight':i<3?'bold':''}">
            <div class="w55">{{ i+1 }}、{{ item.hotelName }}</div>
            <div class="w35">&yen;{{ item.aiyoPlatCommission }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import { WechatFilled, AlipaySquareFilled } from '@ant-design/icons-vue'
import { Row } from 'ant-design-vue'
import { businessAiyoBillDashboard } from '@/api/system/finance/index'
import * as echarts from 'echarts'

export default defineComponent({
  components: {
    [Row.name]: Row,
    WechatFilled,
    AlipaySquareFilled
  },
  setup() {
    const state = reactive({
      dataAll: {} as any,
      hotelList: [] as any,
      xAxisData: [] as any,
      seriesData: [] as any
    })

    const getInfo = async () => {
      const res = await businessAiyoBillDashboard()
      state.dataAll = res.data
      state.dataAll.aiyoPlatCommission.forEach((item) => {
        state.xAxisData.push(item.billTime)
        state.seriesData.push(item.aiyoPlatCommission)
      })
    }
    // 也可以用const myChart = ref<any>();
    const myChart = ref<HTMLElement>()
    const myCharts = ref<any>()
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption({
        title: {
          text: '佣金收入趋势',
          subtext: '单位（元）',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: state.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '佣金收入',
            type: 'line',
            data: state.seriesData,
            label: {
              normal: {
                show: true
              }
            },
            areaStyle: {
              normal: {
                color: '#D6E4FF' //改变区域颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#275F82', //改变折线点的颜色
                lineStyle: {
                  color: '#AABDD5' //改变折线颜色
                }
              }
            }
          }
        ]
      })
    }, 1000)
    getInfo()
    return {
      ...toRefs(state),
      myChart,
      // 方法
      getInfo
    }
  }
})
</script>
<style scoped>
.box {
  display: flex;
  justify-content: space-between;
}
.flex {
  /* border: 1px solid red; */
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  padding-left: 20px;
  margin: 10px 0 0 0;
}
.w50 {
  width: 48%;
  background: #fff;
  padding: 10px;
  font-size: 16px;
  color: #b4b4b4;
}
.left {
  width: 33%;
  margin-bottom: 20px;
}
.f000 {
  color: #000;
  font-weight: bold;
  padding: 10px 0;
}
.c_ccc {
  color: #747474;
}
.c_00 {
  font-size: 30px;
  color: #000;
  font-weight: bold;
  align-items: center;
}
.normal {
  font-size: 18px;
  font-weight: normal;
}
.p0 {
  justify-content: space-between;
  padding: 0;
  background: #fff;
  color: #000;
  margin-bottom: 20px;
}
.left_title {
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  color: #000;
}
.right_bottom {
  display: flex;
  line-height: 40px;
}
.w35 {
  width: 35%;
}
.w55 {
  width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>