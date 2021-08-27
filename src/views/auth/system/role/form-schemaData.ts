import { createVNode } from 'vue'
import AccessTree from './components/access-tree.vue'
import { FormSchema } from "@/types/schema";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchemaData = (): FormSchema => ({
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
            type: 'input',
            label: "角色名称",
            field: 'roleName',
            value: '',
        },
        {
            type: 'input',
            label: "名称标志",
            field: 'name',
            value: ''
        },
        {
            type: 'select',
            label: "数据范围",
            field: 'dataScope',
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                let dataList = [
                    { label:'全部数据权限', value:1 },
                    { label:'单位数据权限', value:2 },
                    { label:'自定义数据权限', value:3 },
                ]
                return dataList
            }
        },
        {
            type: createVNode(AccessTree),
            label: "数据权限",
            field: 'id',
            value: []
        }
    ]
})

