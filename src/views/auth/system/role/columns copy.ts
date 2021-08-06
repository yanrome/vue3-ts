import {adminRoleRemove, adminRoleEdit} from "@/api/system/role";
import {formatDate} from '@/utils/common'
import {TableColumn} from "@/types/tableColumn";
import {useFormModal} from "@/hooks/useFormModal";
import {getFormSchema} from "./form-schema";

export const columns: TableColumn[] = [ // 角色列表
    {
        title: '角色名称',
        dataIndex: 'roleName'
    },
    {
        title: '角色标志',
        dataIndex: 'name'
    },
    {
        title: '显示顺序',
        dataIndex: 'orderNum'
    },
    {
        title: '状态',
        dataIndex: 'status'
    },
    {
        title: '备注',
        dataIndex: 'remark'
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
                // permission: { // 权限
                //     action: 'update',
                //     effect: 'disabled'
                // },
                props: {
                    type: 'warning'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑角色',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        const {description, title, accessIdsList} = modelRef

                        const params = {
                            description, title,
                            accessIdsList: accessIdsList.toString()
                        }
                        return await adminRoleEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminRoleRemove(record.id).then(() => refreshTableData()),
            }
        ]
    },
]
