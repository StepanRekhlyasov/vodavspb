import { CART_ADD, SAVE_PRODUCTS, SAVE_CATEGORIES } from '../constants/index';
import { inCart, countTotalCart, countCostCart } from '../../helpers'
import type { Store } from '../types'



const INITIAL_STATE : Store = {
    total: 0,
    cart: [],
    products: [],
    categories: [],
    total_cost: 0,
    addresses: []
}
const reducer = (state : Store = INITIAL_STATE, action : any) => {
    switch(action.type) {
        case CART_ADD: 
            if(inCart(action.payload.ID, [...state.cart])?.index >= 0){
                const CART_ADD_cloneCart = [...state.cart];
                CART_ADD_cloneCart.splice(inCart(action.payload.ID, CART_ADD_cloneCart)?.index, 1, action.payload)
                return {...state, cart: CART_ADD_cloneCart, total: countTotalCart(CART_ADD_cloneCart), total_cost: countCostCart(CART_ADD_cloneCart, state.products)}
            }
            return {...state, cart: [...state.cart, action.payload], total: countTotalCart([...state.cart, action.payload]), total_cost: countCostCart([...state.cart, action.payload], state.products)}
        case SAVE_PRODUCTS:
            return {...state, products: action.payload};
        case SAVE_CATEGORIES: 
            return {...state, categories: action.payload}
        case 'ADDRESS_ADD':
            if([...state.addresses].find((row)=>{
                return row === action.payload.address
            })) {
                window.alert('Такой адрес уже добавлен')
                return state
            } else if(!action.payload.address) {
                window.alert('Нельзя добавить пустой адрес')
                return state
            } 
            return {...state, addresses: [...state.addresses, action.payload.address]}
        case 'ADDRESS_REMOVE':
            const deleteAdressIndex = [...state.addresses].findIndex((row)=>{
                return row === action.payload.address
            })
            if(deleteAdressIndex >= 0) {
                const cloneAddresses = [...state.addresses]
                cloneAddresses.splice(deleteAdressIndex, 1)
                return {...state, addresses: cloneAddresses}
            } else {
                window.alert('Ошибка удаления адреса')
                return state
            }
        default:
            return state;
    }
}

export default reducer