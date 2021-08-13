import { adminUserEdit, adminUserRemove, adminUserRoleEdit } from "@/api/system/user/index";
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getFormSchema } from "./form-schema";
import { getFormSchemaRole } from "./form-schema-role";
import { getSystemDictDataByType } from '@/api/system/user/index'
import tag from './components/tag.vue'
import { createVNode, render, VNode} from 'vue'
import { Tag } from "ant-design-vue";
import { sysUserSource } from "@/utils/dict";

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
        dataIndex: 'userSource',
        slotsType:'component',
        slots: {
            customRender: 'userSource'
        },
        slotsFunc:  (record)=>{
            return createVNode(Tag,{
                color:sysUserSource[record.userSource].color
            },sysUserSource[record.userSource].txt)
        }
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
                type: 'button', 
                text: '编辑',
                props: {
                  type: 'primary'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '编辑用户',
                    fields: record,
                    formSchema: getFormSchema(),
                    handleOk: async (modelRef, state) => {
                        const {userName, deptName,  realName, email, phone, sex, status, id } = modelRef
                        const params = {
                            userName, deptName,  realName, email, phone, sex, status, id
                        }
                            await adminUserEdit(params)
                            .then(_ => refreshTableData())
                    }
                })
            },
            {
                type: 'button', 
                text: '角色',
                props: {
                  type: 'warning'
                },
                func: ({record}, refreshTableData) => useFormModal({
                    title: '角色编辑',
                    fields: record,
                    formSchema: getFormSchemaRole(),
                    handleOk: async (modelRef, state) => {
                        let param = {
                            roleNames:(modelRef.roles).toString()
                        }
                        await adminUserRoleEdit(modelRef.id,param)
                        .then(() => refreshTableData())
                    }
                })
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => 
                    await adminUserRemove(record.id)
                    .then(() => refreshTableData()),
            },
        ]
    },
]
