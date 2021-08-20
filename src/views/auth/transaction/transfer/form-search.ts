import {FormSchema} from "@/types/schema";
import {getDict} from "@/hooks/dict-list";
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
            label: "编号",
            field: "transferSn",
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
                    let data = await getDict(
                        'business_transfer_status',
                        '',
                        true
                    )
                    data = [{label: '所有结果', value: ''}, ...data]
                    return data
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
