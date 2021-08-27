import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";

export const columns = (dictData): TableColumn[] => [
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

        dataIndex: 'accountFlowType',
        slotsType:"component",
        slots: {
            customRender: 'accountFlowType'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt: record.accountFlowType,
                color:tagColor[record.accountFlowType],
                getTypeFun:()=>{
                   return dictData.then(res=>{
                        return res.accountFlowType
                    })
                }
            })
        }
    },
    {
        title: '实时余额',
        dataIndex: 'accountAmountLeft',
    },
    {
        title: '支付方式',
        dataIndex: 'payment',
        slotsType:"component",
        slots: {
            customRender: 'payment'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.payment,
                color:tagColor[record.payment],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.payment
                    })
                }
            })
        }
    },
    {
        title: '交易时间',
        dataIndex: 'createTime',
    },

]
