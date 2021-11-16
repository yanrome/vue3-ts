import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelList = '/business/orderroom/list',
    businessOrderRoomOrderRoomId = `/business/orderroom`,
    businessOrderOperLogByOrderRoomOrderRoomId = `/business/order/oper/log/byorderroom`,
    businessOrder = '/business/order'
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
 * @description 房东办理入住
 * */
export  function postBusinessOrderroomRoomIn(param) {
return http.request({
    url:[Api.businessOrderRoomOrderRoomId,'roomin',param.orderRoomId].join('/'),
    method:RequestEnum.POST,
    params:param
})
}

/**
 * @description 同步订单
 * */
export  function postBusinessOrderExternalSyn(param) {
    return http.request({
        url:[Api.businessOrder,'external/syn'].join('/'),
        method:RequestEnum.POST,
        params:param
    })
}


/**
 * @description 房东换房
 * */
export function  postOrderRoomChange(param) {
    return http.request({
        url:[Api.businessOrderRoomOrderRoomId,'roomchange',param.orderRoomId].join('/'),
        method:RequestEnum.POST,
        params:param
    })
}

/**
 * @description  房东退房
 * */
export function postOrderRoomLeave(params) {
return http.request({
    url:[Api.businessOrderRoomOrderRoomId,'leave'].join('/'),
    method:RequestEnum.POST,
    params
})
}

/**
 * @description  订单重新发送短信
 * */
export  function postSendMessageAgain(params) {
    return http.request({
        url:[Api.businessOrderRoomOrderRoomId,'send/message/again',params.orderRoomId].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description  订单重新发送密码
 * */
export  function postSendPasswordAgain(params) {
    return http.request({
        url:[Api.businessOrderRoomOrderRoomId,'password/send',params.orderRoomId].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 取消订单
 * */
export function postOrderRoomCancel(params) {
    return http.request({
        url:[Api.businessOrderRoomOrderRoomId,'cancel',params.orderRoomId].join('/'),
        method:RequestEnum.POST,
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
