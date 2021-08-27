import { useCreateModal } from '@/hooks'
import AddModal from './add-modal.vue'
import { adminMenuEdit, adminMenuAdd, adminMenuRemove } from '@/api/system/menu/index'
import { TableColumn } from "@/types/tableColumn";
import { useFormModal } from "@/hooks/useFormModal";
import { getSystemDictDataByType } from '@/api/system/user/index'
import { getFormSchema } from "./form-schema";
import { formatDate } from '@/utils/common'
import { message } from 'ant-design-vue'
import { IconFont } from '@/components/iconfont'
import { createVNode } from 'vue'
import { Tag } from "ant-design-vue";
import { menuSceneStatus, menuTypeStatus, menuVisibleStatus } from "@/utils/dict";

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
        slotsType:'component',
        slots: {
            customRender: 'menuScene'
        },
        slotsFunc:  (record)=>{
            return createVNode(Tag,{
                // color: menuSceneStatus[record.menuScene].color || 'red'
            },menuSceneStatus[record.menuScene].txt)
        }
        // slotsFunc: async ()=>{
        //     const res = await getSystemDictDataByType ({ dictType:'sys_menu_type' })
        //     console.log('231214124141你到家我的女own', res )
        //     // return res.data.map(item => item)
        // },
    },
    {
        title: '请求地址',
        dataIndex: 'url'
    },
    {
        title: '类型',
        dataIndex: 'menuType',
        slotsType:'component',
        slots: {
            customRender: 'menuType'
        },
        slotsFunc:  (record)=>{
            return createVNode(Tag,{
                // color:menuTypeStatus[record.menuType].color  || 'red'
            },menuTypeStatus[record.menuType].txt)
        }
    },
    {
        title: '可见',
        dataIndex: 'visible',
        slotsType:'component',
        slots: {
            customRender: 'visible'
        },
        slotsFunc:  (record)=>{
            return createVNode(Tag,{
                // color:menuVisibleStatus[record.visible].color || 'red'
            },menuVisibleStatus[record.visible].txt)
        }
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
                props: {
                    type: 'primary' // 按钮类型
                },
                func: ({ record }, refreshTableData) =>{
                    useFormModal({
                        title: '编辑菜单',
                        fields: record,
                        formSchema: getFormSchema(),
                        handleOk: async (modelRef, state) => {
                            const {
                                id,parentId , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible} = modelRef
                            const params = {
                                id,parentId , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible
                            }
                            // console.log('编辑菜单-参数',params)
                            return await adminMenuEdit(params).then(() => refreshTableData())
                        }
                    })
                } 
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '新增',
                props: {
                    type: 'warning', // 按钮类型，
                    background:"red",
                },
                func: ({ record }, refreshTableData) =>{
                    useFormModal({
                        title: '新增菜单',
                        fields: record,
                        formSchema: getFormSchema(),
                        handleOk: async (modelRef, state) => {
                            const {
                                id, menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible} = modelRef
                            const params = {
                                parentId:id , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible
                            }
                            console.log('新增菜单-参数',params)
                            return await adminMenuAdd(params).then(() => refreshTableData())
                        }
                    })
                }
            },
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                // permission: {
                //     // 权限
                //     action: 'delete', // 删除权限
                //     effect: 'disabled' // 没有权限时禁用按钮，不传effect则不显示按钮
                // },
                props: {
                    type: 'danger' // 按钮类型
                },
                func: async ({ record }, refreshTableData) => {
                    // 点击删除的回调
                    if (record.id < 6) {
                        return message.warn('系统预置菜单，不能删除！')
                    }
                    console.log('，，，',record.id)
                    return await adminMenuRemove(record.id).then(() => refreshTableData())
                }
            }
        ]
    }
]
