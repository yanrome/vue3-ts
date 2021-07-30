import dayjs from "dayjs";

const week = {
    0:'星期日',
    1:'星期一',
    2:'星期二',
    3:'星期三',
    4:'星期四',
    5:'星期五',
    6:'星期六',
}

export const dataConversion = (data)=>{
    data = data.map((item) =>{
        item.stateAndPrice = item.roomStates.map((statu,index)=>{
            statu = Object.assign(statu,item.roomPrices[index])
            return statu
        })
        return item
    })
    const date = data.map(item=>item.roomPrices)[0].map(item=>{
        return {
            day:dayjs(item.day).format('MM-DD'),
            week: week[dayjs(item.day).day()]
        }
    })
    const roomScale = {};
    data.forEach(item=>{
        roomScale[item.roomScaleId] !== undefined ? roomScale[item.roomScaleId].push(item) : roomScale[item.roomScaleId] = [item]
    })
    const room =  Object.values(roomScale).map((item:any) =>{
        return {
            roomScaleName: item[0].roomScale.scaleName,
            value:item,
        }
    })

    return {
        date:date,
        room:room
    }
}
