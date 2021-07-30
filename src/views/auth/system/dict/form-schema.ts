import { FormSchema } from "@/types/schema";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "字典名称",
            field: "dictName",
            value: '',
            props: {
                placeholder: "请输入字典名称"
            },
            rules: [
                {
                    required: true,
                    message: "字典名称不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "字典类型",
            field: "dictType",
            value: "",
            props: {
                placeholder: "请输入字典类型"
            },
            rules: [
                {
                    "required": true,
                    "message": "字典类型不能为空"
                }
            ]
        },
        {
            type: "textarea",
            label: "备注",
            field: "remark",
            value: "",
            props: {
                placeholder: "备注信息"
            }
        },
    ]
})


