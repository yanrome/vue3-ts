import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";

export const columns = (dictData): TableColumn[] => [
    {
        title: '退款编号',
        dataIndex: 'refundSn',
    },
    {
        title: '订单编号',
        dataIndex: 'order.orderSn',
    },
    {
        title: '退款金额',
        dataIndex: 'refuseAmount',
    },
    {
        title: '用户',
        dataIndex: 'sysUser.realName',
    },
    {
        title: '用户联系',
        dataIndex: 'sysUser.phone',
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
        title: '退款类型',
        dataIndex: 'refundType',
        slotsType:"component",
        slots: {
            customRender: 'refundType'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.refundType,
                color:tagColor[record.refundType],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.refundType
                    })
                }
            })
        }
    },
    {
        title: '退款结果',
        dataIndex: 'status',
        slotsType:"component",
        slots: {
            customRender: 'status'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.status,
                color:tagColor[record.status],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.refundStatus
                    })
                }
            })
        }
    },
    {
        title: '操作时间',
        dataIndex: 'recordTime',
    },

]
