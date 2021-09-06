import {createVNode} from 'vue'
import AccessTree from "./components/access-tree.vue"
import {FormSchema} from "@/types/schema";
import { getSystemDictDataByType } from '@/api/system/user/index'
import { systemMenuMenuTreeData } from '@/api/system/menu/index'
import { adminUserAdd } from "@/api/system/user/index";
import {adminMenu} from "@/api/system/menu/index";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: createVNode(AccessTree),
            label: '上级菜单',
            field: 'id',
            value: null
        },
        {
            type: "radio",
            label: "菜单类型",
            field: "menuType",
            value: 0,
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_menu_type' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
            }
        },
        {
            type: "radio",
            label: "菜单场景",
            field: "menuScene",
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_menu_scene' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
            }
        },
        {
            type: "input",
            label: "菜单名称",
            field: "menuName",
            value: '',
            props: {
                placeholder: "请输入菜单名称"
            },
            rules: [
                {
                    required: true,
                    message: "菜单名称不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "请求地址",
            field: "url",
            value: '',
            props: {
                placeholder: "请输入请求地址"
            }
        },
        {
            type: "input",
            label: "权限标识",
            field: "perms",
            value: '',
            props: {
                placeholder: "请输入权限标识"
            },
            rules: [
                {
                    required: true,
                    message: "权限标识不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "显示排序",
            field: "orderNum",
            value: '',
            props: {
                placeholder: ""
            },
            rules: [
                {
                    required: true,
                    message: "显示排序不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "图标",
            field: "icon",
            value: '',
            props: {
                placeholder: ""
            }
        },
        {
            type: "radio",
            label: "菜单状态",
            field: "visible",
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_show_hide' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
            }
        }
    ]
})

