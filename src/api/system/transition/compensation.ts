import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    accountFlowList = '/business/compensation',
}

/**
 * 分页获取账户流水列表
 * @param params
 */
export function postCompensationList(params) {
    return http.request({
        url: [Api.accountFlowList,'list'].join('/'),
        method: RequestEnum.POST,
        params
    });
}

/**
 * @description  支付
 * */
export function postCompensationPay(id) {
    return http.request({
        url: [Api.accountFlowList,'pay',id].join('/'),
        method: RequestEnum.POST,
    });
}

