// import {createStorage} from '@/utils/Storage'
// import {ACCESS_TOKEN, CURRENT_USER,HOTEL_USER} from "@/store/mutation-types";
// const Storage = createStorage({storage: localStorage})

export type State = {
    orderRoomStatus: string;
    orderRoomMsg:any
    orderRoomId:any
};

export const state: State = {
    orderRoomStatus:'',// Storage.get(ACCESS_TOKEN, ''),
    orderRoomMsg:null,
    orderRoomId:''
};
