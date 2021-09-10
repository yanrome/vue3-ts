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
                   :columns="columns('')"
                   :get-list-func="businessMemberLevelTemplateAll">
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
  businessMemberLevelTemplateAll,
  businessMemberLevelTemplateAdd
} from '@/api/system/hotel/member'
import { columns } from './columns'
import { getDict } from '@/hooks/dict-list'
import moment from 'moment'
import { useFormModal } from '@/hooks'
import { formModal } from '@/views/auth/hotel/member/form-modal'
import { transFormStr } from '@/utils/common'
import { DictActions } from '@/store/modules/dict/actions'

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
      status: {}
    })

    // 新增
    const addItem = () => {
      useFormModal({
        title: '新增',
        formSchema: formModal(''),
        handleOk: async (data) => {
          await businessMemberLevelTemplateAdd(data)
          tableRef.value.refreshTableData()
        }
      })
    }

    return {
      ...toRefs(state),
      tableRef,
      //   方法
      addItem,
      businessMemberLevelTemplateAll,
      columns
    }
  }
})
</script>

<style scoped>
</style>
