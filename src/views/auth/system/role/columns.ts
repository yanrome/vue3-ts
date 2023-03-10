import { adminRoleRemove, adminRoleEdit } from "@/api/system/role";
import { systemRoleTemplateMenuEdit, systemRoleMenuEdit, systemRoleRule } from "@/api/system/menu/index";
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
        dataIndex: 'roleName',
        width:150,
    },
    {
        title: '角色标志',
        dataIndex: 'name',
        width:200,
    },
    {
        title: '显示顺序',
        dataIndex: 'orderNum',
        width:100,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width:100,
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
        dataIndex: 'remark',
        width:150,
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 400,
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
                        const params = {
                            roleId: modelRef.id,
                            menuIds: modelRef.key.checked.toString()   
                        }
                        return await systemRoleTemplateMenuEdit(params).then(() => refreshTableData())
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
                        const params = {
                            roleId: modelRef.id,
                            menuIds: modelRef.key.checked.toString()   
                        }
                        return await systemRoleMenuEdit(params).then(() => refreshTableData())
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
                        const params = {
                            id:modelRef.id,
                            dataScope: modelRef.dataScope,
                            deptIds:modelRef.dataScope == '3'?modelRef.deptIds:'',
                        }
                        // return await systemRoleRule(params).then(() => refreshTableData())
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
