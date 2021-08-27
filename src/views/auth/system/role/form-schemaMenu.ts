import {createVNode} from 'vue'
import AccessTree from './components/access-tree-menu.vue'
import {FormSchema} from "@/types/schema";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchemaMenu = (): FormSchema => ({
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
            label: "菜单权限",
            field: 'key',
            value: []
        }
    ]
})

