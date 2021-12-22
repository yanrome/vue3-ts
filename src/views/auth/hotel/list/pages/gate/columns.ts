import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import {postBusinessRoomDevRemove} from "@/api/system/hotel/roomdev";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";
import {postBusinessRoomEdit, postBusinessRoomRemoveId} from "@/api/system/hotel/room";

export const columns = (dictData = {}): TableColumn[] => [
    {
        title: '大门ID',
        dataIndex: 'id',
    },
    {
        title: '大门名称',
        dataIndex: 'roomName',
    },
    {
        title: '大门Mac',
        dataIndex: 'mac',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },

    {
        title: '创建时间',
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
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '编辑',
                props: {
                    type: 'link'
                },
                func: ({record}, refreshTableData) =>{
                    return useFormModal({
                        title: '编辑',
                        fields: {
                            id:record.id,
                            roomName: record.roomName,
                            roomSn: record.roomSn,
                            mac: record.mac,
                            lockType: record.lockType,
                            password: record.password,
                            roomLevel:record.roomLevel
                        },
                        formSchema:formModal(),
                        handleOk:async (data)=>{
                            postBusinessRoomEdit(data).then(res=>{
                                refreshTableData()
                            })
                        }
                    })
                }
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                props:{
                    type: 'link' // 按钮类型
                },
                text: '删除',
                func: async ({record}, refreshTableData) => await postBusinessRoomRemoveId({id:record.id}).then(()=>refreshTableData()),
            },
        ]
    }

]
