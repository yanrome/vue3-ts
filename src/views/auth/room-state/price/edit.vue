<template>
    <a-modal width="750px" v-model:visible="visible" ok-text="保存" @ok="handleOk">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="修改房态">
                <a-form >
                    <a-form-item name="statusTime" :labelCol="{span:3}" label="选择日期：">
                        <a-range-picker v-model:value="statusTime" :valueFormat="'YYYY-MM-DD'"></a-range-picker>
                    </a-form-item>
                    <a-form-item :labelCol="{span:3}" label="选择状态：">
                        <a-radio-group name="week" v-model:value="isOpen">
                            <a-radio :value="0">开房</a-radio>
                            <a-radio :value="1">关房</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item v-if="isOpen === 0" :labelCol="{span:3}" label="输入房量：">
                        <a-input-number
                                placeholder="请输入房间量"
                                style="width: 180px"
                                :precision="0"
                                v-model:value="roomNum"
                        />
                    </a-form-item>

                </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="修改房价">
                <a-form>
                    <a-form-item :labelCol="{span:3}" label="选择日期：">
                        <a-range-picker v-model:value="time" :valueFormat="'YYYY-MM-DD'"></a-range-picker>
                    </a-form-item>
                    <a-form-item v-if="showTypes.batch" :labelCol="{span:3}" label="周末价：">
                        <a-radio-group name="week" v-model:value="week">
                            <a-radio :value="0">不区分</a-radio>
                            <a-radio :value="1">区分周末价</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item :labelCol="{span:3}" label="价格：">
                        <a-input-number
                                style="width: 180px"
                                :precision="2"
                                v-model:value="price"
                                :formatter="value => `${value}元`"
                                :parser="value => value.replace('元', '')"
                        />
                    </a-form-item>
                    <a-form-item v-if="week === 1 " :labelCol="{span:3}" label="周末价：">
                        <a-input-number
                                style="width: 180px"
                                :precision="2"
                                v-model:value="weekPrice"
                                :formatter="value => `${value}元`"
                                :parser="value => value.replace('元', '')"
                        />
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>

    </a-modal>
</template>

<script lang="ts">
    import {defineComponent, ref, reactive, toRefs, watch} from 'vue'
    import {Modal, Tabs, Form, DatePicker, InputNumber, Radio} from "ant-design-vue";
    import {postBusinessRoomScaleStateBatch,postBusinessRoomPriceAddAndEdit} from "@/api/system/hotel/room";

    export default defineComponent({
        name: "check-in",
        components: {
            [Modal.name]: Modal,
            [Tabs.name]: Tabs,
            [Form.name]: Form,
            [Radio.name]: Radio,
            [Radio.Group.name]: Radio.Group,
            [InputNumber.name]: InputNumber,
            aFormItem: Form.Item,
            aTabPane: Tabs.TabPane,
            aRangePicker: DatePicker.RangePicker
        },
        props: {
            id: Number
        },
        setup(props) {
            const state = reactive({
                activeKey: ref('1'),
                visible: ref<boolean>(true),
                price: ref<number>(),
                weekPrice: ref<number>(),
                week: ref<number>(0),
                isOpen: ref<number>(0),
                time: ref<Object[]>([]),
                statusTime: ref<Object[]>([]),
                roomNum: ref<number>(),
                showTypes: {
                    batch: true,
                    showNumber: true
                }
            })

            const handleOk = () => {
                switch (state.activeKey) {
                    case "1":
                        stateEdit()
                        break
                    case '2':
                        priceEdit()
                        break
                    default:
                        break
                }
            }

            //房型修改
            const stateEdit = async () => {
                let params = {
                    roomScaleId: props.id,
                    maxSaleRoom: state.isOpen ? -1 : state.roomNum,
                }
                let [time, stu] = [{}, '']
                if (state.statusTime[0] === state.statusTime[1]) {  //单个修改
                    time = {
                        priceDate: state.statusTime[0],
                        realAmount:state.price
                    }
                    stu = 'state/edit'
                } else {  //批量修改
                    time = {
                        startTime: state.statusTime[0],
                        endTime: state.statusTime[1],
                    }
                    stu = 'state/batch/add'
                }
                params = Object.assign(params, time)
                const {ret} = await postBusinessRoomScaleStateBatch(params, stu)
            }

            //日历房价修改
            const priceEdit = async () => {
                let params = {
                    roomScaleId: props.id,
                    maxSaleRoom: state.isOpen ? -1 : state.roomNum,
                }
                let [time, stu] = [{}, '']
                if (state.time[0] === state.time[1]) {
                    time = {
                        stateDate: state.time[0],
                    }
                    stu = 'edit'
                } else {
                    time = {
                        startTime: state.time[0],
                        endTime: state.time[1],
                    }
                    let price = {}
                    if(state.week === 1){
                        price = {
                            dayAmount:state.price,
                            weekDayAmount:state.weekPrice
                        }
                    }else {
                        price = {
                            realAmount:state.price
                        }
                    }
                    time =  Object.assign(time,price)
                    stu = 'batch/add'
                }
                params = Object.assign(params, time)
                const {ret} = await postBusinessRoomPriceAddAndEdit(params, stu)
            }

            watch(() => state.time, (val) => {
                state.showTypes.batch = val[0] !== val[1]
            })
            watch(() => state.isOpen, (val) => {
                state.showTypes.showNumber = val === 0
            })


            return {
                ...toRefs(state),
                handleOk
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

    .text-indent {
        text-indent: 2em;
    }
</style>
