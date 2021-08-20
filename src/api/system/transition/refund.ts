import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    accountFlowList = '/business/refund',
}

/**
 * 分页获取账户流水列表
 * @param params
 */
export function postRefundList(params) {
    return http.request({
        url: [Api.accountFlowList,'list'].join('/'),
        method: RequestEnum.POST,
        params
    });
}
