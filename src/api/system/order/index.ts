import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelList = '/business/orderroom/list',
    businessOrderRoomOrderRoomId = `/business/orderroom`,
    businessOrderOperLogByOrderRoomOrderRoomId = `/business/order/oper/log/byorderroom`,
}

/**
 * 分页获取订单列表
 * @param params
 */
export function postBusinessOrderRoomList(param) {
    return http.request({
        url: `${Api.businessHotelList}`,
        method: RequestEnum.POST,
        params:param
    }, {
        isTransformRequestResult: false
    });
}

/**
 * 获取订单详细信息
 * */
export function GetBusinessOrderRoomOrderRoomId(params) {
    return http.request({
        url:`${Api.businessOrderRoomOrderRoomId}/${params.orderRoomId}`,
        method:RequestEnum.GET,
        params
    })
}

/**
 * 查询订单操作日志
 * */
export  function getBusinessOrderLogByOrderRoomOrderRoomId(params) {
    return http.request({
        url:`${Api.businessOrderOperLogByOrderRoomOrderRoomId}/${params.orderRoomId}`,
        method:RequestEnum.GET,
        params
    })
}
