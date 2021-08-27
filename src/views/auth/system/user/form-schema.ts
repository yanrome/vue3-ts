import {createVNode} from 'vue'
import AccessTreeSelect from './components/access-tree-select.vue'
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
            type: createVNode(AccessTreeSelect),
            label: "部门名称",
            field: "deptId",
            value: '',
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
            value: 0,
            asyncOptions: async (currentValue, formInstance) => {
                const params = { dictType:'sys_user_sex' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
            }
        },
        {
            type: "switch",
            label: "状态",
            field: "status",
            value: {
                type:Number
            }
        },
    ]
})

