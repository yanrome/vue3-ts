
/**
 * 字典转换
 * */

/**
 * @description 是否实名认证
 * @param str 传入数字
 * @return
 * */

export const signToRealName = (str:number) => {
    return str === 1 ? '已通过' : '未通过实名'
}
