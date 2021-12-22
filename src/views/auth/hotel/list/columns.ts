import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import {postBusinessRoomDevRemove} from "@/api/system/hotel/roomdev";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";
import {postBusinessRoomRuleEdit, postBusinessRoomRuleRemove} from "@/api/system/hotel/roomRule";
import router from "@/router";
export const columns = (dictData,uRouter): TableColumn[] => [
    {
        title: '酒店编号',
        dataIndex: 'hotelSn',
    },
    {
        title: '酒店名称',
        dataIndex: 'hotelName',
    },
    {
        title: '省份',
        dataIndex: 'province',
    },
    {
        title: '城市',
        dataIndex: 'city',
    },
    {
        title: '位置',
        dataIndex: 'location',
    },
    {
        title: '状态',
        dataIndex: 'status',
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
                type: 'button',
                text: '房型管理',
                props: {
                    type: 'link'
                },
                func:({record}, refreshTableData)=>{
                    router.push({path:'/business/hotel/scale',query:{id:record.id}})
                },
            },
            {
                type: 'button',
                text: '相册',
                props: {
                    type: 'link'
                },
                func:({record}, refreshTableData)=>{
                    router.push({path:'/business/hotel/picture',query:{id:record.id}})
                },
            },
            {
                type: 'button',
                text: '大门',
                props: {
                    type: 'link'
                },
                func:({record}, refreshTableData)=>{
                    router.push({path:'/business/hotel/gate',query:{id:record.id}})
                },
            },
        ]
    }


]



    /***
     *
     * const uRouter = useRouter()
     const component =  ()=>import('./components/room-scale.vue')
     const addRouter = {
                            component:component,
                            meta: {
                                title: '编辑',
                                icon: 'icon-zhuomian',
                                keepAlive: true,
                                reload: false,
                                componentName: component.name,
                                hidden: true
                            },
                            name: '/hotel/scale' || '',
                            path: '/hotel/scale',
                            props: false
                        }
     uRouter.addRoute('hotel',addRouter)
     uRouter.push({path:'/hotel/scale'})
     */
