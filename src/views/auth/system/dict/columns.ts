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
        width:150,
    },
    {
        title: '字典类型',
        dataIndex: 'dictType',
        width:200,
    },
    {
        title: '备注',
        dataIndex: 'category',
        width:100,
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        width:150,
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
                    type: 'primary'
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
                    const dict ={
                        dictType : record.dictType,
                        dictName : record.dictName
                    }
                    localStorage.setItem('z_dict', JSON.stringify(dict))
                    router.push({
                        path: '/system/dict/list',
                        query: {
                            dictType:record.dictType
                        }
                    })
                },
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
