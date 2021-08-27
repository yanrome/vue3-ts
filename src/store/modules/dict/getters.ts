import { GetterTree } from 'vuex';

import { RootState } from '@/store';

import { State } from './state';

export type Getters = {
    dictObject(state:State):any;
}

export const getters: GetterTree<State, RootState> & Getters = {
    dictObject: (state) => state.dictObject,
};
