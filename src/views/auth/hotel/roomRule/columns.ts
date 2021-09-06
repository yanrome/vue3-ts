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
        title: '类型',
        dataIndex: 'roomRuleType',
        slotsType:"component",
        slots: {
            customRender: 'roomRuleType'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.roomRuleType,
                color:tagColor[record.roomRuleType],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return formatDict(res.status)
                    })
                }
            })
        }
    },

    {
        title: '内容',
        dataIndex: 'content',
    },
    {
        title: '提示',
        dataIndex: 'tip',
    },
    {
        title: '状态',
        dataIndex: 'status',
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
                    type: 'warning'
                },
                func: ({record}, refreshTableData) =>{
                    return useFormModal({
                        title: '编辑',
                        hiddenFields: ['content'],
                        fields: {
                            id:record.id,
                            roomRuleType:record.roomRuleType.toString(),
                            status: record.status.toString(),
                            tip:record.tip,
                        },
                        formSchema:formModal(dictData),
                        handleOk:async (data)=>{
                            console.log(data)
                        }
                    })
                }
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                props:{
                    type: 'danger' // 按钮类型
                },
                text: '删除',
                func: async ({record}, refreshTableData) => await postBusinessRoomDevRemove(record.id).then(() => refreshTableData()),
            },
        ]
    }

]
