//酒店房间模块

import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoom = '/business/room' ,

}

/**
 * @description  获取酒店房间
 *
*/
export function getBusinessRoomByHotel(param) {
    return http.request({
        url: [Api.businessRoom,'byhotel'].join('/'),
        method: RequestEnum.GET,
        params:param
    });
}

/**
 * @description  获取房型房态房价
 * */
export  function getRoomStatePriceByHotel(param) {
    return http.request({
        url:`/business/roomstate/price/book/byhotel/${param.hotelId}`,
        method:RequestEnum.GET,
        params:param
    })
}





