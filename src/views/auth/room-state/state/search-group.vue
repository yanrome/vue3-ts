<template>
    <a-card>
        <a-space :size="20">
<!--            <a-radio-->
<!--                    v-model:checked="checkAll"-->
<!--                    :indeterminate="indeterminate"-->
<!--                    @change="onCheckAllChange"-->
<!--            >-->
<!--                所有房间-->
<!--            </a-radio>-->
<!--            <a-radio-->
<!--                    name="radio"-->
<!--                    v-model:value="searchData.status"-->
<!--                    @change="onCheckAllChange"-->
<!--            >-->
<!--                所有房间-->
<!--            </a-radio>-->
<!--            <a-radio-group name="radio" v-model:value="searchData.status" :options="plainOptions"/>-->
            <a-radio-group @change="onCheckAllChange" v-model:value="searchData.status">
                <a-radio-button value="">全部房型</a-radio-button>
                <a-radio-button v-for="item in plainOptions" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
            </a-radio-group>
        </a-space>
        <div class=" g-search-input">
            <a-row type="flex" align="middle" :gutter="[72,16]">
                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <a-row type="flex" align="middle">
                        <a-col :span="6">房间类型:</a-col>
                        <a-col :span="18">
                            <a-select v-model:value="searchData.roomType" placeholder="请选择" style="width: 100%">
                                <Option v-for="item in businessOrderType" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </a-select>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <a-row type="flex" align="middle">
                        <a-col :span="6">门锁状态:</a-col>
                        <a-col :span="18">
                            <a-select v-model:value="searchData.lockStatus" placeholder="请选择" style="width: 100%">
                                <Option  :value="0">在线</Option>
                                <Option  :value="1">离线</Option>
                            </a-select>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
                    <a-button @click="reset">重置</a-button>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent, reactive, watch, toRefs, ref} from 'vue'
    import {Card, Radio, Col, Input, Row, Space,Select} from "ant-design-vue";
    import {getDict} from "@/hooks/dict-list";
    const status = {
        status: '',
        lockStatus:null,
        roomType:null
    }
    export default defineComponent({
        name: "index",
        components: {
            [Card.name]: Card,
            [Select.name]:Select,
            [Radio.name]: Radio,
            [Space.name]: Space,
            [Row.name]: Row,
            [Col.name]: Col,
            [Input.name]: Input,
            Option:Select.Option
        },
        setup(props,{emit}) {
            const state = reactive({
                indeterminate: true,
                checkAll: false,
                searchData:JSON.parse(JSON.stringify(status)),
                plainOptions: [] as any,
                businessOrderType:[] as any
            });

            const getDictFn = async () => {
                const [data,businessOrderType] = [
                    await getDict('business_room_status', 'businessRoomStatus',true),
                    await getDict('business_order_type', 'businessOrderType',true)
                ]
                state.plainOptions = data
                state.businessOrderType = businessOrderType
            }
            getDictFn()

            //重置
            const reset=()=>{
                state.searchData = JSON.parse(JSON.stringify(status))
            }

            const onCheckAllChange = (e: any) => {
                Object.assign(state.searchData, {
                    // status: e.target.checked ? state.plainOptions.map(item => item.value) : [],
                    status: e.target.value,//e.target.checked ? state.plainOptions.map(item => item.value) : [],
                    indeterminate: false,
                });
            };

            // watch(
            //     () => state.searchData.status,
            //     val => {
            //         state.indeterminate = !!val.length && val.length < state.plainOptions.length;
            //         state.checkAll = val.length === state.plainOptions.length;
            //     },
            // );
            watch(() => state.searchData, (val) => {
                console.log('val',val)
                emit('callback',val)
            },{deep:true})
            return {
                ...toRefs(state),
                onCheckAllChange,
                reset
            };
        },
    })
</script>

<style lang="scss" scoped>
    .g-search-input {
        margin-top: 25px
    }
</style>
