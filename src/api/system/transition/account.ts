import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    accountFlowList = '/business/account',
}

/**
 * 分页获取账户流水列表
 * @param params
 */
export function postAccountFlowList(params) {
    return http.request({
        url: [Api.accountFlowList,'flow/list'].join('/'),
        method: RequestEnum.POST,
        params
    });
}
