//订单房间状态
import {buttonType} from '../types'
import * as common from "./common";
import { useCreateModal } from '@/hooks'
import {checkInModal,checkoutModal,exchangeModal} from '../components/handle/modal'
import store from "@/store";
import {OrderActions} from "@/store/modules/order/actions";
import {OrderMutationType} from "@/store/modules/order/mutations";
import {postOrderRoomCancel,postSendMessageAgain,postSendPasswordAgain} from "@/api/system/order";
import {message} from "ant-design-vue";

export const buttonList: buttonType[] = [
    {
        title: '发送优惠券',
        type: 'default',
        name: 'send-coupons',
        author: '7',
        fun:(item)=>common['btnCheckIn'](item),

    }
    ,
    {
        title: '办理入住',
        type: 'primary',
        name: 'check-in',
        author: '1,2,3,4',
        table:"1,2",
        fun:(item)=>common['btnCheckIn'](item) && common['btnPayMent'](item),
        callBackFun:((order,fun) => {
            store.commit(OrderMutationType.setOrderRoomId,order.id)
            useCreateModal(checkInModal,{
                title:'办理入住',
                orderRoomMsg:order,
                callback: ()=>fun()
            })
        })
    },
    {
        title: '办理退房',
        type: 'danger',
        name: 'check-out',
        author: '1,2',
        table:"1,2",
        fun:(item)=>common['btnCheckOut'](item),
        callBackFun:((order,fun) => {
            useCreateModal(checkoutModal,{
                title:'办理退房',
                orderRoomMsg:order,
                callback: ()=>fun()
            })
        })
    },
    {
        title: '换房',
        type: 'default',
        name: 'exchange',
        author: '1,2,3,4',
        fun:(item)=>common['btnCheckOut'](item),
        callBackFun:((order,fun) => {
            useCreateModal(exchangeModal,{
                title:'换房',
                orderRoomMsg:order,
                callback:async ()=>fun()
            })
        })
    },
    {
        title: '重发密码',
        type: 'default',
        name: 'resend-password',
        author: '1,2',
        fun:(item)=>common['btnCheckIn'](item),
        callBackFun:(item=>{
            console.log('popconfirm',item)
            postSendPasswordAgain({orderRoomId:item.id,orderId:item.orderId}).then(res=>{
                res.ret === 1 && message.info('已重新发送密码')
            })
        }),
        action:{
            type:'popconfirm',
            title:`确认重新发送密码`,
        }
    }, {
        title: '重发短信',
        type: 'default',
        name: 'resend-code',
        author: '1,2',
        fun:(item)=>common['btnCheckIn'](item),
        callBackFun:( item=>{
            console.log('popconfirm',item)
            if(!item.order.phone){
                message.error('没有手机号，发送失败')
                return
            }
             postSendMessageAgain({orderRoomId:item.id,roomUser:item.order.roomUser,phone:item.order.phone}).then(res=>{
                res.ret === 1 && message.info('已重新发送短信')
             })
        }),
        action:{
            type:'popconfirm',
            title:`确认重新发送短信`,
        }
    },
    {
        title: '取消订单',
        type: 'default',
        name: 'cancel',
        author: '1',
        fun:(item)=>common['btnCancelOrder'](item),
        callBackFun:(async item=>{
            console.log('popconfirm',item)
          const {ret,data,msg} = await postOrderRoomCancel({orderId:item.orderId,orderRoomId:item.id})
            ret === 1 && message.info(msg)
            await store.dispatch(OrderActions.getOrderRoomMsg)
        }),
        action:{
            type:'popconfirm',
            title:`确认取消订单`,
        }
    }
]
