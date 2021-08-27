<template>
  <div>
    <div style="border: 1px solid red;">
      111
      <!-- <a-table :columns="columns"
               :dataSource="data">
      </a-table> -->
      <!-- <a-table :columns="columns"
               :data-source="data" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { businessAiyoBillUntransfer } from '@/api/system/finance/index'
import { Table } from 'ant-design-vue'
export default defineComponent({
  components: {
    [Table.name]: Table
  },
  async setup() {
    // 定义
    interface DataType {
      key: string
      hotelName: string
      balanceUnTransfer: number
      unBalance: string
    }
    // const columns = [
    //   {
    //     title: '酒店名称',
    //     dataIndex: 'hotelName'
    //   },
    //   {
    //     title: '待转账总金额',
    //     dataIndex: 'unBalance'
    //   },
    //   {
    //     title: '未结算',
    //     dataIndex: 'balanceUnTransfer'
    //   },
    //   {
    //     title: '已结算未转账',
    //     dataIndex: 'balanceUnTransfer'
    //   }
    // ]
    // const state = reactive({
    //   data: [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer']
    //     }
    //   ],
    //   order: 0,
    //   dataArr: [] as any
    // })
    // const params = {
    //   pageNum: 1,
    //   pageSize: 10
    // }

    // const dataArr: DataType[] = [
    //   // {
    //   //   key: '1',
    //   //   hotelName: 'John Brown',
    //   //   balanceUnTransfer: 32,
    //   //   unBalance: 'New York No. 1 Lake Park'
    //   // }
    // ]

    // const getInfo = await businessAiyoBillUntransfer(params){

    // }
    // const getInfo = async () => {
    //   const res = await businessAiyoBillUntransfer(params)
    //   state.order = res.order
    //   for (const k in res.data) {
    //     const obj: DataType = {
    //       key: '',
    //       hotelName: '',
    //       balanceUnTransfer: 0,
    //       unBalance: ''
    //     }
    //     obj.key = k
    //     obj.hotelName = res.data[k].hotelName
    //     obj.balanceUnTransfer = res.data[k].balanceUnTransfer
    //     obj.unBalance = '123'
    //     state.dataArr.push(obj)
    //   }
    //   console.log('dataArr', state.dataArr)
    // }
    // console.log('==============================', state.dataArr)
    // // // state.data = res.data
    // // 方法
    // getInfo()

    const columns = [
      {
        dataIndex: 'name', // 自定义列表头，则不能设置title属性
        align: 'left',
        slots: { title: 'customTitle' } // 在这里定义一个slots属性，并设置一个title属性
      }
    ]
    return {
      // ...toRefs(state),
      // 方法
      // dataArr,
      // data,
      columns
    }
  }
})
</script>