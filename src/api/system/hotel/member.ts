
import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
    businessMemberLevelTemplateAll = `/business/member/level/template/all`,
    businessMemberLevelTemplateAdd = `/business/member/level/template/add`,
    businessMemberLevelTemplateEdit = `/business/member/level/template/edit`,
    businessMemberLevelTemplateRemove = `/business/member/level/template/remove`,
}

/**
 * @description  获取会员列表
 * @param params
 */
export function businessMemberLevelTemplateAll() {
    return http.request({
        url: Api.businessMemberLevelTemplateAll,
        method: RequestEnum.GET,
    });
}

/**
 * @description  添加会员
 * @param  params
 * */
export function  businessMemberLevelTemplateAdd(params) {
    return http.request({
        url:Api.businessMemberLevelTemplateAdd,
        method:RequestEnum.POST,
        params
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}

/**
 * @description  修改会员
 * @param  params
 * */
 export function  businessMemberLevelTemplateEdit(params) {
    return http.request({
        url:Api.businessMemberLevelTemplateEdit,
        method:RequestEnum.POST,
        params
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}

/**
 * @description  删除会员
 * @param  id
 * */
 export function  businessMemberLevelTemplateRemove(id) {
    return http.request({
        url:[Api.businessMemberLevelTemplateRemove, id].join('/'),
        method:RequestEnum.POST,
    },{
        isShowErrorMessage: true, 
        successMessageText: '操作成功'
    });
}
