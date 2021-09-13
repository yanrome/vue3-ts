import { Radio } from 'ant-design-vue'

export const tagColor = {
    1: 'pink',
    2: 'red',
    3: 'orange',
    4: 'green',
    5: 'cyan',
    6: 'blue',
    7: 'purple',
    8: 'pink',
    9: 'red',
}

export const publicColor = {
    1: '#6CC178',
    2: '#5A7EF8',
    3: '#FA7D41',
    4: '#F95252',
    5: '#1890ff',
    6: '#87d068',
    7: '#ff5500',
    8: '#389e0d',
    9: '#531dab',
}

export const accountType = {
    2: '微信账户',
    3: '支付宝账户'
}

//订单房间状态
export const businessOrderroomStatus = {
    1:'待入住',
    2:'已入住',
    3:'已取消',
    4:'已退房',
    7:'已完成'
}

// 用户来源
export const sysUserSource = {
    0:{
        txt:'用户注册',
        color:'pink'
    },
    1:{
        txt:'微信小程序',
        color:'orange'
    },
    2:{
        txt:'微信公众号',
        color:'green'
    },
    3:{
        txt:'支付宝小程序',
        color:'blue'
    },
    4:{
        txt:'抖音小程序',
        color:'#000'
    }
}

// 角色状态
export const roleStatus = {
    0:{
        txt:'离线',
        color:'#ED5565',
    },
    1:{
        txt:'在线',
        color:'#1AB394'
    }
}

// 角色状态-数据权限-数据范围
// export const businessOrderroomStatus = {
//     1:'待入住',
//     2:'已入住',
//     3:'已取消',
//     4:'已退房',
//     7:'已完成'
// }

// 菜单场景
export const menuSceneStatus = {
    1:{
        txt:'PC',
        color:'#23C6C8',
    },
    2:{
        txt:'MOBILE',
        color:'#23C6C8'
    }
}

// 菜单类型
export const menuTypeStatus = {
    0:{
        txt:'目录',
        color:'#1C84C6',
    },
    1:{
        txt:'菜单',
        color:'#1AB394'
    },
    2:{
        txt:'按钮',
        color:'#F8AC59'
    }
}

// 菜单是否可见
export const menuVisibleStatus = {
    0:{
        txt:'影藏',
        color:'#ED5565',
    },
    1:{
        txt:'显示',
        color:'#1AB394'
    }
}

// 角色数据范围
export const roleDataScope = {
    1:'全部数据权限',
    2:'单位数据权限',
    3:'自定义数据权限',
}

export const statusColor = {
    1: '#6CC178',
    2: '#5A7EF8',
    3: '#FA7D41',
    4: '#F95252',
    5: '#4A4A4A',
}

export const statusTxt = {
    1: '空',
    2: '夜',
    3: '扫',
    4: '查',
    5: '锁',
}

export const fromIcons = {
        1:require('@/assets/icons/icon-ai.png'),
        2:require('@/assets/icons/icon-mt.png'),
        3:require('@/assets/icons/icon-xc.png'),
        4:require('@/assets/icons/icon-fz.png'),
        7:require('@/assets/icons/icon-tj.png'),
        8:require('@/assets/icons/icon-qne.png'),
}

// 酒店管理---会员等级
export const memberDeposit = [
    { value: 0, label:'不免押金' },
    { value: 1, label:'免押金' }
]

// 酒店管理---默认等级
export const memberLevel = [
    { value: 0, label:'不是默认等级' },
    { value: 1, label:'默认等级' }
]

// 系统管理-数据字典-字典列表---系统默认
export const dictDefault = [
    { value: 1, label:'是' },
    { value: 0, label:'否' }
]

// 系统管理-数据字典-字典列表---系统默认
export const dictListClass = [
    { value: '', label:'---请选择---' },
    { value: 'danger ', label:'危险' },
    { value: 'default', label:'默认' },
    { value: 'primary', label:'主要' },
    { value: 'success', label:'成功' },
    { value: 'info', label:'信息' },
    { value: 'warning', label:'警告' },
]



