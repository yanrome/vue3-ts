import {FormSchema} from "@/types/schema";
import {getDict} from "@/hooks/dict-list";
import {createVNode} from 'vue'
import {DatePicker} from "ant-design-vue";
import {formatDict} from "@/utils/common";

export const formSearch = (dictData): FormSchema => ({
    style: {
        width: "auto",

    },
    formItemLayout: {
        layout: 'inline'
    },
    formItem: [
        {
            type: "input",
            label: "设施名称",
            field: "devName",
            value: '',
            props: {
                placeholder: "请输入编号",
            },

        },
        {
            type: "select",
            label: "状态",
            field: "status",
            props: {
                placeholder: "请输入",
            },
            value: '',
            loading: true,
            asyncOptions:async () => {
                return  dictData.then(res=>{
                    return  [{label: '所有结果', value: ''}, ...formatDict(res.status,true)]
                })
            },
        },
        {
            type: createVNode(DatePicker.RangePicker, {}),
            label: "选择时间",
            field: "time",
            value: '',
            props: {
                placeholder: "请输入单号",
                width: "350px"
            },

        },

    ]
})
