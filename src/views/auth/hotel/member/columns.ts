import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import { businessMemberLevelTemplateEdit, businessMemberLevelTemplateRemove } from "@/api/system/hotel/member";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";

export const columns = (dictData): TableColumn[] => [
    {
        title: '名称',
        width: 200,
        dataIndex: 'levelName',
    },
    {
        title: '门槛间夜',
        width: 100,
        dataIndex: 'thresholdDay',
    },
    {
        title: '创建时间',
        width: 200,
        dataIndex: 'createTime',
    },
    {
        title: '图片',
        width: 200,
        dataIndex: 'bgUrl',
        key: 'bgUrl',
        slots: {
            customRender: 'pic'
        }
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
                type: 'button',
                text: '编辑',
                props: {
                    type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑用户',
                    fields: record,
                    formSchema: formModal(''),
                    handleOk: async (modelRef, state) => {
                        const { id, levelName, levelSort, levelDiscount, thresholdDay, depositUnpay, defaultLevel, bgUrl } = modelRef
                        const params = {
                            id, levelName, levelSort, levelDiscount, thresholdDay, depositUnpay, defaultLevel, bgUrl
                            }
                        await businessMemberLevelTemplateEdit(params)
                        .then(_ => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm',
                text: '删除',
                props:{
                    type: 'danger' 
                },
                func: async ({record}, refreshTableData) => await businessMemberLevelTemplateRemove(record.id).then(() => refreshTableData()),
            },
        ]
    }
]
