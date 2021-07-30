/**
 *订单入住人
 */


import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessOrderRoomUser = `/business/orderroomuser`
}

/**
 * 分页获取订单列表
 * @param params
 */
export function getBusinessOrderRoomUser(params) {
    return http.request({
        url: `${Api.businessOrderRoomUser}/byorderroom/${params.orderRoomId}`,
        method: RequestEnum.GET,
        params
    });
}

/**
 * @description  添加入住人
 * */
export function postUserAdd(params) {
    return http.request({
        url:[Api.businessOrderRoomUser,'add'].join('/'),
        method:RequestEnum.POST,
        params
    })

}
