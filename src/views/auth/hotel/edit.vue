<template>
    <a-card class="min">
        <a-form ref="formRef" :colon="false" :labelAlign="'right'" :model="hotelMassage" :rules="rules">
            <a-form-item label="酒店名称" name="hotelName">
                <a-input style="width: 300px" v-model:value="hotelMassage.hotelName" placeholder="请输入酒店名称"/>
            </a-form-item>
            <a-form-item label="电话" name="phone">
                <a-input style="width: 300px" v-model:value="hotelMassage.phone" placeholder="请输入联系电话"/>
            </a-form-item>
            <a-form-item label="酒店地址">
                <a-space>
                    <a-cascader style="width: 300px" v-model:value="pcaList"
                                :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
                                placeholder="请选择省市区"
                                :options="options"></a-cascader>
                    <a-input style="width: 300px" v-model:value="hotelMassage.location" placeholder="请输入详细地址"/>
                </a-space>

            </a-form-item>
            <a-form-item label="经纬度" >
                <a-form :labelAlign="'left'" class="sub-form"  layout="inline">
                    <a-form-item label="经度" >
                        <a-input style="width: 150px" v-model:value="hotelMassage.longitude" placeholder="请输入经度"/>
                    </a-form-item>
                    <a-form-item label="纬度" >
                        <a-input style="width: 150px" v-model:value="hotelMassage.latitude" placeholder="请输入纬度"/>
                    </a-form-item>

                </a-form>
            </a-form-item>
            <a-form-item label="开业时间" >
                <a-date-picker  v-model:value="hotelMassage.opening" placeholder="选择开业时间"></a-date-picker>
            </a-form-item>
            <a-form-item label="装修时间" >
                <a-date-picker  v-model:value="hotelMassage.decoration" placeholder="选择开业时间" ></a-date-picker>
            </a-form-item>
            <a-form-item label="酒店介绍" >
                <a-textarea
                        style="width: 650px"
                        v-model:value="hotelMassage.description"
                        placeholder="酒店详情"
                        :auto-size="{ minRows: 5, maxRows: 7 }"
                />
            </a-form-item>
            <h3>政策信息</h3>
            <a-form-item label="入离时间" >
                <div>
                    <a-time-picker v-model:value="roomTime" format="HH:mm" />后办理入住，
                    离店请于<a-time-picker v-model:value="leaveTime" format="HH:mm" />前办理退房
                </div>
            </a-form-item>
            <a-form-item label="订单取消时间" >
                    <a-time-picker v-model:value="cancelTime" format="HH:mm" />
            </a-form-item>
            <a-form-item label="免费延时时间" >
                <a-input-number v-model:value="hotelMassage.delayMin" ></a-input-number>
            </a-form-item>
            <a-form-item label=" " >
                <a-button @click="saveRef">保存</a-button>
            </a-form-item>
<!--            <h3>收款信息</h3>-->
<!--            <a-form-item label="微信收款账户" >-->
<!--                <a-input style="width: 300px" v-model:value="hotelMassage.phone" placeholder="请输入联系电话"/>-->
<!--            </a-form-item>-->
<!--            <a-form-item label="支付宝收款账户" >-->
<!--                <a-input style="width: 300px" v-model:value="hotelMassage.phone" placeholder="请输入联系电话"/>-->
<!--            </a-form-item>-->
        </a-form>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, computed, ref, reactive,} from 'vue'
    import {Card, Form, Cascader, Space, DatePicker, TimePicker, InputNumber, message} from "ant-design-vue";
    import options from 'china-division/dist/pca-code.json';
    import list from "ant-design-vue/es/transfer/list";
    import moment from 'moment'
    import {toRefs} from "@vueuse/core";
    import {postHotelEdit} from "@/api/system/hotel";

    export default defineComponent({
        name: "edit",
        components: {
            [Card.name]: Card,
            [Form.name]: Form,
            [Cascader.name]: Cascader,
            [Space.name]: Space,
            [InputNumber.name]: InputNumber,
            [DatePicker.name]:DatePicker,
            [TimePicker.name]:TimePicker,
            [Form.Item.name]: Form.Item
        },
        props: {
            hotelMsg: {
                type:Object,
                default: {}
            }
        },
        emits:['success'],
        setup(props,{emit}) {
            console.log('props',props.hotelMsg)

            let hotelMassage = JSON.parse(JSON.stringify(props.hotelMsg))
            const state = reactive({
                hotelMassage:hotelMassage
            })
            const formData = reactive({
                roomTime : ref( moment(hotelMassage.roomTime,"HH:mm")),
                leaveTime:ref( moment(hotelMassage.leaveTime,"HH:mm")),
                cancelTime:ref( moment(hotelMassage.cancelTime,"HH:mm")),

            })

            const rules = {
                hotelName: [
                    {required: true, message: '请输入酒店名称', trigger: 'blur'},
                ],
                phone: [
                    {required: true, message: '请输入联系电话', trigger: 'blur'},
                ]
            }

            const pcaList = computed({
                get() {
                    if (hotelMassage) {
                        return [hotelMassage.province, hotelMassage.city, hotelMassage.county]
                    }
                },
                set(val: Object) {
                    if (val && hotelMassage) {
                        hotelMassage.province = val[0]
                        hotelMassage.city = val[1]
                        hotelMassage.county = val[2]
                    }
                }
            })

            const saveRef = ()=>{
                let obj = {
                    id:hotelMassage.id,
                    hotelName:hotelMassage.hotelName,
                    phone:hotelMassage.phone,
                    province:hotelMassage.province,
                    city:hotelMassage.city,
                    county:hotelMassage.county,
                    location:hotelMassage.location,
                    longitude:hotelMassage.longitude,
                    latitude:hotelMassage.latitude,
                    description:hotelMassage.description,
                    delayMin:hotelMassage.delayMin,
                    roomTime : moment(formData.roomTime).format('HH:mm'),
                    leaveTime : moment(formData.leaveTime).format('HH:mm'),
                    cancelTime : moment(formData.cancelTime).format('HH:mm'),
                    decoration:moment(hotelMassage.decoration).format('YYYY-MM-DD'),
                    opening:moment(hotelMassage.opening).format('YYYY-MM-DD'),
                }
                postHotelEdit(obj).then(res=>{
                    if(res.ret){
                        message.info('操作成功')
                        emit('success',obj)
                    }
                })
            }


            return {
                ...toRefs(formData),
                ...toRefs(state),
                rules,
                options,
                saveRef,
                pcaList
            }
        },
    })
</script>

<style lang="scss" scoped>
    ::v-deep(.ant-form-item-label) {
        width: 80px;
        margin-right: 10px;
    }

    .sub-form{
        ::v-deep(.ant-form-item-label) {
            width: 40px;
        }
    }
</style>
