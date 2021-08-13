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
            value: 0,
            asyncOptions: async () => {
                const params = { dictType:'sys_user_sex' }
                const res = await getSystemDictDataByType (params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
                
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
            value: {
                type:Number
            }
        },
        {
            type: "input",
            label: "备注",
            field: "remark",
            value: '',
            props: {
                placeholder: "请输入备注"
            }
        }
    ]
})

