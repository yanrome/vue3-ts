import {FormSchema} from "@/types/schema";
import {createVNode} from 'vue'
import {DatePicker} from "ant-design-vue";

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
            label: "姓名名称",
            field: "realName",
            value: '',
            props: {
                placeholder: "请输入编号",
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
