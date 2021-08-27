import {FormSchema} from "@/types/schema";

import {getDict} from "@/hooks/dict-list";
import {formatDict} from "@/utils/common";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const formModal = (dictData): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "设施名称",
            field: "devName",
            value: '',
            props: {
                placeholder: "请输入设备名称"
            },
            rules: [
                {
                    required: true,
                    message: "用户名不能为空",
                }
            ]
        },
        {
            type: "input",
            label: "排序",
            field: "sort",
            value: '',
        },
        {
            type: "select",
            label: "设备范畴",
            field: "devDomain",
            value: '1',
            asyncOptions: async (currentValue, formInstance) => {
              return  dictData.then(res=>{
                    return formatDict(res.devDomain,true)
                })
            }
        },
        {
            type: "select",
            label: "设备范畴",
            field: "devType",
            value: '0',
            asyncOptions: async (currentValue, formInstance) => {
                return  dictData.then(res=>{
                    return formatDict(res.status,true)
                })

            }
        },
    ]
})


