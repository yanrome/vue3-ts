import http from '@/utils/http/axios';

enum Api {
    'businessBill' = '/business/bill'
}

/**
 * @description: 根据酒店和月份统计各个房型每天间夜
 */
export function getBusinessBillRecordInterNightHotelMonth(params) {
    return http.request({
        url: [ Api.businessBill,'record/inter/night/hotel/month'].join('/'),
        method: 'GET',
        params
    });
}

/**
 * @description: 根据酒店和月份统计最近七天订单数量
 *
 * */
export const getBusinessBillRecordOrderSourceHotelMonth = (params)=>{
    return http.request({
        url: [ Api.businessBill,'record/order/source/hotel/month'].join('/'),
        method: 'GET',
        params
    });
}

/**
 * @description: 根据酒店和月份统计订单来源
 */
export const getBusinessBillRecordOtaSourceSumHotelMonth = (params) => {
    return http.request({
        url: [ Api.businessBill,'record/ota/source/sum/hotel/month'].join('/'),
        method: 'GET',
        params
    });
}

/**
 * @description: 根据酒店和月份统计订单来源
 */
export const getBusinessBillRecordSumHotelMonth = (params) => {
    return http.request({
        url: [ Api.businessBill,'record/plat/achieve/hotel/month'].join('/'),
        method: 'GET',
        params
    });
}

