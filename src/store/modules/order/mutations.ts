import { MutationTree} from 'vuex'
import { State } from './state'

export enum OrderMutationType {
    setOrderRoomStatus = 'SET_ORDER_ROOM_STATUS',
}
export type Mutations<S = State> = {
    [OrderMutationType.setOrderRoomStatus](state: S, payload: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [OrderMutationType.setOrderRoomStatus]: (state, token) => {
        state.orderRoomStatus = token
    },

}
