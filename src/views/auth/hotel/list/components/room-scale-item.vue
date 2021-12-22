<template>
    <div>
        <a-form >
            <a-form-item label="房型管理">
                <a-button @click="editFunc" type="primary">编辑房型</a-button>
            </a-form-item>
            <a-form-item label="图片管理" >
                <update-image :list="fileList"
                              :baseURL="'upload/scale/pic/'+scale.id+'/'"
                              :remove-func="businessRoomScalePictureRemove"
                              :preview="preview"
                              @back="handleChangeEnd">
                </update-image>
            </a-form-item>
            <a-form-item label="房间管理">
                <div>
                    <a-radio-group @change="radioStatusFunc" v-model:value="status" >
                        <a-radio-button v-for="item in roomStatus" :key="item.value" :style="'background:' + item.color"
                                        :value="item.value">{{item.label}}
                        </a-radio-button>
                    </a-radio-group>
                </div>
                <div style="margin-top: 32px">
                    <template v-if="roomArray.length">
                        <a-row :gutter="[32,32]">
                            <a-col v-for="item in roomArray" :key="item.id">
                                <room-info :back="getBusinessRoomFunc" :info="item"></room-info>
                            </a-col>
                        </a-row>
                    </template>
                    <template v-else>
                        <Empty />
                    </template>
                </div>

            </a-form-item>
        </a-form>

    </div>
</template>

<script lang="ts">
    import {createVNode, defineComponent, h, reactive, watch} from 'vue'
    import updateImage from '@/components/update/update-image.vue'
    import roomInfo from './room-info.vue'
    import {
        businessRoomScalePicture,
        businessRoomScalePictureAdd,
        businessRoomScalePictureRemove,
        businessRoomScalePictureLogo, getBusinessRoom, businessRoomScaleEdit,
        getBusinessRoomCaleRoomScaleId
    } from "@/api/system/hotel/room";
    import {toRefs} from "@vueuse/core";
    import {Button, Modal, message, Row, Col, Radio, Empty,Form} from "ant-design-vue";
    import {DictActions} from "@/store/modules/dict/actions";
    import {changeDict} from "@/utils/common";
    import {statusColor} from "@/utils/dict";
    import {useStore} from "@/store";
    import {useFormModal} from "@/hooks";
    import {roomScale} from "@/views/auth/hotel/list/pages/room-scale";


    export default defineComponent({
        name: "room-scale-item",
        components: {
            updateImage,
            roomInfo,
            [Row.name]: Row,
            [Col.name]: Col,
            [Form.name]: Form,
            [Empty.name]: Empty,
            [Radio.name]: Radio,
            [Radio.Group.name]: Radio.Group,
        },
        props: {
            scale: {
                type: Object
            }
        },
        setup(props) {
            const state = reactive({
                fileList: [],
                roomStatus: [] as Object,
                status: '',
                roomArray: []
            })

            const store = useStore()
            store.dispatch(DictActions.getDict, {dictType: 'business_room_status'}).then(res => {
                const arr = [{label: '全部房间', value: ''}, ...changeDict(res, true)]
                arr.forEach((item) => {
                    item.color = statusColor[item.value] || '#ffffff'
                })
                state.roomStatus = arr
                getBusinessRoomFunc()
            })

            //根据房型获取酒店房间
            const getBusinessRoomFunc = () => {
                const params = {
                    roomScaleId: props?.scale?.id,
                    status: state.status
                }
                getBusinessRoom(params).then(res => {
                    let arr = res.data
                    arr.forEach((item) => {
                        item.color = statusColor[item.status] || '#ffffff'
                    })
                    state.roomArray = arr
                })
            }

            //查询基础房型信息


            //编辑房型
            const editFunc = async  () => {
                const {data} = await getBusinessRoomCaleRoomScaleId({roomScaleId:props?.scale?.id})
                useFormModal({
                    title: '编辑房型',
                    type:'drawer',
                    fields:data,
                    formSchema:roomScale(),
                    handleOk:async (data)=>{
                        const {id,description,broadBandPrice,parkPrice,rubbishPrice,propPrice,elecPrice,gasPrice,waterPrice,cleaningAmount,cleanAmount,bedSize,bookMonth,brief,roomSizeroomNum,bedNum} = data
                        const params = {id,description,broadBandPrice,parkPrice,rubbishPrice,propPrice,elecPrice,gasPrice,waterPrice,cleaningAmount,cleanAmount,bedSize,bookMonth,brief,roomSizeroomNum,bedNum}
                        businessRoomScaleEdit(params).then(res=>{
                            message.info(res.msg)
                        })
                    }
                })
            }

            /**
             * 组件回调事件
             * start
             * */

                //获取图片回调
            const getRoomScalePic = () => {
                    businessRoomScalePicture({roomScaleId: props?.scale?.id}).then(res => {
                        state.fileList = res.data.map(item => {
                            const o = {
                                uid: item.id,
                                name: item.picName,
                                status: 'done',
                                url: `${item.domainName}${item.picUrl}`,
                            }
                            return {...item, ...o}
                        })
                    })
                }
            getRoomScalePic()

            //图片模块--点击预览按钮回调
            const preview = (pic) => {
                Modal.warning({
                    title: '',
                    okText: '取消',
                    maskClosable: true,
                    content: h('div', {}, [
                        h(createVNode(Button), {
                                type: 'dashed',
                                style: {
                                    marginRight: '20px'
                                },
                                onClick: async () => {
                                    const {msg} = await businessRoomScalePictureLogo({
                                        picId: pic.id,
                                        roomScaleId: props?.scale?.id
                                    })
                                    message.info(msg);
                                    Modal.destroyAll()
                                },
                            },
                            '设为首页',
                        ),
                        h(createVNode(Button), {
                                type: 'dashed',
                                onClick: () => {
                                    window.open(pic.domainName + pic.picUrl)
                                    Modal.destroyAll()
                                },
                            },
                            '查看大图',
                        ),
                    ]),
                    onOk() {
                        console.log('ok');
                    },
                });

            }

            //上传图片回调
            const handleChangeEnd = (url) => {
                const params = {
                    picUrl: url,
                    roomScaleId: props?.scale?.id
                }
                businessRoomScalePictureAdd(params).then(() => {
                    getRoomScalePic()
                })
            }

            /**
             * 组件回调事件
             * end
             * */

            /**
             * watch start
             * */

            watch(() => state.status, () => {
                getBusinessRoomFunc()
            })

            return {
                ...toRefs(state),
                handleChangeEnd,
                editFunc,
                preview,
                businessRoomScalePictureRemove,
                getBusinessRoomFunc
            }
        }
    })
</script>

<style scoped>
    .s-rsi-right {
        text-align: right;
        padding-right: 20px
    }
</style>
