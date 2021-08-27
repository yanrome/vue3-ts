export  default  {
    '/business/account/flow':()=>import('@/views/auth/transaction/account/index.vue'),
    '/business/refund':()=>import('@/views/auth/transaction/refund/index.vue'),
    '/business/transfer':()=>import('@/views/auth/transaction/transfer/index.vue'),
    '/business/compensation':()=>import('@/views/auth/transaction/compensation/index.vue'),
}
