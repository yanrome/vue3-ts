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
        title: '设施设备名称',
        dataIndex: 'devName',
    },

    {
        title: '设备范畴',
        dataIndex: 'devDomain',
        slotsType:"component",
        slots: {
            customRender: 'devDomain'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.devDomain,
                color:tagColor[record.devDomain],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return formatDict(res.devDomain)
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
                txt:record.devType,
                color:tagColor[record.devType],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return formatDict(res.status)
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
                        fields: {
                            id:record.id,
                            devName:record.devName,
                            devDomain: record.devDomain,
                            devType: record.devType,
                            sort:record.sort,
                        },
                        formSchema:formModal(dictData),
                        handleOk:async (data)=>{
                            debugger
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
