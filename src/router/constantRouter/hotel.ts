export default {
    '/business/hotel':()=>import('@/views/auth/hotel/list/index.vue'),
    '/business/roomdev':()=>import('@/views/auth/hotel/roomdev/index.vue'),
    '/business/police/report':()=>import('@/views/auth/hotel/police/index.vue'),
    '/business/room/rule':()=>import('@/views/auth/hotel/roomRule/index.vue'),
    '/business/hotel/scale':()=>import('@/views/auth/hotel/list/pages/room-scale.vue'),
    '/business/hotel/picture':()=>import('@/views/auth/hotel/list/pages/picture.vue'),
    '/business/hotel/gate':()=>import('@/views/auth/hotel/list/pages/gate/index.vue')
    // '/business/ota/index':()=>import('@/views/auth/hotel/ota/index.vue'),

}
