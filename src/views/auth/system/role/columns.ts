import { adminRoleRemove, adminRoleEdit } from "@/api/system/role";
import { formatDate } from '@/utils/common'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "./form-schema";
import { getFormSchemaModel } from "./form-schemaModel";
import { getFormSchemaData } from "./form-schemaData";
import { getFormSchemaMenu } from "./form-schemaMenu";
import { createVNode } from 'vue'
import { Tag } from "ant-design-vue";
import { roleStatus } from "@/utils/dict";

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
        dataIndex: 'status',
        slotsType:'component',
        slots:{
            customRender: 'status'
        },
        slotsFunc:  (record)=>{
            return createVNode(Tag,{
                color:roleStatus[record.status].color
            },roleStatus[record.status].txt)
        }
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
                type: 'button', 
                text: '编辑',
                props: {
                    type: 'warning'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑角色',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        modelRef.status = modelRef.status == true ? '1' : '0'
                        const {roleName, roleType,  name, orderNum, status, remark, id } = modelRef
                        const params = {
                            roleName, roleType,  name, orderNum, status, remark, id
                        }
                        return await adminRoleEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'button', 
                text: '模板菜单权限',
                props: {
                    type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '模板菜单权限',
                    fields: record,
                    formSchema: getFormSchemaModel(),
                    handleOk: async (modelRef, state) => {
                        // modelRef.status = modelRef.status == true ? '1' : '0'
                        // const {roleName, roleType,  name, orderNum, status, remark, id } = modelRef
                        // const params = {
                        //     roleName, roleType,  name, orderNum, status, remark, id
                        // }
                        // return await adminRoleEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'button', 
                text: '菜单权限',
                props: {
                    type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '菜单权限',
                    fields: record,
                    formSchema: getFormSchemaMenu(),
                    handleOk: async (modelRef, state) => {
                        // modelRef.status = modelRef.status == true ? '1' : '0'
                        // const {roleName, roleType,  name, orderNum, status, remark, id } = modelRef
                        // const params = {
                        //     roleName, roleType,  name, orderNum, status, remark, id
                        // }
                        // return await adminRoleEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'button', 
                text: '数据权限',
                props: {
                    type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '分配数据权限',
                    fields: record,
                    formSchema: getFormSchemaData(),
                    handleOk: async (modelRef, state) => {
                        // modelRef.status = modelRef.status == true ? '1' : '0'
                        // const {roleName, roleType,  name, orderNum, status, remark, id } = modelRef
                        // const params = {
                        //     roleName, roleType,  name, orderNum, status, remark, id
                        // }
                        // return await adminRoleEdit(params).then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', 
                text: '删除',
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await adminRoleRemove(record.id).then(() => refreshTableData()),
            }
        ]
    },
]
