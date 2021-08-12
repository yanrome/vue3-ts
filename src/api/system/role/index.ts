import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminRole = '/system/role/list',
  adminRoleAdd = '/system/role/add',
  adminRoleEdit = '/system/role/edit',
  adminRoleRemove = '/system/role/remove',
  adminRoleAccess = '/admin/role_access',
}

/**
 * 获取角色权限资源列表
 * @param params
 */
export function getAdminRoleAccess(id?: string | number) {
  return http.request({
    url: [Api.adminRoleAccess, id].join('/'),
    method: RequestEnum.GET,
  });
}

/**
 * 获取角色列表
 * @param params
 */
export function getAdminRole(params) {
  return http.request({
    url: Api.adminRole,
    method: RequestEnum.POST,
    params,
  });
}

/**
 * 删除角色
 * @param params
 */
export function adminRoleRemove(id: string) {
  return http.request({
    url: [Api.adminRoleRemove, id].join('/'),
    method: RequestEnum.POST,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '删除成功'
  });
}

/**
 * 修改角色
 * @param params
 */
export function adminRoleEdit(params) {
  return http.request({
    url: Api.adminRoleEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建角色
 * @param params
 */
export function adminRoleAdd(params) {
  return http.request({
    url: Api.adminRoleAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}
