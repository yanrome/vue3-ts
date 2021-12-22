<template>
    <a-card :body-style="{'background': '#8cc8ff;'}"
             hoverable
            :style="`display: inline-block;width: 240px;border: 1px solid ${info.color}`">
        <template class="f-ant-card-actions" #title>
           <span :style="'color:' + info.color">房间号：{{info.roomName }}</span>
        </template>
        <div >
            <a-button :style="`color: ${info.color}`" type="text">房间信息</a-button>
        </div>
        <div class="f-ant-card-actions" >
            <a-button  :style="`color: ${info.color}`" @click="editFunc(info)" type="text">编辑</a-button>
            <a-popconfirm v-if="[1].includes(info.status)" title="确认锁房？" @confirm="postBusinessRoomLockId({id:info.id,endFunc:back})">
                <a-button  :style="`color: ${info.color}`" type="text">锁房</a-button>
            </a-popconfirm>
            <a-popconfirm v-if="[5].includes(info.status)" title="确认上线？" @confirm="postBusinessRoomOnlineId({id:info.id,endFunc:back})">
                <a-button  :style="`color: ${info.color}`"  type="text">上线</a-button>
            </a-popconfirm>
            <a-popconfirm v-if="[1].includes(info.status)" title="确认删除？" @confirm="postBusinessRoomRemoveId({id:info.id,endFunc:back})">
                <a-button  :style="`color: ${info.color}`"  type="text">删除</a-button>
            </a-popconfirm>
        </div>
    </a-card>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {Card, Button, message,Popconfirm} from "ant-design-vue";
    import {useFormModal} from "@/hooks";
    import {getBusinessRoomById,postBusinessRoomEdit,postBusinessRoomLockId,postBusinessRoomOnlineId,postBusinessRoomRemoveId} from "@/api/system/hotel/room";
    import {roomInfo} from './room-info'

    export default defineComponent({
        name: "room-info",
        components:{
            [Card.name]:Card,
            [Button.name]:Button,
            [Popconfirm.name]:Popconfirm,
        },
        props:{
            info:{
                type:Object
            },
            back:{
                type: Function,
                required: true
            },
        },
        setup(){
            const editFunc = (info) => {
                getBusinessRoomById({id:info.id}).then(res=>{
                    const {
                        roomName,id,roomSn,buildNum,unit,floor,roomLevel,roomSort,mac,lockAppId,lockAppSecret,lockUserName,lockUserPwd,lockSn,ammeterNo,ammeterPassword,ammeterAccount
                    } = res.data
                    const modalData = { roomName,id,roomSn,buildNum,unit,floor,roomLevel,roomSort,mac,lockAppId,lockAppSecret,lockUserName,lockUserPwd,lockSn,ammeterNo,ammeterPassword,ammeterAccount}
                    useFormModal({
                        title:'编辑房间',
                        type:'drawer',
                        fields:modalData,
                        formSchema:roomInfo(),
                        handleOk:async (data)=>{
                            postBusinessRoomEdit(data).then(res=>{
                                message.info(res.msg)
                            })
                        }
                    })
                })
            }
            return {
                editFunc,postBusinessRoomLockId,postBusinessRoomOnlineId,postBusinessRoomRemoveId
            }
        },
    })
</script>

<style scoped>
.f-ant-card-actions{
    height: 57px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
</style>
