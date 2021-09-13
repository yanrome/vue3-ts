import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "@/views/auth/system/dict/dict-list/form-schema";
import { adminDataDictRemove, adminDataDictEdit } from "@/api/system/dict";


export const columns: TableColumn[] = [ // 字典表格
    {
        title: '字典标签',
        dataIndex: 'dictLabel',
    },
    {
        title: '字典键值',
        dataIndex: 'dictValue',
    },
    {
        title: '排序',
        dataIndex: 'dictSort',
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
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑字典',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) =>{
                    const { id, dictLabel, dictValue, dictType, cssClass, dictSort, listClass, isDefault, extraValue } = modelRef
                    const params = {
                        id, dictLabel, dictValue, dictType, cssClass, dictSort, listClass, isDefault, extraValue
                    }
                    await adminDataDictEdit(params).then(_ => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                // permission: { // 权限
                //     action: 'delete',
                //     effect: 'disabled'
                // },
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminDataDictRemove(record.id).then(() => refreshTableData()),
            },
        ]
    },
]
