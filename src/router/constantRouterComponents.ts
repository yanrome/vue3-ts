import {RouterView} from 'vue-router'
import {RouterTransition} from "@/components/transition";

export const constantRouterComponents = {
    '/system': RouterTransition, // 系统管理
    '/business': RouterTransition, // 系统管理
    '/hotel': RouterTransition, //
    '/roomState': RouterTransition, //
    '':RouterTransition,
    '/#':RouterTransition,
    '/system/menu': () => import(/* webpackChunkName: "system-access" */ '@/views/auth/system/menu/index.vue'), // 菜单管理
    '/system/role': () => import(/* webpackChunkName: "system-role" */ '@/views/auth/system/role/index.vue'), // 角色管理
    '/business/order': () => import(/* webpackChunkName: "business" */ '@/views/auth/business/order/index.vue'), // 订单管理
    '/business/details': () => import(/* webpackChunkName: "business" */ '@/views/auth/business/order/details/index.vue'), // 订单详情
    '/hotel/index': () => import(/* webpackChunkName: "business" */ '@/views/auth/hotel/index.vue'), // 订单详情
    '/roomState/index':()=>import('@/views/auth/room-state/state/index.vue'),
    '/roomState/price':()=>import('@/views/auth/room-state/price/index.vue')


}


