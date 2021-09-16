import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import { businessHotelOtaAccountRemove } from "@/api/system/hotel/ota";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";

export const columns = (dictData): TableColumn[] => [
    {
        title: '酒店名称',
        dataIndex: 'hotelName',
    },
    {
        title: '渠道名称',
        dataIndex: 'otaSourceName',
    },
    {
        title: '账户',
        dataIndex: 'otaUserName',
    },
    {
        title: '密码',
        dataIndex: 'otaPassWord',
    },
    {
        title: '状态',
        dataIndex: 'status',
        slotsType:'component',
        slots: {
            customRender: 'status'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.status,
                color:tagColor[record.status],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.businessOtaStatus
                    })
                }
            })
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        slots: {
            customRender: 'action'
        },
        actions: [
            {
                type: 'popconfirm', 
                text: '删除',
                props:{
                    type: 'danger' 
                },
                func: async ({record}, refreshTableData) => await businessHotelOtaAccountRemove(record.id).then(() => refreshTableData()),
            }
        ]
    }
]