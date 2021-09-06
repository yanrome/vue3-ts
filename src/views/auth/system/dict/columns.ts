import { formatDate } from '@/utils/common'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "@/views/auth/system/dict/form-schema";
// import { getFormList } from "@/views/auth/system/dict";
import { adminDictRemove, adminDictEdit } from "@/api/system/dict";
import  router  from '@/router';


export const columns: TableColumn[] = [ // 字典表格
    {
        title: '字典名称',
        dataIndex: 'dictName',
    },
    {
        title: '字典类型',
        dataIndex: 'dictType',
    },
    {
        title: '备注',
        dataIndex: 'category',
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
                    handleOk: async (modelRef, state) =>
                    await adminDictEdit(modelRef).then(_ => refreshTableData())
                })
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '列表',
                props: {
                    type: 'warning'
                },
                func:({record}, refreshTableData)=>{
                    router.push({
                        path: '/system/dict/list',
                        // query: {
                        //     id:'111'
                        // }
                    })
                },
                // func: ({record}, refreshTableData) => useFormModal({
                //     title: '编辑字典',
                //     fields: record,
                //     formSchema: getFormSchema()
                //     handleOk: async (modelRef, state) => await adminDictEdit(modelRef).then(_ => refreshTableData())
                // })
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
                func: async ({record}, refreshTableData) => await adminDictRemove(record.id).then(() => refreshTableData()),
            },
        ]
    },
]
