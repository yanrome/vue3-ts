<template>
  <a-card class="g-search-card mb20">
    <a-button type="primary"
              style='margin-left: 10px;'
              @click="addItem">
      新增
    </a-button>
  </a-card>
  <a-card>
    <dynamic-table ref="tableRef"
                   :pageOption="pageOption"
                   rowKey="id"
                   :columns="columns(getDictFn())"
                   :get-list-func="businessHotelOtaAccountList">
    </dynamic-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Card, Button } from 'ant-design-vue'
import { AButton } from '@/components/button/'
import { SchemaForm } from '@/components/JSON-schema-form'
import { DynamicTable } from '@/components/dynamic-table'
import { toRefs } from '@vueuse/core'
import {
  businessHotelOtaAccountList,
  businessHotelOtaAccountAdd
} from '@/api/system/hotel/ota'
import { columns } from './columns'
import { getDict } from '@/hooks/dict-list'
import moment from 'moment'
import { useFormModal } from '@/hooks'
import { formModal } from '@/views/auth/hotel/ota/form-modal'
import { getBusinessHotelList } from '@/api/system/hotel/index'
import { transFormStr } from '@/utils/common'

export default defineComponent({
  name: '会员等级',
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    SchemaForm,
    AButton,
    DynamicTable
  },
  setup() {
    const tableRef = ref<any>(null)
    let state = reactive({
      pageOption: {},
      status: {},
      otaSourceObj: {},
      hotelObj: {}
    })

    // 新增
    const addItem = () => {
      useFormModal({
        title: '新增',
        formSchema: formModal(''),
        handleOk: async (data) => {
          data.otaSource = data.otaSourceName
          data.otaSource = data.otaSourceName
          data.hotelId = data.hotelName
          data.hotelName = state.hotelObj[data.hotelId]
          data.otaSourceName = state.otaSourceObj[data.otaSourceName]
          await businessHotelOtaAccountAdd(data)
          tableRef.value.refreshTableData()
        }
      })
    }

    // 字典查询
    const otaSource = async () => {
      state.otaSourceObj = await getDict('business_ota_source', '', false)
      let res = await getBusinessHotelList('')
      res.data.map((item) => {
        state.hotelObj[item.id] = item.hotelName
      })
    }
    otaSource()

    // 字典查询
    const getDictFn = async () => {
      let businessOtaStatus = await getDict(
        'business_ota_relation_status',
        '',
        false
      )
      return {
        businessOtaStatus
      }
    }
    getDictFn()

    return {
      ...toRefs(state),
      tableRef,
      //   方法
      addItem,
      businessHotelOtaAccountList,
      columns,
      getDictFn
    }
  }
})
</script>

<style scoped>
</style>
