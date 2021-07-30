import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminUser = '/system/user/list',
  adminUserAdd = '/system/user/add',
  adminUserEdit = '/system/user/edit',
  adminUserAccess = '/admin/user_access',
  systemDictDataByType = `/system/dict/data/byType`,
}

/**
 * @description 人员管理
 * */
 export function getSystemDictDataByType(param) {
  return http.request({
    url: Api.systemDictDataByType,
    method: RequestEnum.GET,
    params:param
  })
}

/**
 * 获取人员权限资源列表
 * @param params
 */
export function getAdminUserAccess(id?: string | number) {
  return http.request({
    url: [Api.adminUserAccess, id].join('/'),
    method: RequestEnum.GET,
  });
}

/**
 * 获取人员管理
 * @param params
 */
export function adminUser(params) {
  return http.request({
    url: Api.adminUser,
    method: RequestEnum.POST,
    params,
  });
}

/**
 * 修改人员
 * @param params
 */
export function adminUserEdit(id, params) {
  return http.request({
    url: [Api.adminUserEdit, id].join('/'),
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建人员
 * @param params
 */
export function adminUserAdd(params) {
  return http.request({
    url: Api.adminUserAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}
