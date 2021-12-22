import {FormSchema} from "@/types/schema";
import {DictActions} from "@/store/modules/dict/actions";
import {useStore} from "@/store";
const store = useStore()
import {changeDict} from "@/utils/common";

export const roomInfo = (dictData={}): FormSchema => ({
    style: {
        maxHeight: "calc( 100vh - 180px )",
    },
    formItem: [
        {
            type: "input",
            label: "房间名称",
            field: "roomName",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "房间编号",
            field: "roomSn",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "楼栋",
            field: "buildNum",
            value: '',
            props: {
                placeholder: "请输入",
                max:64
            },
        },
        {
            type: "input",
            label: "单元",
            field: "unit",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "楼层",
            field: "floor",
            value: '',
            props: {
                placeholder: "请选择",
                max: 10,
            },
        },

        {
            type: "radio",
            label: "房间等级",
            field: "roomLevel",
            value: '',
            asyncOptions:async () =>{
                const roomLevel =  await store.dispatch(DictActions.getDict,{dictType:'business_room_level'})
                return  changeDict(roomLevel,true)
            },
        },
        {
            type: "input-number",
            label: "分房排序",
            field: "roomSort",
            value: '',
            props: {
                placeholder: "请输入",
                max:32,
                min: 10
            },
        },
        {
            type: "input",
            label: "房间Mac",
            field: "mac",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },

        {
            type: "input",
            label: "门锁平台账号",
            field: "lockAppId",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "门锁平台密码",
            field: "lockAppSecret",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "门锁用户账号",
            field: "lockUserName",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "门锁用户密码",
            field: "lockUserPwd",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "门锁编号",
            field: "lockSn",
            value: '',
            props: {
                placeholder: "请输入",
                max:10
            },
        },
        {
            type: "input",
            label: "电表号",
            field: "ammeterNo",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "电表账号",
            field: "ammeterAccount",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
        {
            type: "input",
            label: "电表账号密码",
            field: "ammeterPassword",
            value: '',
            props: {
                placeholder: "请输入",
            },
        },
    ]
})
