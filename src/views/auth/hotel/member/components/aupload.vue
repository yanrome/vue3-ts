<template>
  <a-spin :spinning="spinning">
    <a-upload v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              style="border: 1px solid red;"
              :before-upload="beforeUpload"
              @change="handleChange">
      <img v-if="imageUrl"
           style="width: 100px; height: 100px;"
           :src="imageUrl"
           alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </a-spin>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  ref
} from 'vue'
import { Upload, message } from 'ant-design-vue'
import { systemMenuMenuTreeData } from '@/api/system/menu/index'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Aupload',
  components: {
    [Upload.name]: Upload,
    LoadingOutlined,
    PlusOutlined
  }, // 双向数据绑定
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:value'],

  setup(props, { emit }) {
    const state = reactive({
      fileList: [],
      loading: false,
      imageUrl: ''
    })

    const z_modelRef: string | null = window.localStorage.getItem('z_modelRef')
    if (z_modelRef) {
      state.imageUrl =
        JSON.parse(z_modelRef).domainName + JSON.parse(z_modelRef).bgUrl
    }

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        state.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          state.imageUrl = base64Url
          state.loading = false
        })
      }
      if (info.file.status === 'error') {
        state.loading = false
        message.error('upload error')
      }
    }

    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isLt2M) {
    //     message.error('Image must smaller than 2MB!')
    //   }
      return isJpgOrPng 
    }

    function getBase64(img: Blob, callback: (base64Url: string) => void) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result as string))
      reader.readAsDataURL(img)
    }

    return {
      ...toRefs(state),
      //   方法
      handleChange,
      beforeUpload,
      getBase64
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
