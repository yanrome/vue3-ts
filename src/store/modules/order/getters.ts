import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';

export type Getters = {
    orderRoomStatus(state: State): string;
}

export const getters: GetterTree<State, RootState> & Getters = {
    orderRoomStatus: (state) => state.orderRoomStatus,
};
