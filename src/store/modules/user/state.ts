import {createStorage} from '@/utils/Storage'
import {ACCESS_TOKEN, CURRENT_USER,HOTEL_USER} from "@/store/mutation-types";
const Storage = createStorage({storage: localStorage})

export type State = {
    token: string;
    name: string;
    welcome: string;
    avatar: string;
    roles: any[];
    info: any;
    hotel:any;
    hotelId:any
};

export const state: State = {
    token: Storage.get(ACCESS_TOKEN, ''),
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: Storage.get(CURRENT_USER, {}),
    hotel:Storage.get(HOTEL_USER,{}),
    hotelId: null
};
