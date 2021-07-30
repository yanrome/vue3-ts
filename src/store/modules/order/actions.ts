import {ActionContext, ActionTree} from "vuex";
import { State } from './state'
import {RootState} from "@/store";
import {Mutations,OrderMutationType} from "@/store/modules/order/mutations";
import { getBusinessRoomFree} from '@/api/system/hotel/room'
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
        commit(OrderMutationType.setOrderRoomMsg,data)
        return data
    }
}




