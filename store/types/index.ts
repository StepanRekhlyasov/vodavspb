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
	image: string,
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

export interface Category {
	ID: number,
	name: string,
	image: string,
}
interface MyTypes {
	Address : Address,
	Product : Product,
	Cart : Cart,
	Store : Store,
	Category: Category
}
export default MyTypes