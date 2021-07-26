// import {createStorage} from '@/utils/Storage'
// import {ACCESS_TOKEN, CURRENT_USER,HOTEL_USER} from "@/store/mutation-types";
// const Storage = createStorage({storage: localStorage})

export type State = {
    orderRoomStatus: string;
    otaSource:any
};

export const state: State = {
    orderRoomStatus:'',// Storage.get(ACCESS_TOKEN, ''),
    otaSource:[
        {
            label:'美团',
            value:6,
            url:'@/assets/icons/icon-mt',
        },
        {
            label:'美团',
            value:6,
            url:'@/assets/icons/icon-mt',
        }
    ]
};
