import { adminUserEdit } from "@/api/system/user/index";
import { formatDate } from '@/utils/common'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "./form-schema";

export const columns: TableColumn[] = [ // 角色列表
    {
        title: '用户ID',
        dataIndex: 'id'
    },
    {
        title: '登陆名称',
        dataIndex: 'username',
    },
    {
        title: '用户姓名',
        dataIndex: 'realName'
    },
    {
        title: '昵称',
        dataIndex: 'nickName'
    },
    {
        title: '用户来源',
        dataIndex: 'isTest'
    },
    {
        title: '手机',
        dataIndex: 'phone'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime'
    },
    {
        title: '关联公众号',
        dataIndex: 'wxOpenId'
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
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                  type: 'danger'
                },
                // func: async ({record}, refreshTableData) => await delAdminRole(record.id).then(() => refreshTableData()),
            },
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
                        return await adminUserEdit(record.id, params).then(() => refreshTableData())
                    }
                })
            }
        ]
    },
]
