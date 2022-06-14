import {TableColumn} from "@/types/tableColumn";
import {createVNode,h} from "vue";
import {DatePicker, Image} from "ant-design-vue";
import {antTag} from "@/components/tag";
import {tagColor} from "@/utils/dict";

export const columns = (): TableColumn[] => [
    {
        title: '酒店房间',
        dataIndex: 'roomSn',
    },
    {
        title: '入住人',
        dataIndex: 'realName',
    },
    {
        title: '身份证号',
        dataIndex: 'idenIds',
    },
    {
        title: '地址',
        dataIndex: 'address',
    },
    {
        title: '民族',
        dataIndex: 'race',
    },
    {
        title: '入住时间',
        dataIndex: 'roomTime',
    },
    {
        title: '现场照片',
        dataIndex: 'image',
        slotsType:'component',
        slots: {
            customRender: 'image'
        },
        slotsFunc:(record)=>{
            return createVNode(Image,{
                src:`data:image/gif;base64,`+record.image,
                width:'30px',
                height:'50px',
            })
        }
    },

    {
        title: '证件照片',
        dataIndex: 'photo',
        slotsType:'component',
        slots: {
            customRender: 'photo'
        },
        slotsFunc:(record)=>{
            return createVNode(Image,{
                src:`data:image/gif;base64,`+record.photo,
                width:'30px',
                height:'50px',
            })
        }
    },
]
