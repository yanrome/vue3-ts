<template>
  <ALayoutHeader class="layout-header">
    <div class="left-options">
<!--      <span @click="() => $emit('update:collapsed', !collapsed)" class="menu-fold">-->
<!--        <component :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" />-->
<!--    </span>-->
<!--      <a-breadcrumb>-->
<!--        <template  v-for="routeItem in route.matched" :key="routeItem.name">-->
<!--          <a-breadcrumb-item style="color:#ffffff;">-->
<!--            <a>{{ routeItem.meta.title }}</a>-->
<!--            <template v-slot:overlay>-->
<!--              <a-menu v-if="routeItem.children.length">-->
<!--                <template v-for="childItem in routeItem.children">-->
<!--                  <a-menu-item v-if="!childItem.meta.hidden" :key="childItem.name">-->
<!--                    <router-link :to="{name: childItem.name}">-->
<!--                      {{ childItem.meta.title }}-->
<!--                    </router-link>-->
<!--                  </a-menu-item>-->
<!--                </template>-->
<!--              </a-menu>-->
<!--            </template>-->
<!--          </a-breadcrumb-item>-->
<!--        </template>-->
<!--      </a-breadcrumb>-->
    </div>
    <div class="right-options">

      <template v-for="item in iconList" :key="item.icon.name">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          <component v-on="item.eventObject || {}" :is="item.icon" />
        </a-tooltip>
      </template>
<!--      切换全屏-->
      <component :is="fullscreenIcon" @click="toggleFullScreen" />
      <Dropdown>
<!--        <a class="ant-dropdown-link" @click.prevent>-->
<!--          切换酒店-->
        <a-select
                v-model:value="hotelId"
                show-search
                placeholder="Select a person"
                option-filter-prop="children"
                style="width: 200px;color: #fff;"
                :bordered="false"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
        >
          <a-select-option v-for="item in hotel" :key="item.id" v-bind:id="item.id" v-bind:name="item.hotelName" :value="item.id">{{item.hotelName}}</a-select-option>
        </a-select>
          <DownOutlined />
<!--        </a>-->
        <template #overlay>

        </template>
      </Dropdown>


      <Dropdown>
        <a-avatar>{{ username }}</a-avatar>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item>
              <a @click.prevent="doLogout"><poweroff-outlined /> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, createVNode,ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import components from "@/layout/header/components";
import {message, Modal} from 'ant-design-vue'
import {QuestionCircleOutlined,DownOutlined} from '@ant-design/icons-vue'
import {useStore} from '@/store'
import {TABS_ROUTES} from "@/store/mutation-types";
import {LockscreenMutationType} from "@/store/modules/lockscreen/mutations";
import {UserActionTypes} from "@/store/modules/user/actions";
import {MutationType} from "@/store/modules/user/mutations"
import {TabsViewMutationType} from "@/store/modules/tabs-view/mutations";
import {storage} from "@/utils/Storage";
import {HOTEL_USER,HOTEL_USER_ID} from "@/store/mutation-types";
export default defineComponent({
  name: "PageHeader",
  components: {...components,DownOutlined},
  props: {
    collapsed: {
      type: Boolean,
    }
  },
  setup() {


    const filterOption = (input: string, option: any) => {
      return option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const store = useStore()
    console.log('12312312',store.getters.hotel)
    //初始化获取酒店列表
    store.commit(MutationType.SetHotel,storage.get(HOTEL_USER))
    store.commit(MutationType.setHotelId,storage.get(HOTEL_USER_ID))
    // commit(MutationType.setHotelId,result[0].id)
    const state = reactive({
      username: store.getters.userInfo.username,
      hotel:store.getters.hotel,
      hotelId:store.getters.hotelId,
      fullscreenIcon: 'FullscreenOutlined'
    })
    console.log('state',state)
    const router = useRouter()
    const route = useRoute()

      // console.log(route.matched)
    // console.log(router.getRoutes(), 'currentRoute')

    // 退出登录
    const doLogout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: createVNode(QuestionCircleOutlined),
        onOk: () => {
          console.log(router, '退出登录')
          // logout({})
          store.dispatch(UserActionTypes.Logout).then(res => {
            message.success('成功退出登录')
            // 移除标签页
            localStorage.removeItem(TABS_ROUTES)
            router.replace({
              name: 'login',
              query: {
                redirect: route.fullPath
              }
            }).finally(() => location.reload())
          })
        }
      })
    }

    // 切换全屏图标
    const toggleFullscreenIcon = () => (state.fullscreenIcon = document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined')

    // 监听全屏切换事件
    document.addEventListener("fullscreenchange", toggleFullscreenIcon)

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    // 图标列表
    const iconList = [
      {
        icon: 'LockOutlined',
        tips: '锁屏',
        eventObject: {
          click: () => store.commit(LockscreenMutationType.SetLock, true)
        }
      },
    ]
    const handleChange = (value: any) => {
      console.log(`selected`,value );
      store.commit(MutationType.setHotelId,value)
      console.log('selectedselected',store.getters.hotelId)
    };
    const handleBlur = () => {
      console.log('blur');
    };
    const handleFocus = () => {
      console.log('focus');
    };
    return {
      ...toRefs(state),
      filterOption,
      iconList,
      toggleFullScreen,
      handleBlur,
      handleFocus,
      handleChange,
      doLogout,
      route
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #001529;
  padding: 0;
  height: $header-height;
  color: #FFFFFF;
  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      padding: 0 24px;
      color: #fff;
      cursor: pointer;
    }
  }

  .right-options {
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
