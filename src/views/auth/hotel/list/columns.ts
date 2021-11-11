import {TableColumn} from "@/types/tableColumn";
import {createVNode} from 'vue'
import {antTag} from '@/components/tag'
import {tagColor} from "@/utils/dict";
import {postBusinessRoomDevRemove} from "@/api/system/hotel/roomdev";
import {useFormModal} from "@/hooks";
import { formModal } from './form-modal'
import {formatDict} from "@/utils/common";

export const columns = (dictData): TableColumn[] => [
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


]
