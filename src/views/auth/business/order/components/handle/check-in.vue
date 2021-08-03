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
                    <a-col :span="6">产品房型:</a-col>
                    <a-col :span="18">
                        {{orderRoomMsg?.virtualRoomScale?.scaleName}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-row type="flex" align="middle">
                    <a-col :span="3">选择房间:</a-col>
                    <a-col :span="21">
                        <div class="s-room-item" :class="roomInParams.roomId === room.id ? 'active' : ''"
                             @click="roomInParams.roomId = room.id" v-for="room in options" :key="room.id">
                            {{room.roomSn}}
                        </div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">房费总额:</a-col>
                    <a-col :span="18">
                        {{orderRoomMsg?.roomRealAmount}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">支付方式:</a-col>
                    <a-col :span="18">
                        {{businessPayment[orderRoomMsg?.order?.payment] }}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">押金总额:</a-col>
                    <a-col :span="18">
                        {{orderRoomMsg?.deposit}}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" align="middle">
                    <a-col :span="6">支付方式:</a-col>
                    <a-col :span="18">
                        {{businessPayment[orderRoomMsg?.order?.depositPayment] }}
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-row type="flex" :gutter="[16]" align="middle">
                    <a-col :span="3">联系方式:</a-col>
                    <a-col :span="21">
                        <a-input style="width: 180px;" v-model:value="roomInParams.phone"
                                 placeholder="请输入联系方式"></a-input>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="24">
                <a-row type="flex" v-for="(item,index) in roomUser" :key="index" align="middle">
                    <a-col :span="3">入住人{{index+1}}:</a-col>
                    <a-col :span="21">
                        <a-button @click="removeUser(index)" type="link">删除</a-button>
                    </a-col>
                    <a-col :span="8">
                        <a-row type="flex" align="middle" justify="center">
                            <a-col :offset="4" :span="5">姓名：</a-col>
                            <a-col :span="14">
                                <a-input v-model:value="item.roomUser" placeholder="请输入姓名"></a-input>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="16">
                        <a-row type="flex" align="middle" justify="center">
                            <a-col :span="3">身份证：</a-col>
                            <a-col :span="21">
                                <a-input v-model:value="item.idCard" style="width: 180px"
                                         placeholder="请输入身份证"></a-input>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :offset="1" :span="24">
                <a-button @click="addUser" type="link">添加入住人</a-button>
            </a-col>

        </a-row>

    </a-modal>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, toRefs} from 'vue'
    import {Modal, Cascader, Row, Col, Input, notification, Button, Select, message} from "ant-design-vue";
    // import {useStore} from "@/store";
    import {businessRoomScaleByHotel, businessVirtualRoomScale, getBusinessRoomFree} from '@/api/system/hotel/room'
    import {postBusinessOrderroomRoomIn} from '@/api/system/order'
    import store from "@/store";
    import {OrderActions} from "@/store/modules/order/actions";
    import {getDict} from "@/hooks/dict-list";
    import {fromIcons} from "@/utils/dict";



    export default defineComponent({
        name: "check-in",
        components: {
            [Modal.name]: Modal,
            [Cascader.name]: Cascader,
            [Row.name]: Row,
            [Col.name]: Col,
            [Input.name]: Input,
            [Select.name]: Select,
            Option: Select.Option,
            [Button.name]: Button
        },
        props: {
            orderRoomMsg: {
                type: Object
            },
            callback: {
                type: Function
            }
        },
        setup(props) {
            const visible = ref<boolean>(true)

            const state = reactive({
                options: [] as any,
                businessPayment : ref<Object>({}),
                roomUser: [
                    {
                        roomUser: '',
                        idCard: ''
                    }
                ],
                roomInParams: {
                    roomId: '',
                    orderRoomId: props?.orderRoomMsg?.id,
                    orderId: props?.orderRoomMsg?.orderId,
                    phone: '',
                },
            })
            //获取订单房间状态
            const getDictFn = async ()=>{
                const data = await getDict('business_payment','businessOrderroomStatus',false)

                state.businessPayment =data
            }
            getDictFn()
            // const store = useStore()
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


            const removeUser = (index) => {
                if (state.roomUser.length === 1) {
                    message.error('请最少录入一个入住人')
                    return
                }
                state.roomUser.splice(index, 1)
            }

            const addUser = () => {
                state.roomUser.push({
                    roomUser: '',
                    idCard: ''
                })
            }

            const handleOk = () => {
                const params = {
                    roomUser: JSON.stringify(state.roomUser),
                    ...state.roomInParams
                }
                postBusinessOrderroomRoomIn(params).then(res => {
                    message.info(res.msg)
                    props?.callback?.()
                    setTimeout(() => {
                        visible.value = false
                    }, 2000)
                })
            }

            return {
                value: ref<string[]>([]),
                ...toRefs(state),
                visible,
                addUser,
                handleOk,
                removeUser
                // loadData
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
