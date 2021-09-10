import { FormSchema } from "@/types/schema";
import { dictListClass, dictDefault } from "@/utils/dict";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "字典标签",
            field: "dictLabel",
            value: '',
        },
        {
            type: "input",
            label: "字典键值",
            field: "dictValue",
            value: "",
        },
        {
            type: "input",
            label: "字典类型",
            field: "dictType",
            value: "",
        },
        {
            type: "input",
            label: "样式属性",
            field: "cssClass",
            value: "",
        },
        {
            type: "input",
            label: "字典排序",
            field: "dictSort",
            value: "",
        },
        {
            type: "select",
            label: "回显样式",
            field: "listClass",
            value: '',
            asyncOptions: async (currentValue, formInstance) => {
                return dictListClass
            }
        },
        {
            type: "radio",
            label: "系统默认",
            field: "isDefault",
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                return dictDefault
            }
        },
        {
            type: "input",
            label: "额外信息",
            field: "extraValue",
            value: "",
            // props: {
            //     placeholder: "请输入字典类型"
            // },
            // rules: [
            //     {
            //         "required": true,
            //         "message": "字典类型不能为空"
            //     }
            // ]
        },
    ]
})


