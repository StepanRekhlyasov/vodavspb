import { CART_ADD, SAVE_PRODUCTS, SAVE_CATEGORIES } from '../constants/index';
import { inCart, countTotalCart, countCostCart } from '../../helpers'
import type { Store } from '../types'



const INITIAL_STATE : Store = {
    total: 0,
    cart: [],
    products: [],
    categories: [],
    total_cost: 0
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
        default:
            return state;
    }
}

export default reducer