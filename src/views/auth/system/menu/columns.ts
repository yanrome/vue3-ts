import { useCreateModal } from '@/hooks'
import AddModal from './add-modal.vue'
import { adminMenuEdit, adminMenuRemove } from '@/api/system/menu/index'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getSystemDictDataByType } from '@/api/system/user/index'
import { getFormSchema } from "./form-schema";
import { formatDate } from '@/utils/common'
import { message } from 'ant-design-vue'
import { IconFont } from '@/components/iconfont'
import { createVNode } from 'vue'

export const columns: TableColumn[] = [
    // 资源管理
    {
        title: '',
        dataIndex: 'menuName',
        slots: {
            customRender: 'moduleName'
        }
    },
    {
        title: '菜单名称',
        dataIndex: 'menuName'
    },
    {
        title: '场景',
        dataIndex: 'menuScene',
        actions: [],
        slotsFunc:  ()=>{
            alert('231214124141你到家我的女own')
            const res =  getSystemDictDataByType ({ dictType:'sys_menu_type' })
            // return res.data.map(item => item)
        },
    },
    {
        title: '请求地址',
        dataIndex: 'url'
    },
    {
        title: '类型',
        dataIndex: 'menuType'
    },
    {
        title: '可见',
        dataIndex: 'visible'
    },
    {
        title: '权限标识',
        dataIndex: 'perms'
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
                // permission: {
                //     // 权限
                //     action: 'update',
                //     effect: 'disabled'
                // },
                props: {
                    type: 'primary' // 按钮类型
                },
                func: ({ record }, refreshTableData) =>{
                    
                   return useFormModal({
                        title: '编辑菜单',
                        fields: {menuScene:record.menuScene,menuType:record.menuType,menuName:record.menuName},
                        formSchema: getFormSchema(),
                        handleOk: async (modelRef, state) => {
                            
                            const {menuScene, menuType, menuName} = modelRef
    
                            const params = {
                                menuScene, menuType,
                                menuName
                            }
                            debugger
                            return await adminMenuEdit(params).then(() => refreshTableData())
                        }
                    })
                } 
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '新增',
                // permission: {
                //     // 权限
                //     action: 'update',
                //     effect: 'disabled'
                // },
                props: {
                    type: 'warning', // 按钮类型，
                    background:"red",
                },
                func: ({ record }, callback) =>
                    useCreateModal(AddModal, {
                        // 点击删除的回调
                        fields: record,
                        callback
                    })
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                permission: {
                    // 权限
                    action: 'delete', // 删除权限
                    effect: 'disabled' // 没有权限时禁用按钮，不传effect则不显示按钮
                },
                props: {
                    type: 'danger' // 按钮类型
                },
                func: async ({ record }, refreshTableData) => {
                    // 点击删除的回调
                    if (record.id < 6) {
                        return message.warn('系统预置菜单，不能删除！')
                    }
                    return await adminMenuRemove(record.id).then(() => refreshTableData())
                }
            }
        ]
    }
]
