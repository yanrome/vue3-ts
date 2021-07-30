import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';

export type Getters = {
    orderRoomStatus(state: State): string;
    orderRoomMsg(state:State):any
}

export const getters: GetterTree<State, RootState> & Getters = {
    orderRoomStatus: (state) => state.orderRoomStatus,
    orderRoomMsg:(state) => state.orderRoomMsg
};
