import {createVNode} from 'vue'
import AccessTree from './components/access-tree.vue'
import {FormSchema} from "@/types/schema";
import { getSystemDictDataByType } from '@/api/system/user/index'

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
            label: "登录名称",
            field: "userName",
            value: '',
            props: {
                placeholder: "请输入登录名称"
            },
            rules: [
                {
                    required: true,
                    message: "登录名称不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "部门名称",
            field: "deptName",
            value: 'deptId',
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
            label: "用户姓名",
            field: "realName",
            value: '',
            props: {
                placeholder: "请输入用户姓名"
            },
            rules: [
                {
                    required: true,
                    message: "用户姓名不能为空"
                }
            ]
        },
        // {
        //     type: 'checkbox',
        //     label: '角色',
        //     field: 'roles',
        //     value: [],
        //     options: [],
        //     loading: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: '请选择角色',
        //         type: 'array'
        //       }
        //     ],
        //     asyncOptions: async () => {
        //       // 异步数据回调
        //       // 获取角色列表
        //       const { data } = await getAdminRole({})
        //       return data.map((item) => ({
        //         label: item.title,
        //         value: item.id
        //       }))
        //     }
        //   }
        {
            type: "input",
            label: "邮箱",
            field: "email",
            value: '',
            props: {
                placeholder: "请输入邮箱"
            },
            rules: [
                {
                    required: true,
                    message: "邮箱不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "手机",
            field: "phone",
            value: '',
            props: {
                placeholder: "请输入手机"
            },
            rules: [
                {
                    required: true,
                    message: "手机不能为空"
                }
            ]
        },
        {
            type: "select",
            label: "性别",
            field: "sex",
            value: '0',
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_user_sex' }
                const res = await getSystemDictDataByType (params)
                return res.data
            }
        },
        {
            type: "switch",
            label: "状态",
            field: "status",
            value: '0',
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

