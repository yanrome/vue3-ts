<template>
    <a-upload
            action="https://up-z2.qiniup.com/"
            list-type="picture-card"
            :data="upData"
            v-model:file-list="upFileList"
            @change="handleChange"
            :remove="remove"
            @preview="preview"
            :before-upload="beforeUpload"
    >
            <plus-outlined />
            <div class="ant-upload-text">上传</div>
    </a-upload>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
        watch,h,
        createVNode,
    } from 'vue'
    import {Upload, message, Modal,Button} from 'ant-design-vue'
    import {PlusOutlined,ExclamationCircleOutlined, LoadingOutlined} from '@ant-design/icons-vue'
    import {useStore} from "@/store";
    import {UserActionTypes} from "@/store/modules/user/actions";
    import {getPrimaryKey} from "@/utils/common";
    const _env = process.env
    const imgBaseUrl = _env.VUE_APP_IMGBASEURL || '/';
    export default defineComponent({
        name: 'upDate',
        components: {
            [Upload.name]: Upload,
            LoadingOutlined,
            PlusOutlined
        }, // 双向数据绑定
        props: {
            list: {
                type:Array,
            },
            baseURL:{  //上传图片，图片位置路径 如 upload/scale/pic
                type:String,
                default:''
            },
            removeFunc: {  //删除图片函数
                type: Function,
                required: true
            },
            preview:{
                type: Function,
                required: true
            },
        },
        emits: ['back'],
         setup(props, {emit}) {
            const uStore = useStore()
            const state = reactive({
                upFileList: props?.list,
                loading: false,
                upData:{
                    token:'',
                    key:''
                },
                imageUrl: '',
            })


             uStore.dispatch(UserActionTypes.GetQiuniuToken).then(res=>{
                 state.upData.token = res
             })
            // state.upData.token = qiniuToken
            //获取七牛云token

            const handleChange = (info) => {
                if (info.file.status === 'uploading') {
                    state.loading = true
                    return
                }
                if (info.file.status === 'done') {
                    getBase64(info.file.originFileObj, (base64Url: string) => {
                        state.imageUrl = base64Url
                        state.loading = false
                        const url = state.upData.key
                        emit('back',url)
                    })
                }
                if (info.file.status === 'error') {
                    state.loading = false
                    message.error('upload error')
                }
            }

            const beforeUpload = (file) => {
                state.upData.key = props.baseURL + getPrimaryKey() + '.' + file.name.split('.')[1]
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
                if (!isJpgOrPng) {
                    message.error('请选择jpeg或者png格式的图片')
                    return
                }
                return isJpgOrPng
            }

            function getBase64(img: Blob, callback: (base64Url: string) => void) {
                const reader = new FileReader()
                reader.addEventListener('load', () => callback(reader.result as string))
                reader.readAsDataURL(img)
            }

            const remove = (file) =>{
                return new Promise((resolve,reject)=>{
                    Modal.confirm({
                        title: '确定要删除这张图片',
                        icon: createVNode(ExclamationCircleOutlined),
                        content: '确定要删除这张图片？',
                        okText: '确定',
                        okType: 'danger',
                        cancelText:'取消',
                        onOk() {
                            props?.removeFunc({id:file.id}).then(() => {
                                resolve(true)
                        })
                        },
                        onCancel() {
                            reject()
                        },
                    });
                })

            }



            watch(
                ()=>props.list,
                (val) => {
                    state.upFileList = val
                },
                {
                    deep: true
                }
            )


            return {
                ...toRefs(state),
                //   方法
                handleChange,
                beforeUpload,
                getBase64,
                remove,

            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
