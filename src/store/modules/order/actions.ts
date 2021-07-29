import {ActionContext, ActionTree} from "vuex";
import { State } from './state'
import {RootState} from "@/store";
import {Mutations,} from "@/store/modules/order/mutations";
import { getBusinessRoomFree} from '@/api/system/hotel/room'
export enum OrderActions {
    getBusinessRoom=  'GET_BUSINESS_ROOM'
}
type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}
export type Actions = {
    [OrderActions.getBusinessRoom](context: ActionAugments,param:any): void;
}

export const actions:ActionTree<State, RootState> & Actions = {
    async [OrderActions.getBusinessRoom]({ commit },param) {
        const {data} = await getBusinessRoomFree(param)
        return data
    },
}
