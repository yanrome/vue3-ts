//酒店房间模块
//基础房型模块
//产品房型模块


import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoom = '/business/room' ,
    businessRoomScale ='/business/roomscale',  //基础房型模块
    businessVirtualRoomScale ='/business/virtual/roomscale',  //产品房型模块
    businessRoomPrice = '/business/roomprice'

}

/**
 * @description  获取酒店房间
* */
export function getBusinessRoomByHotel(param) {
    return http.request({
        url: [Api.businessRoom,'byhotel'].join('/'),
        method: RequestEnum.GET,
        params:param
    });
}

/**
 * 根据产品房型查询空闲房间
 * */
export function getBusinessRoomFree(param) {
    return http.request({
        url:[Api.businessRoom,'free/roomscale',param.virtualRoomScaleId].join('/'),
        method:RequestEnum.GET,
        params:param
    })
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

/**
 * @description  获取基础房型
 * */
export function businessRoomScaleByHotel(param) {
    return http.request({
        url:[Api.businessRoomScale,'byhotel',param.hotelId].join('/'),
        method:RequestEnum.GET
    })
}

/**
 * @description 房型日历模块 -- 批量新增产品房型日历房态
 * @url   /business/roomscale/state/batch/add
 * @params  str  |  'state/batch/add' | 批量新增
 * @params  str  | 'state/edit'       |   单个新增
 * */
export function postBusinessRoomScaleStateBatch(params,str:string) {
    return http.request({
        url:[Api.businessRoomScale,str].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description  日历房价模块
 * @url  /business/roomprice/batch/add
 * @params  str  |  'batch/add'    |    '批量修改日历房价'
 * @params  str  |  'edit'    |    '修改产品房型日历价格'
 * */
export function postBusinessRoomPriceAddAndEdit(params,str) {
    return http.request({
        url:[Api.businessRoomPrice,str].join('/'),
        method:RequestEnum.POST,
        params
    })
}


/**
 * @description 根据基础房型获取产品房型信息以及及时房态
 * GET /business/virtual/roomscale/now/state/byroomscale/{roomScaleId}

 * */
export function businessVirtualRoomScale(param) {
return http.request({
    url:[Api.businessVirtualRoomScale,'now/state/byroomscale',param.roomScaleId].join('/'),
    method:RequestEnum.GET,
    params:param
})
}




