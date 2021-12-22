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
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import { Tag } from "ant-design-vue";
import { menuSceneStatus, menuTypeStatus, menuVisibleStatus } from "@/utils/dict";

export const columns = (dictData): TableColumn[] => [
    // 资源管理
    {
        title: '',
        dataIndex: 'menuName',
        width:50,
        slots: {
            customRender: 'moduleName',
        }
    },
    {
        title: '菜单名称',
        dataIndex: 'menuName',
        width:150,
    },
    {
        title: '场景',
        dataIndex: 'menuScene',
        width:150,
        actions: [],
        slotsType:'component',
        slots: {
            customRender: 'menuScene'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.menuScene,
                color:tagColor[record.menuScene],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.sysMenuScene
                    })
                }
            })
        }
    },
    {
        title: '请求地址',
        dataIndex: 'url',
        width:150,
    },
    {
        title: '类型',
        dataIndex: 'menuType',
        width:100,
        slotsType:'component',
        slots: {
            customRender: 'menuType'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.menuType,
                color:tagColor[record.menuType],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.sysMenuType
                    })
                }
            })
        }
    },
    {
        title: '可见',
        dataIndex: 'visible',
        width:100,
        slotsType:'component',
        slots: {
            customRender: 'visible'
        },
        slotsFunc:(record)=>{
            return createVNode(antTag,{
                txt:record.visible,
                color:tagColor[record.visible],
                getTypeFun:()=>{
                    return dictData.then(res=>{
                        return res.sysShowHide
                    })
                }
            })
        }
    },
    {
        title: '权限标识',
        dataIndex: 'perms',
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
                    type: 'primary' // 按钮类型
                },
                func: ({ record }, refreshTableData) =>{
                    useFormModal({
                        title: '编辑菜单',
                        fields: record,
                        formSchema: getFormSchema(),
                        handleOk: async (modelRef, state) => {
                            const {
                                id, key, parentId , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible} = modelRef
                            const params = {
                                id:key, parentId:key == id?parentId:id , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible
                            }
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
                        fields: {id:record.id},
                        formSchema: getFormSchema(),
                        handleOk: async (modelRef, state) => {
                            const {
                                id , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible} = modelRef
                            const params = {
                                parentId: id , menuType, menuScene, menuName,
                                url, perms, orderNum, icon, visible
                            }
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
                    return await adminMenuRemove(record.id).then(() => refreshTableData())
                }
            }
        ]
    }
]
