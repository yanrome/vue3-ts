<template>
    <div class="login-box">
        <div class="login-logo">
            <svg-icon icon-class="logo"/>
            <!--      <img src="~@/assets/images/logo.png" alt="">-->
            <h1>哎哟有房</h1>
        </div>
        <a-form layout="horizontal" :model="formInline" @submit.prevent="handleSubmit">
            <a-form-item>
                <a-input v-model:value="formInline.username" size="large" placeholder="admin">
                    <template v-slot:prefix>
                        <user-outlined type="user"/>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input v-model:value="formInline.password" size="large" type="password" placeholder="123456"
                         autocomplete="new-password">
                    <template v-slot:prefix>
                        <lock-outlined type="user"/>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button
                        type="primary"
                        html-type="submit"
                        size="large"
                        :loading="loading"
                        block
                >
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs, onMounted} from 'vue'
    import {message} from 'ant-design-vue'
    import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
    import md5 from 'blueimp-md5'
    import AES from '@/utils/AesPassword'
    // ~@/assets/logo.png
    import {useRoute, useRouter} from "vue-router";
    import store, {useStore} from '@/store'
    import {UserActionTypes} from '@/store/modules/user/actions'
    import {login} from "@/api/system/user";

    import {SvgIcon} from '@/components/svg-icon'

    export default defineComponent({
        name: "login",
        components: {UserOutlined, LockOutlined, SvgIcon},
        setup() {
            const state = reactive({
                loading: false,
                formInline: {
                    username: 'admin',
                    password: '12345678',
                    validateCode: 'aiyoyoufang'
                }
            })
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const handleSubmit = async () => {
                const {username, password, validateCode} = state.formInline
                if (username.trim() == '' || password.trim() == '') return message.warning('用户名或密码不能为空！')
                const hide = message.loading('登录中...', 0)
                state.loading = true
                const params = {
                    username,
                    validateCode,
                    password
                }
                params.password = AES.generatekey(password)  // 'ca7c1174708a2afb7cbec68b69bd0ee0' //  md5(password)
                const res = await store.dispatch(UserActionTypes.Login, params).finally(() => {
                    state.loading = false
                    message.destroy()
                })
                const response = await store.dispatch(UserActionTypes.GetHotel,'')
                if (res.status == 1 && response.ret == 1) {
                    const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
                    message.success('登录成功！')
                    router.replace(toPath).then(_ => {
                        if (route.name == 'login') {
                            router.replace('/')
                        }
                    })
                } else {
                    message.info(res.msg || '登录失败')
                }
            }
            return {
                ...toRefs(state),
                handleSubmit
            }
        }
    })
</script>

<style lang="scss" scoped>
    .login-box {
        width: 100vw;
        height: 100vh;
        display: flex;
        padding-top: 240px;
        flex-direction: column;
        align-items: center;
        background: url("~@/assets/login.svg");
        background-size: 100%;

        .login-logo {
            display: flex;
            align-items: center;
            margin-bottom: 30px;

            .svg-icon {
                font-size: 48px;
            }

            img {
                height: 48px;
            }

            h1 {
                margin-bottom: 0;
            }
        }

        ::v-deep(.ant-form) {
            width: 400px;

            .ant-col {
                width: 100%;
            }

            .ant-form-item-label {
                padding-right: 6px;
            }
        }
    }
</style>
