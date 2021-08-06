// import {delAdminRole, patchAdminRole} from '@/api/system/role'
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";
import {signToRealName} from '@/utils/dictionary'

import {useFormModal} from '@/hooks/useFormModal'
import {message} from "ant-design-vue";
// import { getFormSchema } from './form-schema'
const del = () =>{}

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
                props: {
                    type: 'danger' // 按钮类型
                },
                permission: { // 权限
                    action: 'delete',
                },
                func: ({record}, refreshTableData) => del()
            }

        ]
    }
]
