import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";

export const columns = (dictData): TableColumn[] => [
    {
        title: '企业付款编号',
        dataIndex: 'transferSn',
    },
    {
        title: '付款金额',
        dataIndex: 'transferAmount',
    },
    {
        title: '用户',
        dataIndex: 'sysUser.nickName',
    },

    {
        title: '退款类型',
        dataIndex: 'transferType',
        slotsType:"component",
        slots: {
            customRender: 'transferType'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.transferType,
                color:tagColor[record.transferType],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.type
                    })
                }
            })
        }
    },
    {
        title: '付款结果',
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
                        return res.status
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
