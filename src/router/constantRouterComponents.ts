
import {RouterView} from 'vue-router'
import {RouterTransition} from "@/components/transition";
import account from './constantRouter/account'
import hotel from "@/router/constantRouter/hotel";

export const constantRouterComponents = {
    '/system': RouterTransition, // 系统管理
    '/business': RouterTransition, // 系统管理
    '/finance': RouterTransition, // 财务中心
    '/transaction':RouterTransition,
    '/hotel': RouterTransition, //
    '/order':RouterTransition,
    '/roomState': RouterTransition, //
    '':RouterTransition,
    '/#':RouterTransition,
    '/system/menu': () => import(/* webpackChunkName: "system-access" */ '@/views/auth/system/menu/index.vue'), // 菜单管理
    '/system/role': () => import(/* webpackChunkName: "system-role" */ '@/views/auth/system/role/index.vue'), // 角色管理
    '/system/dept': () => import(/* webpackChunkName: "system-dept" */ '@/views/auth/system/dept/index.vue'), // 部门管理
    '/system/user': () => import(/* webpackChunkName: "system-user" */ '@/views/auth/system/user/index.vue'), // 人员管理
    '/system/dict': () => import(/* webpackChunkName: "system-dict" */ '@/views/auth/system/dict/index.vue'), // 数据管理
    '/system/list': () => import(/* webpackChunkName: "system-dict" */ '@/views/auth/hotel/index.vue'), // 数据字典

    // 财务中心
    '/finance/index': () => import(/* webpackChunkName: "finance" */ '@/views/auth/finance/index.vue'),

    '/business/order': () => import(/* webpackChunkName: "business" */ '@/views/auth/business/order/index.vue'), // 订单管理
    '/business/details': () => import(/* webpackChunkName: "business" */ '@/views/auth/business/order/details/index.vue'), // 订单详情
    '/hotel/index': () => import(/* webpackChunkName: "business" */ '@/views/auth/hotel/index.vue'), // 酒店信息
    '/roomState/index':()=>import('@/views/auth/room-state/state/index.vue'),
    '/roomState/price':()=>import('@/views/auth/room-state/price/index.vue'),

    //财务管理模块
    ...account ,

    //酒店管理模块
    ...hotel,
}



