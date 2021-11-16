<template>
<a-card>
    <a-form ref="formRef"
            :label-col="{ span: 5 }"
            :colon="false"
            :labelAlign="'center'"
            :model="orderEntry">
        <a-form-item label="入住离店时间">
            <a-range-picker v-model:value="rangeTime"
                            style="width: 550px"
                            @change="ChooseTime"
                            :disabled-date="disabledDate"
                            :valueFormat="'YYYY-MM-DD'" />
        </a-form-item>
        <a-form-item label="选择房型">
            <a-cascader class="s-cascader"
                        style="width: 550px"
                        v-model:value="roomValue"
                        :options="roomOptions"
                        :load-data="loadData"
                        @change="roomChange"
                        placeholder="基础房型/产品房型"
            ></a-cascader>
        </a-form-item>
        <a-form-item label="订单来源">
            <a-select style="width: 300px"  v-model:value="orderEntry.orderSource" >
                <template v-for="option in getFn"
                          :key="option.dictValue">
                    <Option :value="option.dictValue">
                        {{ option.dictLabel }}
                    </Option>
                </template>
            </a-select>
        </a-form-item>
        <a-form-item label="外部平台订单号">
            <a-input style="width: 300px" placeholder="请输入入住人(哎哟有房订单不输入)" v-model:value="orderEntry.externalOrderSn"></a-input>
        </a-form-item>
        <a-form-item label="入住人">
            <a-input style="width: 300px" placeholder="请输入入住人" v-model:value="orderEntry.roomUser"></a-input>
        </a-form-item>
        <a-form-item label="联系电话">
            <a-input style="width: 300px" placeholder="请输入联系电话" v-model:value="orderEntry.phone"></a-input>
        </a-form-item>
        <a-form-item label="房费总价">
            <a-input style="width: 300px" placeholder="请输入房费总价" v-model:value="orderEntry.realAmount"></a-input>
        </a-form-item>
        <a-form-item label="支付方式">
            <a-select style="width: 300px"  v-model:value="orderEntry.payment" >
                <template v-for="option in businessPayment"
                          :key="option.dictValue">
                    <Option :value="option.dictValue">
                        {{ option.dictLabel }}
                    </Option>
                </template>
            </a-select>
        </a-form-item>
        <a-form-item label="延迟退房">
            <a-radio-group v-model:value="orderEntry.delayTime">
                <a-radio :value="0">
                    不延迟
                </a-radio>
                <a-radio :value="1">
                    延迟
                </a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="是否免押">
            <a-radio-group v-model:value="noDeposit">
                <a-radio :value="0">
                    不免押入住
                </a-radio>
                <a-radio :value="1">
                    免押入住
                </a-radio>

            </a-radio-group>
        </a-form-item>
        <a-form-item label="房间数量">
            <a-input-number v-model:value="orderEntry.roomNum" min="1"></a-input-number>
        </a-form-item>
        <a-form-item label=" ">
            <a-button @click="submit" type="primary">提交</a-button>
        </a-form-item>
    </a-form>
</a-card>
</template>

<script lang="ts">
    import {defineComponent, reactive, ref, watch} from 'vue'
    import {Card, Cascader, DatePicker, Form, Select,message,Radio,InputNumber,Button} from "ant-design-vue";
    import {toRefs} from "@vueuse/core";
    import store, {useStore} from "@/store";
    import {
        businessRoomScaleStateByHotel,
        businessVirtualStateRoomScale
    } from "@/api/system/hotel/room";
    import {postBusinessOrderExternalSyn} from "@/api/system/order";
    import moment, {Moment} from "moment";
    import {DictActions} from "@/store/modules/dict/actions";

    export default defineComponent({
        name: "index",
        components:{
            [Card.name]: Card,
            [Form.name]: Form,
            [Select.name]: Select,
            [Button.name]: Button,
            [InputNumber.name]: InputNumber,
            [Select.Option.name]: Select.Option,
            [Cascader.name]: Cascader,
            [Radio.name]: Radio,
            [Radio.Group.name]: Radio.Group,
            aRangePicker: DatePicker.RangePicker
        },
        setup(){
            const store = useStore()
            const  disabledDate =(current)=> {
                let subNum = moment().hour() < 9 ? 2 : 1
                return current && current < moment().subtract(subNum, 'days').endOf('day');
            }

            const state = reactive({
                rangeTime: ref<Moment[]>([]),
                roomValue :  ref<string[]>([]),
                roomScale : ref([]),
                getFn:ref(),
                businessPayment:ref(),
                selectedOptions:ref(),
                noDeposit:0,
                orderEntry: {
                    hotelId:store.getters.hotelId,
                    roomScaleId:'',
                    virtualRoomScaleId:'',  //产品房型id
                    orderType:'1',// 订单类型(1.日租 3.长租 4.短租)
                    orderSource:'',  //订单来源
                    delayTime: 0, // 是否延时退房
                    deposit: 0,  // 押金
                    externalOrderSn: '',
                    roomUser: '',
                    roomNum: 1,
                    phone: '',
                    realAmount: '',
                    payTimeType:1,
                    payment:"10"
                },
                roomOptions: ref<[]>([])
            })

            //获取数据字典
            const getDictFn = async () => {
                const orderSource = await store.dispatch(DictActions.getDict,{dictType:'business_order_source'})
                const businessPayment = await store.dispatch(DictActions.getDict,{dictType:'business_payment'})
                state.getFn = orderSource
                state.businessPayment = businessPayment
            }
            getDictFn()

            // 选择时间-处理
            const ChooseTime = (time) => {
                state.rangeTime = time
                getRoomScale()
            }

            //获取基础房型
            const getRoomScale = async () =>{
                const {data} = await businessRoomScaleStateByHotel({hotelId:store.getters.hotelId,startTime:state.rangeTime[0],endTime:state.rangeTime[1]})
                state.roomOptions = data.map(item => {
                    return {
                        value: item.id,
                        freeNum:item.freeNum,
                        label:` ${item.scaleName} (${item.freeNum})` ,
                        isLeaf:false,
                    }
                })
            }

            //选择基础房型
            const roomScaleChange = (val) =>{
                // state.orderEntry.roomScaleId = val
            }

            //获取产品房型
            const loadData = async (selectOptions)=>{
                const targetOption = selectOptions[selectOptions.length - 1];
                targetOption.loading = true;
                const param = {
                    hotelId: store.getters.hotelId,
                    roomScaleId:targetOption.value,
                    startTime:state.rangeTime[0],
                    endTime:state.rangeTime[1]
                }
                if(selectOptions.freeNum < 1) {
                    message.error('房间数量不足')
                    return
                }
                const {data} = await businessVirtualStateRoomScale(param)
                targetOption.loading = false;
                targetOption.children =data.filter(item=>item.freeNum).map(item=>{
                    return {
                        value: item.id,
                        label: item.scaleName + `(${item.freeNum})`,
                        ...item
                    }
                })
            }

            //选择产品房型
            const roomChange = (val,selectedOptions)=>{
                state.selectedOptions = selectedOptions[1]
                state.orderEntry.roomScaleId = val[0],
                state.orderEntry.virtualRoomScaleId= val[1]
            }

            //提交
            const submit =  ()=>{
                if(!state.selectedOptions){
                    message.error('请选择房型')
                    return
                }
                if(!state.orderEntry.orderSource){
                    message.error('请选择订单来源')
                    return
                }
                let duration = moment(state.rangeTime[1]).diff(moment(state.rangeTime[0]), 'days')
                let obj= {
                    deposit: state.noDeposit === 0 ? state.selectedOptions.deposit : 0,
                    startTime:state.rangeTime[0],
                    endTime:state.rangeTime[1],
                    diffDay: duration
                }
                const params = Object.assign({...state.orderEntry},obj)
                console.log(params)
                postBusinessOrderExternalSyn(params).then(res=>{
                    if(res.ret === 1){
                        message.info('操作成功')
                        setTimeout(()=>{
                            state.orderEntry = Object.assign(state.orderEntry,{
                                hotelId:store.getters.hotelId,
                                orderSource:'',  //订单来源
                                delayTime: 0, // 是否延时退房
                                deposit: 0,  // 押金
                                externalOrderSn: '',
                                roomUser: '',
                                roomNum: 1,
                                phone: '',
                                realAmount: '',
                                payTimeType:1,
                                payment:"10"
                            })
                        },2000)

                    }
                })

            }

            //watch监听
            watch(() => store.getters.hotelId, (val) => {
                state.orderEntry.roomScaleId = ''
                state.orderEntry.hotelId = val
                getRoomScale()
            })

            return {
                ...toRefs(state),
                disabledDate,
                ChooseTime,
                loadData,
                roomChange,
                roomScaleChange,
                submit
            }
        },
    })
</script>

<style scoped>

</style>
