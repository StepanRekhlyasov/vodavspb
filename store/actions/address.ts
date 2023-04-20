import type {Address} from '../types'
import { ADDRESS_CHANGE, ADDRESS_ADD, ADDRESS_CHOOSE } from '../constants/index';
import { useStore } from 'react-redux';


export function addAddress( payload : Address) {
    return {
        type: ADDRESS_ADD,
        payload: {
            street: payload.street,
            city: payload.city,
            formatted_address: payload.formatted_address,
            lat: payload.lat,
            lng: payload.lng,
        }
    }
}
export function removeAddress(address : string) {
    return {
        type: 'ADDRESS_REMOVE',
        payload: {
            address
        }
    }
}
export function chooseAddress(index: number){
    return {
        type: ADDRESS_CHOOSE,
        payload: {
            index
        }
    }
}
export function changeAddressProp(index: number, key : "entrance" | "intercom" | "apt" | "floor" | "info", value : any) {
    return {
        type: ADDRESS_CHANGE,
        payload: {
            index,
            key,
            value
        }
    }
}