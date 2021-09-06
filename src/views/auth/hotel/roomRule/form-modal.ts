import {FormSchema} from "@/types/schema";

import {getDict} from "@/hooks/dict-list";
import {formatDict} from "@/utils/common";
import Cascader from './components/cascader.vue'
import {createVNode} from "vue";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const formModal = (dictData): FormSchema => ({
    formItem: [
        {
            type: "select",
            label: "类型",
            field: "roomRuleType",
            value: '1',
            asyncOptions: async (currentValue, formInstance) => {
              return  dictData.then(res=>{
                    return formatDict(res.status,true)
                })
            }
        },
        {
            type: createVNode(Cascader),
            label: "用户提示",
            field: "content",
            value: ['四川省','成都市'],
        },
        {
            type: "input",
            label: "用户提示",
            field: "tip",
            value: '',
        },

        {
            type: "select",
            label: "类型",
            field: "roomRuleType",
            value: '1',
            options:[{label: '已生效', value: '1'}, {label: '未生效', value: '0'}]
        },


    ]
})


