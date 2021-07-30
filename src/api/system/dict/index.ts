import http from '@/utils/http/axios';
import {RequestEnum} from '@/enums/httpEnum'

enum Api {
  // 数据字典
  adminDict = `/system/dict/list`,
  adminDictAdd = `/system/dict/add`,
  adminDictEdit = `/system/dict/edit`,
  adminDictRemove = `/system/dict/remove`,
  systemDictDataByType = `/system/dict/data/byType`,
  adminDictConfig = '/admin/dict_config',
  // 字典数据
  adminDataDict = `/system/dict/data/list`,
  adminDataDictAdd = `/system/dict/data/add`,
  adminDataDictEdit = `/system/dict/data/edit`,
  adminDataDictRemove = `/system/dict/data/remove`,

}


/*************************   数据字典  *****************************/ 
/**
 * @description 数据字典
 * */
export function getSystemDictDataByType(param) {
  return http.request({
    url: Api.systemDictDataByType,
    method: RequestEnum.GET,
    params:param
  })
}

/**
 * 获取数据字典管理列表
 * @param params
 */
export function adminDict(params) {
  return http.request({
    url: Api.adminDict,
    method: RequestEnum.POST,
    params,
  });
}

/**
 * 删除数据字典
 * @param params
 */
export function adminDictRemove(id: string) {
  return http.request({
    url: [Api.adminDictRemove, id].join('/'),
    method: RequestEnum.POST,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '删除成功'
  });
}

/**
 * 修改数据字典
 * @param params
 */
export function adminDictEdit(params) {
  return http.request({
    url: Api.adminDictEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建数据字典
 * @param params
 */
export function adminDictAdd(params) {
  return http.request({
    url: Api.adminDictAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}

/*************************   字典数据  *****************************/ 
/**
 * 获取数据字典管理列表
 * @param params
 */
 export function adminDataDict(params) {
  return http.request({
    url: Api.adminDataDict,
    method: RequestEnum.POST,
    params,
  });
}

/**
 * 删除数据字典
 * @param params
 */
export function adminDataDictRemove(id: string) {
  return http.request({
    url: [Api.adminDictRemove, id].join('/'),
    method: RequestEnum.POST,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '删除成功'
  });
}

/**
 * 修改数据字典
 * @param params
 */
export function adminDataDictEdit(params) {
  return http.request({
    url: Api.adminDataDictEdit,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '修改成功'
  });
}


/**
 * 新建数据字典
 * @param params
 */
export function adminDataDictAdd(params) {
  return http.request({
    url: Api.adminDataDictAdd,
    method: RequestEnum.POST,
    params,
  }, {
    isShowErrorMessage: true, // 是否显示错误提示信息
    successMessageText: '创建成功'
  });
}
