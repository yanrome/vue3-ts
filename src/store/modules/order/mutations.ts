import { MutationTree} from 'vuex'
import { State } from './state'

export enum OrderMutationType {
    setOrderRoomStatus = 'SET_ORDER_ROOM_STATUS',
    setOrderRoomMsg = 'SET_ORDER_ROOM_MSG',
    setOrderRoomId = 'SET_ORDER_ROOM_ID'
}
export type Mutations<S = State> = {
    [OrderMutationType.setOrderRoomStatus](state: S, payload: any): void;
    [OrderMutationType.setOrderRoomMsg](state: S, payload: object): void;
    [OrderMutationType.setOrderRoomId](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [OrderMutationType.setOrderRoomStatus]: (state, token) => {
        state.orderRoomStatus = token
    },
    [OrderMutationType.setOrderRoomMsg]: (state, orderRoomMsg) => {
        state.orderRoomMsg = orderRoomMsg
    },
    [OrderMutationType.setOrderRoomId]: (state, id) => {
        state.orderRoomId = id
    },
}
