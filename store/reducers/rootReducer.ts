import { CART_ADD, SAVE_PRODUCTS, SAVE_CATEGORIES, ADDRESS_CHANGE, ADDRESS_ADD, ADDRESS_CHOOSE, SET_UP_HEADER, IM_ON_SCREEN } from '../constants/index';
import { inCart, countTotalCart, countCostCart } from '../../helpers'
import type { Address, Store } from '../types'
import {Alert} from 'react-native' 
import { combineReducers } from 'redux'

const products = (state = [], action : any) => {
    switch(action.type) {
        case SAVE_PRODUCTS:
            return [...state, action.payload]
        default: 
            return state
    }
    
}
const categories = (state = [], action : any) => {
    switch(action.type) {
        case SAVE_CATEGORIES: 
            return [...state, action.payload]
        default: 
            return state
    }
    
}
const selected_address = (state = 0, action : any) => {
    switch(action.type) {
        case ADDRESS_CHOOSE:
            return action.payload.index
        default: 
            return state
    }
    
}
const cart = (state = [], action : any) => {
    return state
    // switch(action.type) {
    //     case CART_ADD: 
    //         if(inCart(action.payload.ID, [...state])?.index >= 0){
    //             const CART_ADD_cloneCart = [...state.cart];
    //             CART_ADD_cloneCart.splice(inCart(action.payload.ID, CART_ADD_cloneCart)?.index, 1, action.payload)
    //             return {...state, cart: CART_ADD_cloneCart, total: countTotalCart(CART_ADD_cloneCart), total_cost: countCostCart(CART_ADD_cloneCart, state.products)}
    //         }
    //         return {...state, cart: [...state.cart, action.payload], total: countTotalCart([...state.cart, action.payload]), total_cost: countCostCart([...state.cart, action.payload], state.products)}
    //     default: 
    //         return state
    // }
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
        case ADDRESS_ADD:
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
        case ADDRESS_CHANGE:
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
        case SET_UP_HEADER:
            return action.payload
        default:
            return state
    }
}
const screen = (state = '', action : any) => {
    switch(action.type) {
        case IM_ON_SCREEN:
            return action.payload
        default:
            return state
    }
}
const INITIAL_SHOP = {
	categories: [],
	products: []
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
	shop
})

export type RootState = ReturnType<typeof storage>

export default storage