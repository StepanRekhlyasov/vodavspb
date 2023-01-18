export interface Store {
    total: number,
    cart: Cart[],
    products: Product[],
    categories: {}[],
    total_cost: number,
    addresses: string[]
}
export interface Cart {
    ID: Number, count: number
}
export interface Product { 
    ID: Number, 
    price: number,
    qty: number,
    acf?: {}
}