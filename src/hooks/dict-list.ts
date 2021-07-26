import {getSystemDictDataByType} from '@/api/system/dict'
import {changeDict} from "@/utils/common";
import * as dict from '@/utils/dict'


export const  getDict = async (dictType:string,subType:string = 'noting',isArray:boolean = false) => {
    const {data} =  await getSystemDictDataByType({dictType: dictType})
    const asDict = dict[subType] || {}
   return data.length ? changeDict(data,isArray) : asDict
}
