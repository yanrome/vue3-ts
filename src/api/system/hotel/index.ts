import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelList = '/business/hotel/list'
}

/**
 * 根据当前用户角色和权限获取酒店列表
 * @param params
 */
export function getBusinessHotelList(searchValue) {
    return http.request({
        url: `${Api.businessHotelList}/${searchValue}`,
        method: RequestEnum.GET,
    }, {
        isTransformRequestResult: false
    });
}

