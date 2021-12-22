import {FormSchema} from "@/types/schema";


export const roomScale = (dictData={}): FormSchema => ({
    style: {
        maxHeight: "calc( 100vh - 180px )",
    },
    formItem: [
        {
            type: "input",
            label: "房型名称",
            field: "scaleName",
            value: '',
            props: {
                placeholder: "请输入房型名称",
            },
        },
        {
            type: "input",
            label: "房型简介",
            field: "brief",
            value: '',
            props: {
                placeholder: "请输入房型简介",
                max:64
            },
        },
        {
            type: "input",
            label: "房间大小",
            field: "roomSize",
            value: '',
            props: {
                placeholder: "请输入房间大小",
                max:10
            },
        },
        {
            type: "input-number",
            label: "房间数量",
            field: "roomNum",
            value: 1,
            props: {
                placeholder: "请选择",
                max: 10,
                min: 1
            },
        },
        {
            type: "input-number",
            label: "床数量",
            field: "bedNum",
            value: 1,
            props: {
                placeholder: "请选择",
                max: 10,
                min: 1
            },
        },
        {
            type: "input-number",
            label: "最长预订月份",
            field: "bookMonth",
            value: 3,
            props: {
                placeholder: "请选择",
                max:10,
                min:1
            },
        },


        {
            type: "input",
            label: "床宽",
            field: "bedSize",
            value: '',
            props: {
                placeholder: "请输入",
                max:32
            },
        },
        {
            type: "input",
            label: "清洁费用",
            field: "cleanAmount",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },

        {
            type: "input",
            label: "保洁费用",
            field: "cleaningAmount",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "水费",
            field: "waterPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "气费",
            field: "gasPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "电费",
            field: "elecPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "物业费",
            field: "propPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "垃圾费",
            field: "rubbishPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "停车费",
            field: "parkPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "宽带费",
            field: "broadBandPrice",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "textarea",
            label: "详细描述",
            field: "description",
            value: '',
            props: {
                placeholder: "请输入",
                max:128
            },
        },
    ]
})
