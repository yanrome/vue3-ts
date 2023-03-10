import dayjs from "dayjs";
import RequireContext = __WebpackModuleApi.RequireContext
import defaultResult from "ant-design-vue/es/_util/isMobile";
import any = defaultResult.any;
import {isArray} from "@/utils/is";

/**
 * @description 获取随机数
 * */
export const getPrimaryKey = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return S4() + '-' + S4() + '-' + S4() + '-' + +new Date();
};

/**
 * @description 处理数据字典
 * @param isArray 如果传true，传回处理好的数据
 * @param isObj XX累赘，待改进
 * */
export const changeDict = (emun, isArray = false, isObj = true) => {
    const returns = {}
    const list = emun.map(item => {
        returns[item['dictValue']] = item['dictLabel']
        return !isArray ? item : {
            label: item['dictLabel'],
            value: Number( item['dictValue'])
        }
    })
    return (isObj && !isArray) ? returns : list
}

export const formatDict = (emun,isArray=false)=>{
    const returns = {}
    const list = emun.map(item => {
        returns[item['dictValue']] = item['dictLabel']
        return !isArray ? item : {
            label: item['dictLabel'],
            value: item['dictValue']
        }
    })
    return !isArray ? returns : list
}


/**
 * @description 处理首字母大写 abc => Abc
 * @param str
 */
export const changeStr = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description 将数字保留两位小数
 * @params      num    保留位数
 * @params      p      乘数
 * */
export const point = (point, num = 2, p = 1)=> {
    if (point) {
        return Number(point * p).toFixed(num)
    } else {
        return 0
    }
}

/**
 * @description 批量导入文件
 * @param {Object} context 上下文对象
 * @param {RegExp} reg 匹配规则
 * @returns {Object} 对象
 */
export const importAllModule = (context: RequireContext, reg = /\.vue$/) => {
    return context.keys().reduce((compObj: any, fileName) => {
        const compName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
        compObj[compName] = context(fileName).default || context(fileName)
        return compObj
    }, {})
}

/**
 * @description 异步导入组件
 * @param cateName 组件的分类
 * @param compName 组件名称
 * @return {Promise<*>}
 */
export const getAsyncComp = async (cateName, compName = "index.vue") => {
    const result = await import(
        /* webpackChunkName: "[request]" */ `@/components/${cateName}/${compName}`
        );
    return result.default;
};

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
    switch (type) {
        case "rgb":
            return window.crypto.getRandomValues(new Uint8Array(3)).toString()
        case "hex":
            return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, `${Math.random() * 10}`)
        case "hsl":
            // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
            return [360 * Math.random(), 100 * Math.random() + '%', 100 * Math.random() + '%'].toString()
    }
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
    return new Promise((resolve, reject) => {
        const copyInput = document.createElement("input"); //创建一个input框获取需要复制的文本内容
        copyInput.value = text;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy");
        copyInput.remove()
        resolve(true);
    })
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export const isBase64 = (str: string): boolean => {
    if (str === '' || str.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}
// 对象转JSON
export const toJSON = (obj) => {
    return JSON.stringify(obj, (key, value) => {
        switch (true) {
            case typeof value === "undefined":
                return "undefined";
            case typeof value === "symbol":
                return value.toString();
            case typeof value === "function":
                return value.toString();
            default:
                break;
        }
        return value;
    })
}

/**
 * @description 将字符串/对象 转为数组
 * @param {any}
 * */
export const toObj = (obj: string | object , toArray = false) => {
    if(!obj) return
    obj = typeof obj === "string" ? JSON.parse(obj) : obj
    if(toArray && obj){
        obj = Object.entries(obj).map(item=>{
          return   {label:item[1],value:item[0]}
        })
    }
    return  obj
}


/***
 * @description 是否是生产环境
 */
export const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
export const IS_DEV = ["development"].includes(process.env.NODE_ENV);

/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = (time, str = 'YYYY-MM-DD HH:mm:ss') => dayjs(time).format(str)

/**
 *  @description 将一维数组转成树形结构数据
 * @param items
 * @param id
 * @param link
 */
export const generateTree = (arr) => {
    let temp = {}
    let tree = {}
    // 数组转 键值对
    arr.forEach(item => {
      temp[item.id] = item
      item.name = item.menuName
      item.key = item.id
    })

    let tempKeys = Object.keys(temp)
    tempKeys.forEach(key => {
      // 获取当前项
      let item = temp[key]
      // 当前项 parentId
      let _itemPId = item.parentId
      // 获取父级项
      let parentItemByPid = temp[_itemPId]
      if (parentItemByPid) {
        if (!parentItemByPid.children) {
          parentItemByPid.children = []
        }
        parentItemByPid.children.push(item)
      } else {
        tree[item.id] = item
      }
    })
    // 对象转数组并返回
    return Object.keys(tree).map(key => tree[key])
}
/**
 * @description 将带有_的数据转为驼峰
 * */
export const transFormStr = (str)=>{
    let re = /_(\w)/g
    return str.replace(re,($0,$1)=>{
        return $1.toUpperCase()
    })
}


/***
 * @description 原生加密明文
 * @param {string} plaintext
 */
const encryption = (plaintext: string) => isBase64(plaintext) ? plaintext : window.btoa(window.encodeURIComponent(plaintext))

/**
 * @description 原生解密
 * @param {string} ciphertext
 */
const decryption = (ciphertext: string) => isBase64(ciphertext) ? window.decodeURIComponent(window.atob(ciphertext)) : ciphertext


