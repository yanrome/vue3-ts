
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

