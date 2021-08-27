<template>
  <search-group @callback="callback"></search-group>
  <a-card class="g-hotel-room z-mt18  ">
    <div class="s-card-group">
      <div class="z-mt10"
           v-for="(floor,key) in hotelRoom"
           :key="key">
        <div>{{key}} F</div>
        <a-card class="s-card"
                :bodyStyle="{padding:'6px'}"
                v-for="item in floor"
                :key="item.id"
                :style="'background:' + item.color">
          <p>{{item.roomSn}}</p>
          <p style="font-size: 12px">{{item.roomScale.scaleName}}</p>
          <p class="s-card-p"
             :style="'color:' + item.color">{{item.txt}}</p>
        </a-card>
      </div>

    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs, onMounted } from 'vue'
import { Card, Checkbox, Space } from 'ant-design-vue'
import { useStore } from '@/store'
import searchGroup from './search-group.vue'
import { getBusinessRoomByHotel } from '@/api/system/hotel/room'
import { statusColor, statusTxt } from '@/utils/dict'

export default defineComponent({
  name: 'index',
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [Space.name]: Space,
    searchGroup
  },
  setup() {
    const state = reactive({
      hotelRoom: [] as any
    })

    const store = useStore()
    const getHotelRoom = async (param: object = {}) => {
      const params = {
        hotelId: store.getters.hotelId
      }
      param = Object.assign(param, params)
      const { data } = await getBusinessRoomByHotel(param)
      const floor = {}
      data.forEach((item) => {
        item.color = statusColor[item.status]
        item.txt = statusTxt[item.status]
        floor[item.floor] !== undefined
          ? floor[item.floor].push(item)
          : (floor[item.floor] = [item])
      })
      console.log('floor =====', floor)
      state.hotelRoom = floor
    }
    getHotelRoom()

    const callback = (data) => {
      let params = JSON.parse(JSON.stringify(data))
      // params.status = params.status.join(',')
      getHotelRoom(params)
      console.log(data)
    }

    //watch监听
    watch(
      () => store.getters.hotelId,
      (val) => {
        getHotelRoom()
      }
    )

    return {
      ...toRefs(state),
      callback
    }
  }
})
</script>

<style lang="scss" scoped>
.g-hotel-room {
  width: 100%;

  .s-card-group {
    flex-wrap: wrap;
    .s-card {
      position: relative;
      display: inline-block;
      width: 150px;
      height: 100px;
      padding: 0;
      margin: 0 8px 8px 0;
      color: #fff;
      vertical-align: middle;
      border-radius: 8px;

      .s-card-p {
        position: absolute;
        bottom: 12px;
        left: 6px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #fff;
        border-radius: 4px;
      }

      p {
        margin: 0;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
