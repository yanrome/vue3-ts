<template>
  <div>
    <a-row class="box">
      <a-col :span="12"
             class="w50"
             style="margin-right: 2px;">
        <div>
          <WechatOutlined />微信实时余额
        </div>
        <div class="flex">
          <div class="left">
            <div>预收房费</div>
            <div class="f000">{{ dataAll.preRoomPriceByWx }}</div>
          </div>
          <div class="left">
            <div>已结算未转账</div>
            <div class="f000">{{ dataAll.wxBalanceUntransfer }}</div>
          </div>
          <div class="left">
            <div>押金余额</div>
            <div class="f000">{{ dataAll.depositOnPlatByWx }}</div>
          </div>
          <div class="left">
            <div>佣金总额</div>
            <div class="f000">{{ dataAll.wxPlatCommission }}</div>
          </div>
          <div class="left">
            <div>已转账房费</div>
            <div class="f000">{{ dataAll.wxBalanceAmount - dataAll.wxBalanceUntransfer }}</div>
          </div>
        </div>
      </a-col>
      <a-col :span="12"
             class="w50">
        <div>支付宝实时余额</div>
        <div class="flex">
          <div class="left">
            <div>预收房费</div>
            <div class="f000">{{ dataAll.preRoomPriceByAli }}</div>
          </div>
          <div class="left">
            <div>已结算未转账</div>
            <div class="f000">{{ dataAll.aliBalanceUntransfer }}</div>
          </div>
          <div class="left">
            <div>押金余额</div>
            <div class="f000">{{ dataAll.depositOnPlatByAli }}</div>
          </div>
          <div class="left">
            <div>佣金总额</div>
            <div class="f000">{{ dataAll.aliPlatCommission }}</div>
          </div>
          <div class="left">
            <div>已转账房费</div>
            <div class="f000">{{ dataAll.aliBalanceAmount - dataAll.aliBalanceUntransfer }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { Row, Col, Input, Button } from 'ant-design-vue'
import { businessAiyoBillDashboard } from '@/api/system/finance/index'
import { configProviderProps } from 'ant-design-vue/lib/config-provider'
export default defineComponent({
  components: {
    [Row.name]: Row
  },
  setup() {
    const state = reactive({
      dataAll: {} as any
    })
    const aaa = async () => {
      const res = await businessAiyoBillDashboard()
      state.dataAll = res.data
      //   console.log('查询哎哟有房平台总账', state.dataAll)
    }
    aaa()
    console.log('statestatestatestate', state)
    console.log('state.dataAll', state.dataAll)
    return {
      ...toRefs(state),
      // 方法
      aaa
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
}
.left {
  width: 33%;
  margin-bottom: 20px;
}
</style>