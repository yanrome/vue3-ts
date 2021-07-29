//订单房间状态
import {buttonType} from '../types'
import * as common from "./common";


export const buttonList: buttonType[] = [
    {
        title: '发送优惠券',
        type: 'default',
        name: 'send-coupons',
        author: '7',
        fun:(item)=>common['btnCheckIn'](item)
    }
    ,
    {
        title: '办理入住',
        type: 'primary',
        name: 'check-in',
        author: '1,2,3,4',
        table:"1,2",
        fun:(item)=>common['btnCheckIn'](item) && common['btnPayMent'](item)
    },
    {
        title: '办理退房',
        type: 'danger',
        name: 'check-out',
        author: '1,2',
        table:"1,2",
        fun:(item)=>common['btnCheckOut'](item)
    },
    {
        title: '换房',
        type: 'default',
        name: 'exchange',
        author: '1,2,3,4',
        fun:(item)=>common['btnCheckOut'](item)
    },
    {
        title: '重发密码',
        type: 'default',
        name: 'resend-password',
        author: '1,2',
        fun:(item)=>common['btnCheckIn'](item)
    }, {
        title: '重发短信',
        type: 'default',
        name: 'resend-code',
        author: '1,2',
        fun:(item)=>common['btnCheckIn'](item)
    },
    {
        title: '取消订单',
        type: 'default',
        name: 'cancel',
        author: '1',
        fun:(item)=>common['btnCancelOrder'](item)
    }
]
