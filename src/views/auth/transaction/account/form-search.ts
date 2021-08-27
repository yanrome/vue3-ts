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
            label: "业务单号",
            field: "accountFlowSn",
            value: '',
            props: {
                placeholder: "请输入单号",
            },

        },
        {
            type: "select",
            label: "支付方式",
            field: "payment",
            props: {
                placeholder: "请输入单号",
            },
            value: '',
            loading: true,
            asyncOptions:async () => {
                    let data = await getDict(
                        'business_payment',
                        'businessPayment',
                        true
                    )
                    data = [{label: '所有支付方式', value: ''}, ...data]
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
