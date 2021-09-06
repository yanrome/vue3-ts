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
            type: "select",
            label: "状态",
            field: "status",
            props: {
                placeholder: "请输入",
            },
            value: '1',
            options:[{label: '所有结果', value: ''}, {label: '已生效', value: '1'}, {label: '未生效', value: '0'}],

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
