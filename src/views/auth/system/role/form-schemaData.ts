import { createVNode } from 'vue'
import AccessTree from './components/access-tree-model.vue'
import { FormSchema } from "@/types/schema";
import { roleDataScope } from "../../../../utils/dict";

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
        },{
            type: 'select',
            label: "数据范围",
            field: 'dataScope',
            value: []
        }
    ]
})

