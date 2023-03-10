import http from '@/utils/http/axios';
import {
  GetByUserIdParams,
  GetMenuListByUserIdResult,
  GetAuthCodeByUserIdResult,
} from './model/menuModel';

enum Api {
  adminMenus = '/system/menu/byrole',
  GetBtnCodeListByUserId = '/getBtnCodeListByUserId',
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus(params) {
  return http.request<GetMenuListByUserIdResult>({
    url: Api.adminMenus,
    method: 'GET',
      params:{...params,menuScene:1},
  });
}

/**
 * 根据用户Id获取权限编码
 * @param params
 */
export function getBtnCodeListByUserId(params: GetByUserIdParams) {
  return http.request<GetAuthCodeByUserIdResult>({
    url: Api.GetBtnCodeListByUserId,
    method: 'GET',
    params,
  });
}
