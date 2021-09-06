import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import {postBusinessRoomDevRemove} from "@/api/system/hotel/roomdev";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";

export const columns = (dictData): TableColumn[] => [
    {
        title: '酒店编号',
        dataIndex: 'hotelSn',
    },
    {
        title: '姓名',
        dataIndex: 'realName',
    },
    {
        title: '类型',
        dataIndex: 'roomType',
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },

    // {
    //     title: '操作',
    //     dataIndex: 'action',
    //     width: 200,
    //     slots: {
    //         customRender: 'action'
    //     },
    //     actions: [
    //         {
    //             type: 'button', // 控制类型，默认为a,可选： select | button | text
    //             text: '编辑',
    //             props: {
    //                 type: 'warning'
    //             },
    //             func: ({record}, refreshTableData) =>{
    //                 return useFormModal({
    //                     title: '编辑',
    //                     fields: {
    //                         id:record.id,
    //                         devName:record.devName,
    //                         devDomain: record.devDomain.toString(),
    //                         devType: record.devType.toString(),
    //                         sort:record.sort,
    //                     },
    //                     formSchema:formModal(dictData),
    //                     handleOk:async (data)=>{
    //                         console.log(data)
    //                     }
    //                 })
    //             }
    //         },
    //         {
    //             type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
    //             props:{
    //                 type: 'danger' // 按钮类型
    //             },
    //             text: '删除',
    //             func: async ({record}, refreshTableData) => await postBusinessRoomDevRemove(record.id).then(() => refreshTableData()),
    //         },
    //     ]
    // }

]
