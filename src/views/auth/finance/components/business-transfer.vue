<template>
  <div>
    <a-form-item label="酒店名称"
                 class="w50 mr20">
      <a-select :options="hotelAll"
                style="width: 220px;"
                v-model:value="hotel_input"
                @change="handleChange">
      </a-select>
    </a-form-item>
    <a-table :row-selection="rowSelection"
             :columns="columns"
             :data-source="dataArr">
    </a-table>
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
import { businessAiyoBillUntransfer } from '@/api/system/finance/index'
import { getBusinessHotelList } from '../../../../api/system/hotel/index'

export default defineComponent({
  components: {
    [Row.name]: Row,
    WechatFilled,
    AlipaySquareFilled
  },
  setup() {
    interface DataType {
      key: string
      hotelName: string
      balanceUnTransfer: number
      unBalance: string
    }

    interface hotel_DataType {
      value: string
      label: string
    }

    const state = reactive({
      dataArr: [] as any,
      order: {},
      hotelAll: [] as any,
      options: [] as any
    })

    const hotel_input = ref('所有')

    const columns = [
      {
        title: '酒店名称',
        dataIndex: 'hotelName'
      },
      {
        title: '待转账总金额',
        dataIndex: 'unBalance'
      },
      {
        title: '未结算',
        dataIndex: 'balanceUnTransfer'
      },
      {
        title: '已结算未转账',
        dataIndex: 'balanceUnTransfer'
      }
    ]

    const params = {
      pageNum: 1,
      pageSize: 10,
      hotelId: ''
    }

    const hotel_params = {
      searchValue: ''
    }

    const getInfo = async () => {
      const res = await businessAiyoBillUntransfer(params)
      state.order = res.order
      for (const k in res.data) {
        const obj: DataType = {
          key: '',
          hotelName: '',
          balanceUnTransfer: 0,
          unBalance: ''
        }
        obj.key = k
        obj.hotelName = res.data[k].hotelName
        obj.balanceUnTransfer = res.data[k].balanceUnTransfer
        state.dataArr.push(obj)
      }
    }

    const getHotelList = async (hotel_params) => {
      const res = await getBusinessHotelList(hotel_params)
      res.data?.map((item) => {
        const hotel_obj: hotel_DataType = {
          value: '',
          label: ''
        }
        hotel_obj.value = item.id
        hotel_obj.label = item.hotelName
        state.hotelAll.push(hotel_obj)
      })
      let first = {
        value: '',
        label: '所有'
      }
      state.hotelAll.unshift(first)
    }

    const handleChange = (value) => {
      state.dataArr = []
      params.hotelId = value
      getInfo()
    }
    getInfo()
    getHotelList(hotel_params)
    return {
      ...toRefs(state),
      columns,
      params,
      hotel_input,
      // 方法
      getInfo,
      getHotelList,
      handleChange
    }
  }
})
</script>
<style scoped></style>