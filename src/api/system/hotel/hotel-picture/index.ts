import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessHotelPicture = `/business/hotel/picture`,
}


/**
 * @description 查询酒店图片
 * @url business/hotel/picture/byhotel/
 * */
export function getHotelPicture(params) {
    return http.request({
        url:[Api.businessHotelPicture,'byhotel',params.hotelId].join('/'),
        method:RequestEnum.GET,
        params
    })
}

/**
 * @description 删除酒店图片
 * @url business/hotel/picture/remove/18
 * */
export const postRemoveHotelPicture = (params) => {
    return http.request({
        url:[Api.businessHotelPicture,'remove',params.id].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 新增酒店图片
 * @url business/hotel/picture/add
 * */
export const postHotelPictureAdd = (params) => {
    return http.request({
        url:[Api.businessHotelPicture,'add'].join('/'),
        method:RequestEnum.POST,
        params
    })
}

/**
 * @description 设置酒店logo
 * @url /business/hotel/picture/logo/{hotelPictureId}
 * */
export const postBusinessHotelPictureLogo = (params) => {
    return http.request({
        url:[Api.businessHotelPicture,'logo',params.picId].join('/'),
        method:RequestEnum.POST,
    },{
        isShowSuccessMessage:true,
        isShowErrorMessage:true
    })
}

