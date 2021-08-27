import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  adminMenu = '/system/menu/list',
  adminMenuAdd = '/system/menu/add',
  adminMenuEdit = '/system/menu/edit',
  adminMenuRemove = '/system/menu/remove',
  adminMenuAccess = '/admin/menu_access',
  // 模板api
  systemMenuMenuTreeData='/system/menu/menuTreeData',

  systemMenuRoleMenuTreeData = '/system/menu/roleMenuTreeData',
  systemRoleMenuEdit = '/system/role/menu/edit',
  
  systemMenuTemplateRoleMenuTreeData = '/system/menu/template/roleMenuTreeData',
  systemRoleTemplateMenuEdit = '/system/role/template/menu/edit',

  systemRoleRule = '/system/role/rule',
  systemDeptRoleDeptTreeData = '/system/dept/roleDeptTreeData',
}

/**
 * 获取菜单权限资源列表
 * @param params
 */
export function getAdminUserAccess(id?: string | number) {
  return http.request({
    url: [Api.adminMenuAccess, id].join('/'),
    method: RequestEnum.GET,
  });
}

/**
 * 获取菜单列表
 * @param params
 */
export function adminMenu(params) {
  return http.request({
    url: Api.adminMenu,
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 修改菜单
 * @param params
 */
export function adminMenuEdit(params) {
  return http.request({
    url: Api.adminMenuEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}

/**
 * 删除菜单
 * @param params
 */
 export function adminMenuRemove(id) {
  return http.request({
    url: [Api.adminMenuRemove,id].join('/'),
    method: RequestEnum.POST,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建菜单
 * @param params
 */
export function adminMenuAdd(params) {
  return http.request({
    url: Api.adminMenuAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}

// 模板api

/**
 * 查询所有菜单列表树
 * @param params
 */
 export function systemMenuMenuTreeData() {
  return http.request({
    url: Api.systemMenuMenuTreeData,
    method: RequestEnum.GET,
  })
}

/**
 * 查询角色对应所有---模板菜单---列表树
 * @param params
 */
 export function systemMenuTemplateRoleMenuTreeData(roleId) {
  return http.request({
    url: [Api.systemMenuTemplateRoleMenuTreeData, roleId].join('/'),
    method: RequestEnum.GET,
  })
}

/**
 * 编辑---角色模板菜单---
 * @param params
 */
 export function systemRoleTemplateMenuEdit(params) {
  return http.request({
    url: Api.systemRoleTemplateMenuEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}

/**
 * 查询角色对应所有---角色菜单---列表树
 * @param params
 */
 export function systemMenuRoleMenuTreeData(roleId) {
  return http.request({
    url: [Api.systemMenuRoleMenuTreeData, roleId].join('/'),
    method: RequestEnum.GET,
  })
}

/**
 * 编辑---角色菜单---
 * @param params
 */
 export function systemRoleMenuEdit(params) {
  return http.request({
    url: Api.systemRoleMenuEdit,
    method: RequestEnum.POST,
    params
  })
}


/**
 * 编辑---数据权限---
 * @param params
 */
 export function systemRoleRule(params) {
  return http.request({
    url: Api.systemRoleRule,
    method: RequestEnum.POST,
    params
  })
}

/**
 * 编辑---数据权限-自定义数据权限---
 * @param params
 */
 export function systemDeptRoleDeptTreeData(id) {
  return http.request({
    url: [Api.systemDeptRoleDeptTreeData,id].join('/'),
    method: RequestEnum.GET,
  })
}





