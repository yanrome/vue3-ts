import { adminDeptAdd, adminDeptEdit, adminDeptRemove } from "@/api/system/dept";
import { formatDate } from '@/utils/common'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "./form-schema";

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
                type: 'button', 
                text: '编辑',
                props: {
                    type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑部门',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        const { province, orderNum, leader, phone, email, shareScale, shareRatio, deptName, id, parentId, key} = modelRef
                        const params = { province:province.province,
                            city:province.city, county:province.county, orderNum, 
                            leader, phone, email, shareScale, shareRatio, deptName:deptName, id: key,
                            parentId:id.id || parentId, }
                        return await adminDeptEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'button', 
                text: '新增',
                props: {
                  type: 'warning'
                },
                func: async ({record}, refreshTableData) => 
                useFormModal({
                    title: '新增部门',
                    fields: {id:record.id},
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        console.log('新增部门---参数',modelRef)
                        const {deptName, province, orderNum, leader, phone, email, shareScale, shareRatio, id} = modelRef
                        const params = {province:province.province || null,
                            city:province.city || null, county:province.county || null, deptName, orderNum, leader, phone, email, shareScale, shareRatio, parentId:id, }
                        return await adminDeptAdd(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', 
                text: '删除',
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminDeptRemove(record.id).then(() => refreshTableData()),
            },
        ]
    },
]
