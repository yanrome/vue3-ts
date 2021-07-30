// import {delAdminRole, patchAdminRole} from '@/api/system/role'
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";
import {signToRealName} from '@/utils/dictionary'

import {useFormModal} from '@/hooks/useFormModal'
// import { getFormSchema } from './form-schema'


export const userColumns: TableColumn[] = [
    // 角色列表
    {
        title: '顾客姓名',
        dataIndex: 'realName'
    },
    {
        title: '身份证号码',
        dataIndex: 'idenIds'
    },
    {
        title: '人脸识别',
        dataIndex: 'sign',
        slots: {
            customRender: 'sign'
        },
        slotsType: 'format',
        slotsFunc: (val) => signToRealName(val)
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
                text: '删除',
                permission: {
                    // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                    type: 'text'
                },
                // func: async ({record}, refreshTableData) =>
                //     await delAdminRole(record.id).then(() => refreshTableData())
            },
            // {
            //     type: 'button', // 控制类型，默认为a,可选： select | button | text
            //     text: '编辑',
            //     permission: {
            //         // 权限
            //         action: 'update',
            //         effect: 'disabled'
            //     },
            //     props: {
            //         type: 'warning'
            //     },
            //     func: ({ record }, refreshTableData) =>
            //         useFormModal({
            //             title: '编辑角色',
            //             fields: record,
            //             formSchema: getFormSchema(),
            //             handleOk: async (modelRef, state) => {
            //                 const { description, title, accessIdsList } = modelRef
            //
            //                 const params = {
            //                     description,
            //                     title,
            //                     accessIdsList: accessIdsList.toString()
            //                 }
            //                 return await patchAdminRole(record.id, params).then(() => refreshTableData())
            //             }
            //         })
            // }
        ]
    }
]
