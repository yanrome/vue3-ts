import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelOtaAccountList = '/business/hotel/ota/account/list',
    businessHotelOtaAccountAdd = '/business/hotel/ota/account/add',
    businessHotelOtaAccountEdit = '/business/hotel/ota/account/edit',
    businessHotelOtaAccountRemove = '/business/hotel/ota/account/remove'
}


/**
 * @description 分页获取OTA账户列表
 * @param params
 * */
export function businessHotelOtaAccountList(params){
    return http.request({
        url:Api.businessHotelOtaAccountList,
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 新增OTA房型
 * @params params
 * */
export function businessHotelOtaAccountAdd(params) {
    return http.request({
        url:Api.businessHotelOtaAccountAdd,
        method:RequestEnum.POST,
        params
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}

/**
 * @description 编辑OTA房型
 * @params params
 * */
 export function businessHotelOtaAccountEdit(params) {
    return http.request({
        url:Api.businessHotelOtaAccountEdit,
        method:RequestEnum.POST,
        params
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}

/**
 * @description 删除OTA房型
 * @params params
 * */
 export function businessHotelOtaAccountRemove(hotelOtaRelationId) {
    return http.request({
        url: [Api.businessHotelOtaAccountRemove, hotelOtaRelationId].join('/'),
        method:RequestEnum.POST,
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}
