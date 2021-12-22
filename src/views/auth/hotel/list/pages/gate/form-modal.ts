import {FormSchema} from "@/types/schema";
import {useStore} from "@/store";
const store = useStore()
import {changeDict} from "@/utils/common";
import {getDict} from "@/hooks/dict-list";
import {formatDict} from "@/utils/common";
import {DictActions} from "@/store/modules/dict/actions";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const formModal = (dictData = {}): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "大门名称",
            field: "roomName",
            value: '',
            props: {
                placeholder: "请输入"
            },
            rules: [
                {
                    required: true,
                    message: "不能为空",
                }
            ]
        },
        {
            type: "input",
            label: "大门编号",
            field: "roomSn",
            value: '',
        },
        {
            type: "input",
            label: "大门Mac",
            field: "mac",
            value: '',
        },
        {
            type: "input",
            label: "大门密码",
            field: "password",
            value: '',
        },
        {
            type: "radio",
            label: "房间等级",
            field: "roomLevel",
            value: 1,
            asyncOptions:async () =>{
                const roomLevel =  await store.dispatch(DictActions.getDict,{dictType:'business_room_level'})
                return  changeDict(roomLevel,true)
            },
        },
        {
            type: "radio",
            label: "锁类型",
            field: "lockType",
            value: 1,
            asyncOptions:async () =>{
                const roomLevel =  await store.dispatch(DictActions.getDict,{dictType:'business_lock_type'})
                return  changeDict(roomLevel,true)
            },
        },
    ]
})


