import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

// 财务中心
enum Api {
  businessAiyoBillDashboard = `/business/aiyo/bill/dashboard`,
  businessAiyoBillTransfer = `/business/aiyo/bill/transfer`,
  businessAiyoBillUntransfer = `/business/aiyo/bill/untransfer`,
}


/**
 * @description 查询哎哟有房平台总账
 * */
export function businessAiyoBillDashboard() {
    return http.request({
        url: Api.businessAiyoBillDashboard,
        method: RequestEnum.GET,
  })
}

/**
 * @description 查询哎哟有房平台总账
 * */
export function businessAiyoBillTransfer(params) {
    return http.request({
        url: Api.businessAiyoBillTransfer,
        method: RequestEnum.GET,
        params,
    })
}

/**
 * @description 查询哎哟有房已转账明细
 * */
export function businessAiyoBillUntransfer(params) {
    return http.request({
        url: Api.businessAiyoBillUntransfer,
        method: RequestEnum.GET,
        params,
    })
}

/**
 * @description 查询哎哟有房未转账明细
 * */
// export function businessAiyoBillDashboard() {
//     return http.request({
//         url: Api.businessAiyoBillDashboard,
//         method: RequestEnum.GET,
//     })
// }


