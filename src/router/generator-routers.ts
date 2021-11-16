import {adminMenus} from '@/api/system/menu'
import {constantRouterComponents} from './constantRouterComponents'
import router from "@/router/index";
import {routes} from "@/router/index";
import {notFound} from '@/router/modules/error'
import {Empty} from 'ant-design-vue'
import common from "@/router/common";
import {RouteRecordRaw} from "vue-router";

/**
 * 异步生成菜单树， 方案二
 * @param dataList
 */
const list2tree = (children) => {

    return children.map((item: any) => {
            const {children: child, id, url = '', icon, menuName, keepAlive = false,pathPrefix='',perms =''} = item
            let path = ''
            if (/http(s)?:/.test(url)) {
                path = url
            } else {
                path = url.startsWith('/') ? url : '/' + url
                path = url.startsWith(pathPrefix) ? path : pathPrefix + path
                path = [...new Set(path.split('/'))].join('/')
            }
            const hidden = perms.includes('metaHidden')
            const component =  constantRouterComponents[path] || Empty || (() => import('@/views/shared/error/404.vue'))
            return {
                children: list2tree(child),
                component: component,
                meta: {
                    title: menuName,
                    icon: icon || 'icon-zhuomian',
                    keepAlive: true,
                    reload: false,
                    componentName: component.name,
                    hidden: hidden
                },
                name: path.replace('/','') || '',
                path: path,
                props: false
            }
        })
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (): Promise<RouteRecordRaw[]> => {
    return new Promise((resolve, reject) => {
        adminMenus({}).then(result => {

            console.log('result', result)
            const menuNav: any = []
            const childrenNav = []
            const dataResult: any = result['data']

            //      后端数据, 根级树数组,  根级 PID
            // listToTree(data, childrenNav, 0)
            // rootRouter.children = childrenNav
            menuNav.push(childrenNav)

            const routeList = list2tree(dataResult)

            console.log('根据后端返回的权限路由生成', routeList)
            routeList.forEach(item => {
                // 设置模块重定向到菜单
                if (item.children?.length > 0 && !item.redirect) {
                    item.redirect = {name: item.children[0].name}
                }
            })
            const layout = routes.find(item => item.name == 'Layout')!
            layout.children = [
                ...common,
                ...routeList
            ]
            router.addRoute(layout)

            router.addRoute(notFound)
            resolve(layout.children)
        }).catch(err => {
            console.log('res', err)
            reject(err)
        })
    })
}
