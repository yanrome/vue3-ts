/**
 *订单入住人
 */


import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessOrderRoomUser = `/business/orderroomuser/byorderroom`
}

/**
 * 分页获取订单列表
 * @param params
 */
export function getBusinessOrderRoomUser(params) {
    return http.request({
        url: `${Api.businessOrderRoomUser}/${params.orderRoomId}`,
        method: RequestEnum.GET,
        params
    });
}
