<template>
    <div class="g-main flex-bet z-flex-align">
        <div class="m-more-left" >
        <div class="g-top">
            <div class="top-item">日期</div>
            <div class="top-item" v-for="day in date" :key="day.day">
                <p>{{day.day}}</p>
                <p>{{day.week}}</p>
            </div>
        </div>
        <div class="g-top  z-mt10" v-for="rooms in room" :key="rooms.roomScaleName">
            <!--  基础房型              -->
            <div class="m-room-item">
                <div class="top-item">{{rooms.roomScaleName}}</div>
                <div class="top-item" v-for="item in rooms.value[0].roomStates">
                    <p>{{item.roomCount -item.roomBook}} / {{item.roomCount}}</p>
                </div>
            </div>
            <!--   产品房型         -->
            <div class="m-room-item" v-for="roomScale in rooms.value">
                <div class="top-item">{{roomScale.scaleName}}</div>
                <div class="top-item" @click="open({id:roomScale.roomScaleId,title:'修改房态房价'})" v-for="item in roomScale.stateAndPrice">
                    <a-tooltip :title="item.day">
                    <div class="s-num">{{(item.maxSaleCount - item.virtualRoomBook) < (item.roomCount - item.roomBook) ?
                        (item.maxSaleCount - item.virtualRoomBook) : (item.maxSaleCount - item.virtualRoomBook)}} 间 </div>
                    <div class="s-price">{{item.realAmount}}</div>
                    <div style="opacity: 0"> {{item.day}}</div>
                    </a-tooltip>
                </div>
            </div>
        </div>
        </div>
<!--        <div class="m-more" >查看更多</div>-->
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs, watch} from 'vue'
    import {useStore} from "@/store";
    import {getRoomStatePriceByHotel} from '@/api/system/hotel/room'
    import {dataConversion} from './utils'
    import {open} from "@/views/auth/room-state/price/openModal";
    import {Card,Tooltip, Checkbox, Space} from "ant-design-vue";
    import searchGroup from "@/views/auth/room-state/state/search-group.vue";

    export default defineComponent({
        name: "index",
        components: {
            [Card.name]: Card,
            [Tooltip.name]:Tooltip
        },
        setup() {
            const state = reactive({
                statePrice: [] as any,
                date: [],
                room: [] as any
            })
            const store = useStore()
            const getStatePrice = async () => {
                const params = {
                    hotelId: store.getters.hotelId,
                    pageNum: 1,
                    pageSize: 10
                }
                const {data} = await getRoomStatePriceByHotel(params)
                const {date, room} = dataConversion(data)
                state.date = date
                state.room = room
                state.statePrice = data
            }
            getStatePrice()

            //watch监听
            watch(() => store.getters.hotelId, (val) => {
                getStatePrice()
            })

            return {
                ...toRefs(state),
                open
            }
        },

    })
</script>

<style lang="scss" scoped>
    .element::-webkit-scrollbar {
        width: 0 !important
    }

    .g-main {
        overflow-x: auto;
        white-space: nowrap;

        /*background: #ffffff;*/
        .m-more{
            display: inline-block;
            vertical-align: middle;
            width: 10px;
        }
        .m-more-left{
            display: inline-block;
        }

    }

    .g-top {
        margin-top: 10px;
        width: auto;
        background: #ffffff;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
            display: none;
        }

        .m-room-item {
            background: #ffffff;
        }

        .top-item {
            display: inline-block;
            width: 150px;
            overflow: hidden;
            vertical-align: middle;
            text-align: center;
            padding: 0 12px;
            background: #ffffff;
            .s-num{
                color: #0091FF;
                padding-top: 8px;
            }
            .s-price{
                padding-bottom: 8px;
            }
            p{
                padding: 12px 0;
                margin-bottom: 0;
            }
        }
    }

</style>
