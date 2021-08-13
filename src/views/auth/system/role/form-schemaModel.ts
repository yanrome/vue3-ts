import {createVNode} from 'vue'
import AccessTree from './components/access-tree-model.vue'
import {FormSchema} from "@/types/schema";
import {getAdminRoleAccess} from "@/api/system/role";
import { systemMenuTemplateRoleMenuTreeData } from '@/api/system/menu/index'
import { Input } from 'ant-design-vue';

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchemaModel = (): FormSchema => ({
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
            label: "模板菜单权限",
            field: 'id',
            value: [],
            // asyncValue: async (currentValue, formInstance) => {
            //     const { id } = formInstance?.props.fields as any
            //     // 获取角色列表
            //     const data = await systemMenuTemplateRoleMenuTreeData(id)
            //     console.log('获取角色列表',data)
            //     // 设置角色复选框选项
            //     return data.map((item) => item.id)
            // }
        }
    ]
})

