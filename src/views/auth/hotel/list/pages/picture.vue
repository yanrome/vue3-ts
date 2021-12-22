<template>
    <a-card>
        <update-image :list="fileList"
                      :baseURL="'upload/hotel/pic/'+hotelId+'/'"
                      :remove-func="postRemoveHotelPicture"
                      :preview="preview"
                      @back="handleChangeEnd">
        </update-image>
    </a-card>
</template>

<script lang="ts">
    import {createVNode, defineComponent, h, reactive} from 'vue'
    import {Button, Card, message, Modal} from "ant-design-vue";
    import {useRoute} from "vue-router";
    import {toRefs} from "@vueuse/core";
    import updateImage from "@/components/update/update-image.vue";
    import {getHotelPicture,postRemoveHotelPicture,postHotelPictureAdd,postBusinessHotelPictureLogo} from "@/api/system/hotel/hotel-picture";
    import {businessRoomScalePictureLogo} from "@/api/system/hotel/room";

    export default defineComponent({
        name: "picture",
        components:{
            [Card.name]:Card,
            updateImage
        },
        setup(){
            const uRouter = useRoute()
            const state = reactive({
                hotelId:uRouter.query.id,
                fileList:[],
            })

            const getHotelPictureFunc = () => {
                getHotelPicture({hotelId:uRouter.query.id}).then(res=>{
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
            getHotelPictureFunc()

            //上传图片回调
            const handleChangeEnd = (url) => {
                const params = {
                    picUrl: url,
                    hotelId: uRouter.query.id
                }
                postHotelPictureAdd(params).then(() => {
                    getHotelPictureFunc()
                })
            }

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
                                    await postBusinessHotelPictureLogo({
                                        picId: pic.id,
                                        hotelId: uRouter.query.id
                                    })
                                    Modal.destroyAll()
                                },
                            },
                            '设为酒店首页',
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

            return {
                ...toRefs(state),
                postRemoveHotelPicture,
                handleChangeEnd,
                preview
            }
        },
    })
</script>

<style scoped>

</style>
