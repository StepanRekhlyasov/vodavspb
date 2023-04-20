import constants from '../constants/index';
import type { Address, Store } from '../types'
import {Alert} from 'react-native' 
import { combineReducers } from 'redux'
import MyTypes from '../types';


const user = (state : MyTypes['User'] = {is_auth: false}, action : any) => {
	switch(action.type) {
		case constants.SET_AUTH:
			return {...state, is_auth: action.payload}
        default: 
            return state
    }
}
const products = (state = [], action : any) => {
    switch(action.type) {
        case constants.SAVE_PRODUCTS:
            return [...state, action.payload]
        default: 
            return state
    }
    
}
const categories = (state = [], action : any) => {
    switch(action.type) {
        case constants.SAVE_CATEGORIES: 
            return [...state, action.payload]
        default: 
            return state
    }
    
}
const selected_address = (state = 0, action : any) => {
    switch(action.type) {
        case constants.ADDRESS_CHOOSE:
            return action.payload.index
        default: 
            return state
    }
    
}
const cart = (state : {ID: number, count: number}[] = [], action : any) => {
	switch(action.type) {
        case constants.CART_ADD:
			const cartPosition = state.findIndex((row)=>row.ID == action.payload.ID)
			if(cartPosition !== -1){
				if((state[cartPosition].count + action.payload.count) < 1){
					return [
						...state.slice(0, cartPosition),
						...state.slice(cartPosition + 1)
					]
				} else {
					return state.map((row)=>{
						if(row.ID == action.payload.ID){
							row.count = row.count + action.payload.count
						}
						return row
					})
				}
			} else {
				if(action.payload.count<1){
					return state
				} else {
					return [...state, action.payload]
				}
			}
        default: 
            return state
    }
}

const TEST_ADDRESS = [
    {
        "city": "Санкт-Петербург",
        "formatted_address": "пр. Королёва, 43 корпус 1, Санкт-Петербург, Россия, 197371",
        "lat": 60.0217231,
        "lng": 30.2553815,
        "street": "пр. Королёва, 43 корпус 1",
    },
]
const addresses = (state : Address[] = TEST_ADDRESS , action : any) => {
    switch(action.type) {
        case constants.ADDRESS_ADD:
            if(!action.payload.street) {
                Alert.alert('Ошибка','Нельзя добавить пустой адрес')
                return state
            } 
            return [
                ...state, {
                    street: action.payload.street,
                    lat: action.payload?.lat,
                    lng: action.payload?.lng,
                    city: action.payload?.city,
                    formatted_address: action.payload?.formatted_address,
                }
            ]
        case constants.ADDRESS_CHANGE:
            return state.map((row : any, index)=>{
                if(index === action.payload.index){
                    row[action.payload.key] = action.payload.value
                    return row
                }
                return row
            })
        default:
            return state;
    }
}

const parts = (state = {headerLeft: null, headerRight: 'Burger'}, action : any) => {
    switch(action.type) {
        case constants.SET_UP_HEADER:
            return action.payload
        default:
            return state
    }
}
const screen = (state = '', action : any) => {
    switch(action.type) {
        case constants.IM_ON_SCREEN:
            return action.payload
        default:
            return state
    }
}
const ProductBottomSheet = (state = {
	show: false
}, action: any) => {
	switch (action.type) {
		case constants.BOTTOM_SHEET:
			return action.payload
		case constants.BOTTOM_SHEET_TOGGLE:
			return {...state, show: action.payload}
        default:
            return state 
	}
}
const INITIAL_SHOP = {
	categories: [],
	products: [],
	indexes: {}
}
const shop = (state = INITIAL_SHOP, action : any) => {
	switch(action.type) {
        case 'SHOP_FETCH_SUCCEEDED':
            return action.payload
        default:
            return state
    }
}

const storage = combineReducers({
    products,
    parts,
    addresses,
    cart,
    categories,
    selected_address,
    screen,
	shop,
	ProductBottomSheet,
	user
})

export type RootState = ReturnType<typeof storage>

export default storage