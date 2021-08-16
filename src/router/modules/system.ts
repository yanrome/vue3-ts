// import {RouteRecordRaw} from 'vue-router'
// import {RouterTransition} from '@/components/transition'
// import {markRaw} from "vue";

// const routeName = 'system'



// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/system',
//         name: routeName,
//         redirect: '/system/details',
//         component: markRaw(RouterTransition),
//         meta: {
//             title: '订单管理',
//             hidden:true,
//             icon: 'icon-zhuomian',
//         },
//         children: [
//             {
//                 path: 'details',
//                 name: 'system-details',
//                 meta: {
//                     title: '订单列表',
//                     icon: 'icon-zhuomian',
//                     keepAlive: true,
//                     hidden:true,
//                 },
//                 component: () => import(/* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/auth/business/order/details/index.vue')
//             },
//         ]
//     }
// ]

// export default routes
