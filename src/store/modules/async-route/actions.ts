import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import {RootState} from "@/store";
import {generatorDynamicRouter} from "@/router/generator-routers";

export enum AsyncRouteActionTypes {
    GenerateRoutes = 'GENERATE_ROUTES',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}

export type Actions = {
    [AsyncRouteActionTypes.GenerateRoutes](context: ActionAugments): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [AsyncRouteActionTypes.GenerateRoutes]({ commit }) {
        const routers = await generatorDynamicRouter()
        commit(MutationType.SetRouters, routers)

        return routers
    },
}
