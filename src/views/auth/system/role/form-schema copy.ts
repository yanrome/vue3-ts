import {createVNode} from 'vue'
import AccessTree from './components/access-tree--.vue'
import {FormSchema} from "@/types/schema";
import {getAdminRoleAccess} from "@/api/system/role";
import { getSystemDictDataByType } from '@/api/system/user/index'
import { Input } from 'ant-design-vue';

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
            type: "input",
            label: "角色名称",
            field: "roleName",
            value: '',
            props: {
                placeholder: "请输入角色名称"
            },
            rules: [
                {
                    required: true,
                    message: "角色名称不能为空"
                }
            ]
        },
        {
            type: 'select',
            label: "角色类型",
            field: "roleType",
            value: '',
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_user_sex' }
                const res = await getSystemDictDataByType (params)
                return res.data
            }
        },
        {
            type: "input",
            label: "角色标志",
            field: "name",
            value: '',
            props: {
                placeholder: "请输入角色标志"
            },
            rules: [
                {
                    required: true,
                    message: "角色标志不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "显示顺序",
            field: "orderNum",
            value: '',
            props: {
                placeholder: "请输入显示顺序"
            },
            rules: [
                {
                    required: true,
                    message: "显示顺序不能为空"
                }
            ]
        },
        {
            type: "switch",
            label: "状态",
            field: "status",
            value: ''
        },
        {
            type: "input",
            label: "备注",
            field: "remark",
            value: '',
            props: {
                placeholder: "请输入备注"
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
        //         const data = await getAdminRoleAccess(id)
        //         // 设置角色复选框选项
        //         return data.map(item => item.accessId)
        //     }
        // }
    ]
})

