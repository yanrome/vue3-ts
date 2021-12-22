import http from '@/utils/http/axios';

enum Api {
    'businessQiNiuAccessKey' = '/business/qiniu/accesskey'
}

/**
 * @description: 获取七牛云token
 */
export function getQiNiuToken(params) {
    return http.request({
        url: Api.businessQiNiuAccessKey,
        method: 'GET',
        params
    });
}
