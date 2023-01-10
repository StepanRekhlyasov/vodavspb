import { CART_ADD, SAVE_PRODUCTS, SAVE_CATEGORIES } from '../constants/index';

export function addToCart({ID, count} : {
    ID: Number,
    count: Number
}) {
    return {
        type: CART_ADD,
        payload: {
            ID: ID,
            count: count
        }
    }
}

export function saveProducts(products : {}[]){
    return {
        type: SAVE_PRODUCTS,
        payload: products
    }
}

export function saveCategories(categories : {}[]){
    return {
        type: SAVE_CATEGORIES,
        payload: categories
    }
}