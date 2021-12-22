import { MutationTree} from 'vuex'
import { State } from './state'

export enum MutationType {
    SetToken = 'SET_TOKEN',
    SetName = 'SET_NAME',
    SetAvatar = 'SET_AVATAR',
    SetRoles = 'SET_ROLES',
    SetInfo = 'SET_INFO',
    SetHotel = 'SET_HOTEL',
    setHotelId = 'SET_HOTEL_ID',
    setQiuniuToken = 'SET_QIUNIU_TOKEN'
}
export type Mutations<S = State> = {
    [MutationType.SetToken](state: S, payload: string): void;
    [MutationType.SetAvatar](state: S, payload: string): void;
    [MutationType.SetRoles](state: S, payload: any[]): void;
    [MutationType.SetInfo](state: S, payload: any): void;
    [MutationType.SetHotel](state: S, payload: any): void;
    [MutationType.setHotelId](state: S, payload: any): void;
    [MutationType.setQiuniuToken](state: S, payload: any): void;

}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetToken]: (state, token) => {
        state.token = token
    },
    [MutationType.SetAvatar]: (state, avatar) => {
        state.avatar = avatar
    },
    [MutationType.SetRoles]: (state, roles) => {
        state.roles = roles
    },
    [MutationType.SetInfo]: (state, info) => {
        state.info = info
    },
    [MutationType.SetHotel]: (state, info) => {
        state.hotel = info
    },
    [MutationType.setHotelId]: (state, id) => {
        state.hotelId = id
    },
    [MutationType.setQiuniuToken]: (state, id) => {
        state.qiniuToken = id
    },


}
