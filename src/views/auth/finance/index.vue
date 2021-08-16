<template>
  <div>
    <a-radio-group v-model:value="value" style="margin: 10px 0;">
      <a-radio-button value="1">总览</a-radio-button>
      <a-radio-button value="2">商户转账</a-radio-button>
    </a-radio-group>
    <finance-Overview v-if="value === '1'"></finance-Overview>
    <business-Transfer v-else-if="value === '2'"></business-Transfer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import financeOverview from './components/finance-overview.vue'
import businessTransfer from './components/business-transfer.vue'
export default defineComponent({
  components: {
    financeOverview,
    businessTransfer
  },
  setup() {
    const value = ref<string>('1')
    // 方法
    //watch监听
    // watch(
    //   () => activeKey,
    //   (val, oldValue) => {
    //     console.log('新的', val)
    //     console.log('旧的', oldValue)
    //   }
    // )
    return {
      value
      // 方法
    }
  }
})
</script>