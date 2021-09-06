
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoom = '/business/room' ,
}

/**
 * @description  获取房间设施列表
 * @param params
 */
export function postBusinessRoomRuleList(params) {
    return http.request({
        url: [Api.businessRoom,'rule/list'].join('/') ,
        method: RequestEnum.POST,
        params
    });
}

/**
 * @description  编辑入住规则
 * @param
 * */
export function postBusinessRoomRuleEdit(params) {
    return http.request({
        url: [Api.businessRoom,'rule/edit'].join('/') ,
        method: RequestEnum.POST,
        params
    });
}

/**
 * @description  删除入住规则
 * @param
 * */
export function postBusinessRoomRuleRemove(id) {
    return http.request({
        url: [Api.businessRoom,'rule/remove',id].join('/') ,
        method: RequestEnum.POST,
    });
}

