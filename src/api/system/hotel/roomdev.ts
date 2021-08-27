
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoomDev = `/business/roomdev`
}

/**
 * @description  获取房间设施列表
 * @param params
 */
export function postBusinessRoomDevList(params) {
    return http.request({
        url: [Api.businessRoomDev,'list'].join('/') ,
        method: RequestEnum.POST,
        params
    });
}

/**
 * @description  删除设施设备
 * @param  id
 * */
export function  postBusinessRoomDevRemove(id) {
    return http.request({
        url:[Api.businessRoomDev,'remove',id].join('/'),
        method:RequestEnum.POST
    })
}
