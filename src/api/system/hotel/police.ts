
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoomDev = `/business/police`
}

/**
 * @description  获取公安上报
 * @param params
 */
export function postBusinessPoliceList(params) {
    return http.request({
        url: [Api.businessRoomDev,'report/list'].join('/') ,
        method: RequestEnum.POST,
        params
    });
}


