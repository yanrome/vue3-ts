import { adminDeptAdd, adminDeptEdit, adminDeptRemove } from "@/api/system/dept";
import { formatDate } from '@/utils/common'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "../system/dept/form-schema";

export const columns: TableColumn[] = [ // 角色列表
    {
        title: '部门名称',
        dataIndex: 'deptName'
    },
    {
        title: '省份',
        dataIndex: 'province',
    },
    {
        title: '地市',
        dataIndex: 'city'
    },
    {
        title: '排序',
        dataIndex: 'orderNum'
    },
    {
        title: '联系方式',
        dataIndex: 'phone'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime'
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
                        return await adminDeptEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '新增',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminDeptAdd(record.id).then(() => refreshTableData()),
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminDeptRemove(record.id).then(() => refreshTableData()),
            },
        ]
    },
]
