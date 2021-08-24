import {FormSchema} from "@/types/schema";
import {getDict} from "@/hooks/dict-list";
import {createVNode} from 'vue'
import {DatePicker} from "ant-design-vue";

export const formSearch = (): FormSchema => ({
    style: {
        width: "auto",

    },
    formItemLayout: {
        layout: 'inline'
    },
    formItem: [
        {
            type: "input",
            label: "订单单号",
            field: "orderSn",
            value: '',
            props: {
                placeholder: "请输入单号",
            },

        },
        {
            type: "select",
            label: "退款结果",
            field: "status",
            props: {
                placeholder: "请输入",
            },
            value: '',
            loading: true,
            asyncOptions:async () => {
                    let data = await getDict(
                        'business_refund_status',
                        '',
                        true
                    )
                    data = [{label: '所有退款结果', value: ''}, ...data]
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
