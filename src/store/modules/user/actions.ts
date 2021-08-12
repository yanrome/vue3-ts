import {Action, ActionContext, ActionTree} from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import {RootState} from "@/store";
import {getUserInfo, login} from "@/api/system/user";
import {getBusinessHotelList} from '@/api/system/hotel/index'
import {ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN, HOTEL_USER, HOTEL_USER_ID} from "@/store/mutation-types";
import {storage} from "@/utils/Storage";
import {LockscreenMutationType} from '@/store/modules/lockscreen/mutations'
import store from "@/store";

export enum UserActionTypes {
    Login = 'LOGIN',
    GetInfo = 'GET_INFO',
    Logout = 'LOGOUT',
    GetHotel = 'GET_HOTEL'
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
}

export type Actions = {
    [UserActionTypes.Login](context: ActionAugments, userInfo: any): Promise<any>;
    [UserActionTypes.GetInfo](context: ActionAugments): Promise<any>;
    [UserActionTypes.Logout](context: ActionAugments): Promise<any>;
    [UserActionTypes.GetHotel](context: ActionAugments,hotel:any): Promise<any>;
}



export const actions: ActionTree<State, RootState> & Actions = {
    // 登录
    async [UserActionTypes.Login]({commit}, userInfo) {
        try {
            const response = await login(userInfo)

            const [ msg,status] =[response.msg,response.status]

            if (status == 1) {
                // console.log(result.token)
                const obj = {
                    username:userInfo.username,
                    token:'token'
                }
                storage.set(ACCESS_TOKEN, 'result.token', 7 * 24 * 60 * 60 * 1000)
                storage.set(CURRENT_USER, obj, 7 * 24 * 60 * 60 * 1000)
                storage.set(IS_LOCKSCREEN, false)
                commit(MutationType.SetToken, 'result.token')
                // todo
                commit(MutationType.SetInfo, obj)
                store.commit(LockscreenMutationType.SetLock, false)
            }
            return Promise.resolve(response)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    // 获取用户信息
    [UserActionTypes.GetInfo]({commit}) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(response => {
                const result = response.result

                if (result.role && result.role.permissions.length > 0) {
                    const role = result.role
                    role.permissions = result.role.permissions
                    role.permissions.map(per => {
                        if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                            const action = per.actionEntitySet.map(action => {
                                return action.action
                            })
                            per.actionList = action
                        }
                    })
                    role.permissionList = role.permissions.map(permission => {
                        return permission.permissionId
                    })
                    commit(MutationType.SetRoles, result.role)
                    commit(MutationType.SetInfo, result)
                } else {
                    reject(new Error('getInfo: roles must be a non-null array !'))
                }

                // commit('SET_NAME', { name: result.name, welcome: welcome() })
                commit(MutationType.SetAvatar, result.avatar)

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    async [UserActionTypes.Logout]({commit, state}) {
            commit(MutationType.SetRoles, [])
            commit(MutationType.SetInfo, '')
            storage.remove(ACCESS_TOKEN)
            storage.remove(CURRENT_USER)
            return Promise.resolve('')
    },

    //获取酒店列表
    async [UserActionTypes.GetHotel]({commit},searchValue){
        try {
            const response = await getBusinessHotelList(searchValue)
            const [ msg,status,result] =[response.msg,response.ret,response.data]
            // console.log('获取酒店列表status',status)
            if(status == 1){
                storage.set(HOTEL_USER,result,7 * 24 * 60 * 60 * 1000)
                storage.set(HOTEL_USER_ID,result[0].id,7 * 24 * 60 * 60 * 1000)
                commit(MutationType.SetHotel, result)
                commit(MutationType.setHotelId,result[0].id)
            }
            return Promise.resolve(response)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}
