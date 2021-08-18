import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelList = '/business/hotel/list' ,
    businessHotelHotelId = `/business/hotel`
}

/**
 * 根据当前用户角色和权限获取酒店列表
 * @param params
 */
export function getBusinessHotelList(searchValue) {
    return http.request({
        url: [Api.businessHotelList,searchValue].join('/') ,
        method: RequestEnum.GET,
    }, {
        isTransformRequestResult: false
    });
}

/**
 * @description 根据酒店id获取酒店信息
 * @param params
 * */
export function getBusinessHotelHotelId(param){
    return http.request({
        url:`${Api.businessHotelHotelId}/${param.hotelId}`,
        method:RequestEnum.GET
    })
}

/**
 * @description 修改酒店信息
 * @params params
 * */
export function postHotelEdit(params) {
    return http.request({
        url:[Api.businessHotelHotelId,'edit'].join('/'),
        method:RequestEnum.POST,
        params
    })
}
