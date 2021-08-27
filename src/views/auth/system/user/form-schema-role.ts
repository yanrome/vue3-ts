import { FormSchema } from "@/types/schema";
import { adminUserRoles, adminUserPlatRoles } from '@/api/system/user/index'

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchemaRole = (): FormSchema => ({
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
            type: 'checkbox',
            label: '角色',
            field: 'roles',
            value: [],
            options: [],
            loading: true,
            // 获取角色列表
            asyncOptions: async (currentValue,formInstance) => {
                const { id } = formInstance?.props.fields as any
                const res = await adminUserRoles(id)
                return res.data.map(item=>({
                        label: item.roleName,
                        value: item.name,
                        flag: item.flag,
                }))
            }
        }
    ]
})

