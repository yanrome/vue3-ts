import {FormSchema} from "@/types/schema";
import { memberDeposit, memberLevel } from "@/utils/dict";
import {getDict} from "@/hooks/dict-list";
import {formatDict} from "@/utils/common";
import { getBusinessHotelList } from "@/api/system/hotel/index";
import { getSystemDictDataByType } from "@/api/system/dict/index";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const formModal = (dictData): FormSchema => ({
    formItem: [
        {
            type: "select",
            label: "酒店名称",
            field: "hotelName",
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                let res = await getBusinessHotelList('')
                return res.data.map((item) => ({
                    label: item.hotelName,
                    value: item.id
                }))
            }
        },
        {
            type: "select",
            label: "渠道名称",
            field: "otaSourceName",
            value: '',
            asyncOptions: async (currentValue, formInstance) => {
                let params = {
                    dictType:'business_ota_source'
                }
                let res = await getSystemDictDataByType(params)
                return res.data.map((item) => ({
                    label: item.dictLabel,
                    value: Number(item.dictValue)
                }))
            }
        },
        {
            type: "input",
            label: "账户",
            field: "otaUserName",
            value: '',
        },
        {
            type: "input",
            label: "密码",
            field: "otaPassWord",
            value: '',
        },
        // {
        //     type: "radio",
        //     label: "默认等级",
        //     field: "defaultLevel",
        //     value: 1,
        //     asyncOptions: async (currentValue, formInstance) => {
        //         return memberLevel
        //     }
        // },
    ]
})


