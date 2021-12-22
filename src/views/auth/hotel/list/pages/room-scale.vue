<template>
    <a-card>
        <a-tabs type="editable-card" @edit="onEditFunc">
            <a-tab-pane v-for="pane in tabPane" :key="pane.id" :tab="pane.scaleName">
                <room-scale-item :scale="pane"></room-scale-item>
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script lang="ts">
    import {createVNode, defineComponent, reactive} from 'vue'
    import {Tabs, Card, Modal, message} from "ant-design-vue";
    import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
    import {businessRoomScaleByHotel, businessRoomScaleRemove,businessRoomScaleAdd} from "@/api/system/hotel/room";
    import {useRoute} from "vue-router";
    import {toRefs} from "@vueuse/core";
    import roomScaleItem from '../components/room-scale-item.vue'
    import {useFormModal} from "@/hooks";
    import {roomScale} from "@/views/auth/hotel/list/pages/room-scale";


    export default defineComponent({
        name: "room-scale",
        components: {
            [Tabs.name]: Tabs,
            [Card.name]: Card,
            aTabPane: Tabs.TabPane,
            roomScaleItem
        },
        props: {},
        setup(props) {
            const state = reactive({
                tabPane: [] as Object,
                status: '',
                roomStatus: [] as Object
            })

            const uRouter = useRoute()

            //获取酒店房型
            const getBusinessRoomScaleByHotel = async () => {
                const {data} = await businessRoomScaleByHotel({hotelId: uRouter.query.id})
                data.length && (state.tabPane = data)
            }
            getBusinessRoomScaleByHotel()

            //操作标签
            const onEditFunc = (targetKey) => {
                const type = typeof targetKey === 'number'
                if (type) { //删除
                    Modal.confirm({
                        title: '确定要删除该房型',
                        icon: createVNode(ExclamationCircleOutlined),
                        content: '确定要删除该房型？',
                        okText: '确定',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk() {
                            businessRoomScaleRemove({id: targetKey}).then(res => {
                                message.info(res.msg)
                                getBusinessRoomScaleByHotel()
                            })
                        },
                        onCancel() {
                        },
                    });
                } else {  //添加房型
                    addItem()
                }
            }

            //新增or编辑
            const addItem = () =>{
                useFormModal({
                    title: '新增房型',
                    type:'drawer',
                    formSchema:roomScale(),
                    handleOk:async (data)=>{
                        const params = {
                            hotelId:uRouter.query.id,
                            ...data
                        }
                        businessRoomScaleAdd(params).then(res=>{
                            message.info(res.msg)
                        })
                    }
                })
            }

            return {
                ...toRefs(state),
                onEditFunc
            }
        }
    })
</script>

<style scoped>
</style>
