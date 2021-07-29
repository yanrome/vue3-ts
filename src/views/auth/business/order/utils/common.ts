const reg = new RegExp("-", "g")
const isOn = function(starTime, endTime, roomTime = '08:00') {
    if (!starTime) {
        return 0
    }
    starTime = starTime.toString()
    const list = starTime.split(" ")
    const sttimey = list[0].replace(reg, '/') + ' ' + (roomTime !== null ? roomTime : '08:00')
    const st = new Date(sttimey).getTime()
    const et = endTime != 0 ? new Date(endTime.replace(reg, '/')).getTime() : new Date(sttimey).getTime() + 1296000000
    const nt = new Date().getTime()
    return (st < nt && nt < et)
}
const isCancel = function(cancelTime, bageDay) {
    const time = bageDay + ' ' + cancelTime
    const ct = new Date(time.replace(/-/g, '/')).getTime()
    const nt = new Date().getTime()
    return nt < ct
}


/**
 * @description 办理入住按钮状态
 * */

export const btnCheckIn = (item) =>{
    if (!item) {
        return
    }
    let result = false
    if (item.status <= 2 && !item.roomSn) {
        if ( isOn(item.startTime || item.order.startTime, item.endTime || item.order.endTime, item.hotel
            .roomTime)) {
            result = true
        }

    }
    return result
}

/**
 * 按钮状态
 * 支付状态
 * */
export const btnPayMent = (item) => {
    if (!item) {
        return
    }
    let result = false
    if (item.order && item.order.payment != 0 && item.order.depositPayment != 0) {
        result = true  //都已经支付
    }else if( item.order && item.order.depositPayment == 0 && item.deposit == 0){
        result = true  //都已经支付
    }
    return result
}

/**
 * @description 办理退房
 * */
export const btnCheckOut = function(item) {
    if (!item) {
        return
    }
    let result = false
    if (item.status == 1 && item.roomSn && !item.preOrderRoomId) {
        result = true
    }
    if (item.status == 2 && !item.conRoom && item.orderType < 3) {
        result = true
    }
    return result
}

/**
 * @description   取消订单
 * */
export const btnCancelOrder = function(item) {
    if (!item) {
        return
    }

    return item.status === 1
}
