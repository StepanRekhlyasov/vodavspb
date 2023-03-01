export interface Store {
    total: number,
    cart: Cart[],
    products: Product[],
    categories: {}[],
    total_cost: number,
    addresses: Address[],
    selected_address: number | undefined
}
export interface Cart {
    ID: number, count: number
}
export interface Product { 
    ID: number, 
	name: string,
	category: number,
    prices: {qty: number, price: number}[],
    min_qty: number,
}
export interface Address {
    street: string,
    entrance?: string,
    intercom?: string,
    apt?: string,
    floor?: string,
    info?: string,
    lat?: number,
    lng?: number,
    formatted_address?: string,
    city?: string,
}