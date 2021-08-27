import {ActionContext, ActionTree} from "vuex";
import { State } from './state'
import {RootState} from "@/store";
import {Mutations,DictMutationType} from "@/store/modules/dict/mutations";
import {getSystemDictDataByType} from '@/api/system/dict'
import {transFormStr} from "@/utils/common";

export enum DictActions {
    getDict=  'GET_DICT',
}
type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}
export type Actions = {
    [DictActions.getDict](context: ActionAugments,param:any): void;
}

export const actions:ActionTree<State, RootState> & Actions = {
    [DictActions.getDict]({commit,state},params){
        let dictStr = transFormStr(params.dictType)
            return new Promise(resolve => {
                if(state.dictObject[dictStr]){
                    resolve(state.dictObject[dictStr])
                }else {
                getSystemDictDataByType({dictType: params.dictType}).then(res=>{
                    commit(DictMutationType.SetDictObject,{[dictStr]:res.data})
                    resolve(res.data)
                })
                }
            })


    }
}




