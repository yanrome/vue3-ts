import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminDept = '/system/dept/list',
  adminDeptAdd = '/system/dept/add',
  adminDeptEdit = '/system/dept/edit',
  adminDeptRemove = '/system/dept/remove',
  adminDeptAccess = '/admin/dept_access',
  adminDeptTreeData = '/system/dept/treeData',
  adminDictDedpByType = '/system/dict/dept/byType',
}

/**
 * 获取部门权限资源列表
 * @param params
 */
export function getAdminUserAccess(id?: string | number) {
  return http.request({
    url: [Api.adminDeptAccess, id].join('/'),
    method: RequestEnum.GET,
  });
}

/**
 * 获取部门列表
 * @param params
 */
export function adminDept(params?: any) {
  return http.request({
    url: Api.adminDept,
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 删除部门
 * @param params
 */
export function adminDeptRemove(id: string) {
  return http.request({
    url: [Api.adminDeptRemove, id].join('/'),
    method: RequestEnum.POST,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '删除成功'
  });
}

/**
 * 修改部门
 * @param params
 */
export function adminDeptEdit(params) {
  return http.request({
    url: Api.adminDeptEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建部门
 * @param params
 */
export function adminDeptAdd(params) {
  return http.request({
    url: Api.adminDeptAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}

/**
 * 获取部门列表
 * @param params
 */
 export function adminDeptTreeData() {
  return http.request({
    url: Api.adminDeptTreeData,
    method: RequestEnum.GET,
  });
}

/**
 * 获取部门权限资源列表
 * @param params
 */
 export function adminDictDedpByType(params) {
  return http.request({
    url: Api.adminDictDedpByType,
    method: RequestEnum.GET,
    params,
  });
}