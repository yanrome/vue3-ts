
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelList = `/business/hotel/list`
}

/**
 * @description  获取酒店列表
 * @param params
 */
export function postBusinessHotelList(params) {
    return http.request({
        url: Api.businessHotelList,
        method: RequestEnum.POST,
        params
    });
}


