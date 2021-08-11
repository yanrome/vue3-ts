//酒店账户模块
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelAccount = '/business/hotel/account' ,
}

/**
 * @description  查询酒店账户信息
 * */
export function postBusinessHotelAccountList(param) {
    return http.request({
        url:[Api.businessHotelAccount,'byhotel',param.hotelId].join('/'),
        method:RequestEnum.POST
    })
}


