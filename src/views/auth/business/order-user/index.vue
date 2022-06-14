<template>
  <a-card>
    <dynamic-table ref="tableRef"
                   :pageOption="pageOption"
                   rowKey="id"
                   :columns="columns()"
                   :get-list-func="getBusinessOrderRoomUserByHotel">
    </dynamic-table>
  </a-card>
</template>

<script lang="ts">
  import {defineComponent, reactive, ref, watch} from 'vue'
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
import { getBusinessOrderRoomUserByHotel} from "@/api/system/order/order-user";
import { transFormStr } from '@/utils/common'
import {useStore} from "@/store";

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
    const store = useStore()
    const tableRef = ref<any>(null)
    let state = reactive({
      pageOption: {
        hotelId:store.getters.hotelId,
      },
      status: {},
      otaSourceObj: {},
      hotelObj: {}
    })



    watch(() => store.getters.hotelId, (val) => {
      state.pageOption.hotelId = val
    })



    return {
      ...toRefs(state),
      tableRef,
      //   方法
      getBusinessOrderRoomUserByHotel,
      columns,
    }
  }
})
</script>

<style scoped>
</style>
