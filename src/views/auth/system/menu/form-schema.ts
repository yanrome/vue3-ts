import {createVNode} from 'vue'
import AccessTree from "./components/access-tree.vue"
import {FormSchema} from "@/types/schema";
import { getSystemDictDataByType } from '@/api/system/user/index'
import { adminUserAdd } from "@/api/system/user/index";
import {adminMenu} from "@/api/system/menu/index";

const  treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
        },
      ],
    },
  ];

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
        // {
        //     type: "tree",
        //     label: "上级菜单",
        //     field: "menuTypes",
        //     treeOptions:treeData,
        //     value: '',
        //     props: {
        //         placeholder: "请输入上级菜单"
        //     },
        //     rules: [
        //         {
        //             required: true,
        //             message: "上级菜单不能为空"
        //         }
        //     ]
        // },
        {
            type: createVNode(AccessTree),
            label: '上级菜单',
            field: 'accessIdsList',
            value: [],
            asyncValue: async (currentValue, formInstance) => {
                // 获取角色列表
                // const data = await adminMenu({})
                // // 设置角色复选框选项
                // return data.map((item) => item.accessId)
            }
        },
        {
            type: "radio",
            label: "菜单类型",
            field: "menuType",
            value: '0',
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_menu_type' }
                const res = await getSystemDictDataByType (params)
                return res.data.map(item => item)
            }
        },
        {
            type: "radio",
            label: "菜单场景",
            field: "menuScene",
            value: '1',
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_menu_scene' }
                const res = await getSystemDictDataByType (params)
                return res.data.map(item => item)
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
            },
            rules: [
                {
                    required: true,
                    message: "请求地址不能为空"
                }
            ]
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
                    message: ""
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
            },
            rules: [
                {
                    required: true,
                    message: ""
                }
            ]
        },
        {
            type: "radio",
            label: "菜单状态",
            field: "visible",
            value: '0',
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_show_hide' }
                const res = await getSystemDictDataByType (params)
                return res.data.map(item => item)
            }
        },
        // {
        //     type: createVNode(AccessTree),
        //     label: "资源",
        //     field: "accessIdsList",
        //     value: [],
        //     asyncValue: async (currentValue, formInstance) => {
        //         const {id} = formInstance?.props.fields as any
        //         // 获取角色列表
        //         const data = await  adminUserAdd (id)
        //         // 设置角色复选框选项
        //         return data.map(item => item.accessId)
        //     }
        // }
    ]
})

