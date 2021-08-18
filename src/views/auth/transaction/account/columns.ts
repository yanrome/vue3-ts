import {TableColumn} from "@/types/tableColumn";

export const columns: TableColumn[] = [
    {
        title: '业务单号',
        dataIndex: 'accountFlowSn',
    },
    {
        title: '交易金额',
        dataIndex: 'accountAmount',
    },
    {
        title: '业务类型',
        dataIndex: 'accountAmount',
    },
    {
        title: '实时余额',
        dataIndex: 'accountAmountLeft',
    },
    {
        title: '支付方式',
        dataIndex: 'payment',
    },
    {
        title: '交易时间',
        dataIndex: 'createTime',
    },

]
