import type { Cart, Product } from './store/types'

export function inCart(id : Number, cart : Cart[]){
    let cloneCart = [...cart]
    const index = cloneCart.findIndex((item : any) => item.ID == id)
    if(cloneCart[index]){
        return {
            result : cloneCart[index],
            index : index
        }
    } else {
        return {
            result: false,
            index: -1
        }
    }
}
export function countInCart(id : Number, cart : Cart[]){
    const index = cart.findIndex((item : any) => item.ID == id)
    if(cart[index]){
        return cart[index].count
    } else {
        return 0
    }
}
export function addOne({item, cart} : {
    item: Product,
    cart: Cart[]
}){
    const in_cart = cart.find((row)=>{
        return row.ID == item.ID
    })
    if(in_cart && in_cart.count>=item.qty){
        return in_cart.count + 1
    } else {
        return item.qty?item.qty:1
    }
}

export function removeOne({item, cart} : {
    item: Product,
    cart: Cart[]
}){
    const in_cart = cart.find((row)=>{
        return row.ID == item.ID
    })
    if(in_cart && in_cart.count>item.qty){
        return in_cart.count - 1
    } else {
        return 0
    }
}

export function countTotalCart(cart : Cart[]){
    let count = cart.reduce((acc, row)=>{
        return row.count + acc
    }, 0)
    return count
}

export function countCostCart(cart : Cart[], products : Product[]){
    let cost = cart.reduce((acc : any, row : any)=>{
        return row.count * getProductPrice(row.ID, products) + acc
    }, 0)
    return cost
}

export function getProductPrice(id: Number, products : Product[]){
    const result = products.find((row)=>{
        return row.ID == id
    })
    if(result){
        return result.price
    } else {
        return 0
    }
}
