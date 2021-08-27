import { MutationTree} from 'vuex'
import { State } from './state'

export enum DictMutationType {
    SetDictObject = 'SET_DICT_OBJECT',
}
export type Mutations<S = State> = {
    [DictMutationType.SetDictObject](state: S, payload: any): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [DictMutationType.SetDictObject]: (state, params) => {
        state.dictObject = {...state.dictObject,...params}
    },
}
