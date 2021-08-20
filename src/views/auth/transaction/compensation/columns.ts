import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import {message, Tag} from "ant-design-vue";
import {Popconfirm} from "ant-design-vue";

export const columns = (dictData): TableColumn[] => [
    {
        title: '支付编号',
        dataIndex: 'compensationSn',
    },
    {
        title: '补偿对象',
        dataIndex: 'receiver',
        slotsType:"component",
        slots: {
            customRender: 'receiver'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.receiver,
                color:tagColor[record.receiver],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.receiver
                    })
                }
            })
        }
    },
    {
        title: '补偿金额',
        dataIndex: 'amount',
    },
    {
        title: '实际补偿金额',
        dataIndex: 'realAmount',
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
        title: '备注',
        dataIndex: 'remark',
    },
    {
        title: '状态',
        dataIndex: 'status',
        slotsType:"component",
        slots: {
            customRender: 'status'
        },
        slotsFunc:(record)=>{
            return createVNode(Tag,{
                color:tagColor[record.status],
            },record.status ? '已支付':'未支付')
        }
    },

    {
        title: '操作时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 200,
        slots: {
            customRender: 'action'
        },
        actions: [

            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                props:{
                    title:'您确定要支付吗？',
                    type: 'danger' // 按钮类型
                },
                text: '支付',
                func: ({ record }, callback) =>{

                }
            },

        ]
    }
]
