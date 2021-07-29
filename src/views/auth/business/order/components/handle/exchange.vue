<template>
    <a-modal width="900px" v-model:visible="visible" @ok="handleOk">

        <a-row type="flex" align="middle" :gutter="[0,16]">
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">基础房型:</a-col>
                    <a-col :span="18">
                        {{orderRoomMsg?.roomScale?.scaleName}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">房型:</a-col>
                    <a-col :span="18">
                        {{orderRoomMsg?.virtualRoomScale?.scaleName}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">房型:</a-col>
                    <a-col :span="18">
                        <a-cascader class="s-cascader" v-model:value="roomValue"
                                    :options="roomOptions"
                                    :load-data="loadData"
                                    @change="roomChange"
                                    placeholder="基础房型/产品房型"
                        ></a-cascader>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-row type="flex" align="middle">
                    <a-col :span="3">选择房间:</a-col>
                    <a-col :span="21">
                        <div class="s-room-item" :class="orderRoomMsg.roomId === room.id ? 'active' : ''"
                             @click="orderRoomMsg.roomId = room.id" v-for="room in options" :key="room.id">
                            {{room.roomSn}}
                        </div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

    </a-modal>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive,watch, toRefs} from 'vue'
    import {Modal, Row, Col, notification, message,Cascader} from "ant-design-vue";
    import store from "@/store";
    import {OrderActions} from "@/store/modules/order/actions";
    import {postOrderRoomChange} from '@/api/system/order'
    import {businessRoomScaleByHotel, businessVirtualRoomScale, getBusinessRoomFree} from '@/api/system/hotel/room'
    interface Option {
        value: string;
        label: string;
        loading?: boolean;
        isLeaf?: boolean;
        children?: Option[];
    }
    export default defineComponent({
        name: "check-in",
        components: {
            [Modal.name]: Modal,
            [Row.name]: Row,
            [Col.name]: Col,
            [Cascader.name]: Cascader,

        },
        props: {
            orderRoomMsg: {
                type: Object
            }
        },
        setup(props) {
            const visible = ref<boolean>(true)
            const roomValue =  ref<string[]>([props?.orderRoomMsg?.roomScaleId,props?.orderRoomMsg?.virtualRoomScaleId])
            const state = reactive({
                options:[] as any,
                roomOptions: ref<Option[]>([])
            })

            const getBusinessRoom = async (params= {}) =>{
                const param = {
                    virtualRoomScaleId: props?.orderRoomMsg?.virtualRoomScaleId
                }
                Object.assign(param,params)
                store.dispatch(OrderActions.getBusinessRoom,param).then(data=>{
                    state.options = data
                    if (!data.length) {
                        // setTimeout(() => visible.value = false, 2000)
                        notification.error({
                            message: "操作失败",
                            description: '当前没有空闲房间，请选择其他房型或者先打扫完成'
                        })
                    }
                })
            }
            getBusinessRoom()

            //办理退房
            const handleOk = () =>{
                const params = {
                    orderRoomId:props?.orderRoomMsg?.id
                }
                postOrderRoomChange(params).then(res=>{
                    setTimeout(() => {
                        message.info(res.msg)
                        visible.value = false
                    }, 2000)
                })
            }

            //获取基础房型
            const getRoomScale = async () => {
                const param = {
                    hotelId: store.getters.hotelId
                }
                const {data} = await businessRoomScaleByHotel(param)
                state.roomOptions = data.map(item => {
                    return {
                        value: item.id,
                        label: item.scaleName,
                        isLeaf:false
                    }
                })
            }
            getRoomScale()

            //获取产品房型
            const loadData = async (selectOptions)=>{
                const targetOption = selectOptions[selectOptions.length - 1];
                targetOption.loading = true;
                const param = {
                    hotelId: store.getters.hotelId,
                    roomScaleId:targetOption.value,
                    diffDay:props?.orderRoomMsg?.order.diffDay
                }
                const {data} = await businessVirtualRoomScale(param)
                targetOption.loading = false;
                targetOption.children =data.filter(item=>item.freeNum).map(item=>{
                    return {
                        value: item.id,
                        label: item.scaleName + `(${item.freeNum})`,
                    }
                })
            }

            //级联选择，搜索空余房间
            const roomChange=(val)=>{
                if(val.length<2) return
                getBusinessRoom({virtualRoomScaleId:val[1]})
            }

            return {
                roomValue,
                ...toRefs(state),
                visible,
                loadData,
                handleOk,
                roomChange
            }
        },


    })
</script>

<style lang="scss" scoped>
    .s-room-item {
        border: 1px solid #D4D4D4;
        cursor: pointer;
        border-radius: 2px;
        display: inline-block;
        margin: 6px;
        width: 102px;
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
    }

    .active {
        border: 1px solid #1890FF;
        position: relative;

        &:after {
            position: absolute;
            content: '√';
            width: 18px;
            height: 18px;
            background: #1890FF;
            color: #ffffff;
            border-radius: 50%;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            top: 11px;
            right: 11px;
        }
    }
</style>
