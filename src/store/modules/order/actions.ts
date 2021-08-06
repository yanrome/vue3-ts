import {ActionContext, ActionTree} from "vuex";
import { State } from './state'
import {RootState} from "@/store";
import {Mutations,OrderMutationType} from "@/store/modules/order/mutations";
import { getBusinessRoomFree,getBusinessRoomScaleDiscountInfo} from '@/api/system/hotel/room'
import {GetBusinessOrderRoomOrderRoomId} from '@/api/system/order/index'
export enum OrderActions {
    getBusinessRoom=  'GET_BUSINESS_ROOM',
    getOrderRoomMsg = 'GET_ORDER_ROOM_MSG'
}
type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}
export type Actions = {
    [OrderActions.getBusinessRoom](context: ActionAugments,param:any): void;
    [OrderActions.getOrderRoomMsg](context: ActionAugments,param:any): void;
}

export const actions:ActionTree<State, RootState> & Actions = {
    //查询空余房间
    async [OrderActions.getBusinessRoom]({ commit },param) {
        const {data} = await getBusinessRoomFree(param)
        return data
    },

    //根据id查询订单详情
    async [OrderActions.getOrderRoomMsg]({commit,state},params:object = {}) {
        const obj = Object.assign(params,{orderRoomId:state.orderRoomId});
        const {data} = await GetBusinessOrderRoomOrderRoomId(obj)
        data.discountPrice = 0
        if( data?.order?.roomScaleDiscountId ){ //查询订单折扣
            const {data:info} = await getBusinessRoomScaleDiscountInfo({id:data?.order?.roomScaleDiscountId })
            data.discountInfo = info
            data.discountPrice =data?.roomRealAmount * ( 1 - data?.discountInfo?.discount / 10)  // 连住折扣减去价格
        }
        if(data?.order?.memberDiscount < 1 && data?.order?.memberDiscount > 0){
            data.discountMember = (data?.roomRealAmount - data.discountPrice) * ( 1- data?.order?.memberDiscount)  // 会员折扣减去价格
        }
        commit(OrderMutationType.setOrderRoomMsg,data)
        return data
    }
}




