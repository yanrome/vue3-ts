import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessRoom = '/business/room' ,
    businessRoomScale ='/business/roomscale',  //基础房型模块
    businessVirtualRoomScale ='/business/virtual/roomscale',  //产品房型模块
    businessRoomPrice = '/business/roomprice'
}


/*************************************** 酒店房间模块 *********************************/

/**
 * @description 查询大门
 *@url business/room
 * */
export const postBusinessRoom = (params) => {
    return http.request({
        url: Api.businessRoom,
        method: RequestEnum.POST,
        params
    });
}


/**
 * @description 根据房型id和状态获取酒店房间
 *
 * */
export const getBusinessRoom = (params) => {
    return http.request({
        url: Api.businessRoom,
        method: RequestEnum.GET,
        params
    });
}

/**
 * @description 根据id房间详细信息
 * @url /business/room/{roomId
 * */
export const getBusinessRoomById = (params) =>{
    return http.request({
        url: `${Api.businessRoom}/${params.id}`,
        method: RequestEnum.GET,
        params
    });
}

/**
 * @description 编辑房间
 * @url /business/room/edit
 * */
export const postBusinessRoomEdit = (params) =>{
    return http.request({
        url:`${Api.businessRoom}/edit`,
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 新增房间
 * @url business/room/add
 * */
export const postBusinessRoomAdd = (params) =>{
    return http.request({
        url:`${Api.businessRoom}/add`,
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 房间锁房
 * @url /business/room/lock/{roomId}
 * */
export const postBusinessRoomLockId = (params) =>{
    return http.request({
        url:`${Api.businessRoom}/lock/${params.id}`,
        method:RequestEnum.POST,
        params
    },{
        endFunc:params.endFunc,
        isShowSuccessMessage:true,
        isShowErrorMessage:true
    })
}

/**
 * @description 房间上线
 * @url /business/room/online/{roomId}
 * */
export const postBusinessRoomOnlineId = (params) =>{
    return http.request({
        url:`${Api.businessRoom}/online/${params.id}`,
        method:RequestEnum.POST,
        params
    },{
        endFunc:params.endFunc,
        isShowSuccessMessage:true,
        isShowErrorMessage:true
    })
}

/**
 * @description 房间删除
 * @url /business/room/remove/{roomId}
 * */
export const postBusinessRoomRemoveId = (params) =>{
    return http.request({
        url:`${Api.businessRoom}/remove/${params.id}`,
        method:RequestEnum.POST,
        params
    },{
        endFunc:params?.endFunc,
        isShowSuccessMessage:true,
    })
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

/**
 * @description 根据基础房型获取产品房型信息
 * */
export function businessVirtualStateRoomScale(param) {
    return http.request({
        url:[Api.businessVirtualRoomScale,'state/byroomscale',param.roomScaleId].join('/'),
        method:RequestEnum.GET,
        params:param
    })
}


/********************************************* 基础房型模块 *****************************************/

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
 * @description 新增基础房型模块
 * @url /business/roomscale/add
 * */

export function businessRoomScaleAdd(params) {
    return http.request({
        url:[Api.businessRoomScale,'add'].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 编辑基础房型模块
 * @url /business/roomscale/edit
 * */

export function businessRoomScaleEdit(params) {
    return http.request({
        url:[Api.businessRoomScale,'edit'].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 根据id查询基础房型
 * @url /business/roomscale/{roomScaleId}
 * */

export const getBusinessRoomCaleRoomScaleId = (params) => {
    return http.request({
        url: `${Api.businessRoomScale}/${params.roomScaleId}`,
        method: RequestEnum.GET,
        params,
    });
}

/**
 * @description 删除基础房型
 * @url business/roomscale/remove/
 * */
export function businessRoomScaleRemove(params) {
    return http.request({
        url:[Api.businessRoomScale,'remove',params.id].join('/'),
        method:RequestEnum.POST
    })
}

/**
 * /business/roomscale/simple/byhotel/{hotelId}
 * */

/**
 * @description 根据酒店获取基础房型以及房态
 * */
export function businessRoomScaleStateByHotel(params) {
    return http.request({
        url:[Api.businessRoomScale,'state/byhotel',params.hotelId].join('/'),
        method:RequestEnum.GET,
        params
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
 * @description  查询房型连住折扣
 * */
export  function getBusinessRoomScaleDiscountInfo (params) {
    return http.request({
        url:[Api.businessRoomScale,'discount/info',params.id].join('/'),
        method:RequestEnum.GET
    })
}




/******************************************************* 基础房型图片模块 *********************************************************************/

/**
 * @description 根据基础房型获取图片
 * */
export function businessRoomScalePicture(params) {
    return http.request({
        url:[Api.businessRoomScale,'picture',params.roomScaleId].join('/'),
        method:RequestEnum.GET,
        params
    })
}

/**
 * @description 基础房型上传图片
 * @url /business/roomscale/picture/add
 * */
export function businessRoomScalePictureAdd(params) {
    return http.request({
        url:[Api.businessRoomScale,'picture/add'].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 删除基础房型图片
 * @url /business/roomscale/picture/remove/{roomPictrueId}
 * */

export function businessRoomScalePictureRemove(params) {
    return http.request({
        url:[Api.businessRoomScale,'picture/remove',params.id].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 设置基础房型图片为首页
 * @url  /business/roomscale/picture/logo/{roomScaleId}
 * */

export function businessRoomScalePictureLogo(params) {
    return http.request({
        url:[Api.businessRoomScale,'picture/logo',params.roomScaleId].join('/'),
        method:RequestEnum.POST,
        params
    })
}
