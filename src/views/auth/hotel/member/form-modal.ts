import {FormSchema} from "@/types/schema";
import { memberDeposit, memberLevel } from "@/utils/dict";
import {getDict} from "@/hooks/dict-list";
import {formatDict} from "@/utils/common";

// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const formModal = (dictData): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "等级名称",
            field: "levelName",
            value: '',
        },
        {
            type: "input",
            label: "排序",
            field: "levelSort",
            value: '',
        },
        {
            type: "input",
            label: "等级折扣",
            field: "levelDiscount",
            value: '',
        },
        {
            type: "input",
            label: "门槛入住间夜",
            field: "thresholdDay",
            value: '',
        },
        {
            type: "radio",
            label: "是否免押金",
            field: "depositUnpay",
            value: 0,
            asyncOptions: async (currentValue, formInstance) => {
                return memberDeposit
            }
        },
        {
            type: "radio",
            label: "默认等级",
            field: "defaultLevel",
            value: 1,
            asyncOptions: async (currentValue, formInstance) => {
                return memberLevel
            }
        },
        {
            type: "input",
            label: "图片",
            field: "bgUrl",
            value: '',
        },
    ]
})


