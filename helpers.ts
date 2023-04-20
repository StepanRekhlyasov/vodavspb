import { useStore } from 'react-redux'
import type { Address, Cart, Product, Store } from './store/types'

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
// export function countInCart(id : Number, cart : Cart[]){
//     const index = cart.findIndex((item : any) => item.ID == id)
//     if(cart[index]){
//         return cart[index].count
//     } else {
//         return 0
//     }
// }
// export function addOne({item, cart} : {
//     item: Product,
//     cart: Cart[]
// }){
//     const in_cart = cart.find((row)=>{
//         return row.ID == item.ID
//     })
//     if(in_cart && in_cart.count>=item.qty){
//         return in_cart.count + 1
//     } else {
//         return item.qty?item.qty:1
//     }
// }

// export function removeOne({item, cart} : {
//     item: Product,
//     cart: Cart[]
// }){
//     const in_cart = cart.find((row)=>{
//         return row.ID == item.ID
//     })
//     if(in_cart && in_cart.count>item.qty){
//         return in_cart.count - 1
//     } else {
//         return 0
//     }
// }

// export function countTotalCart(cart : Cart[]){
//     let count = cart.reduce((acc, row)=>{
//         return row.count + acc
//     }, 0)
//     return count
// }

// export function countCostCart(cart : Cart[], products : Product[]){
//     let cost = cart.reduce((acc : any, row : any)=>{
//         return row.count * getProductPrice(row.ID, products) + acc
//     }, 0)
//     return cost
// }

// export function getProductPrice(id: Number, products : Product[]){
//     const result = products.find((row)=>{
//         return row.ID == id
//     })
//     if(result){
//         return result.price
//     } else {
//         return 0
//     }
// }

export function geocodeResultToStreet(json : Geocoder.GeocoderResponse) {
    let result = json.results.find((row)=>{
        return row.types.includes('street_address')
    })
    if(!result){
        result = json.results[0]
    }
    const country = result?.address_components.find((row)=>{
        return row.types.includes('country')
    })
    const city = result?.address_components.find((row)=>{
        return row.types.includes('locality')
    })
    if((!country || country?.short_name!='RU') || (!city || city?.short_name!='СПБ')){
        return { addressWarning: 'Неверный адрес' }
    }
    const test = result?.address_components.filter((row)=>{
        return row.types.includes('route') || row.types.includes('street_number')
    })
    if(test.length<2){
        return { 
            street : null,
            formatted_address: null,
            addressWarning: 'Неверный адрес' 
        }
    }
    const street = test.find((row)=>{
        return row.types.includes('route')
    })?.short_name
    const street_number = test.find((row)=>{
        return row.types.includes('street_number')
    })?.long_name
    if(!street || !street_number){
        return { 
            street : null,
            formatted_address: null,
            addressWarning: 'Неверный адрес'
        }
    }
    const address = street + ', ' + street_number?.replace(/ /g, '\u00A0')
    return {
        street : address,
        city: city.long_name,
        formatted_address: result.formatted_address,
        addressWarning: ''
    }
}

export function getSelectedAddress(){
    const store : any = useStore().getState()
    const addresses = store.addresses
    const index = store.selected_address
    if(addresses[index]){
        return addresses[index]
    } else if (addresses[0]) {
        return addresses[0]
    } else {
        return null
    }
}

export const calcusCart = {
	choosePrice: (prices : {qty: string, price: string}[], count: number) => {
		if(!prices.length){
			return 0
		}
		const sorted = [...prices].sort((a, b)=>{
			if(parseInt(a.qty)<parseInt(b.qty)){
				return 1
			} else {
				return -1
			}
		})
		const result = sorted.find((price)=>{
			const qty = parseInt(price.qty)
			if(count>=qty){
				return true
			}
		})
		if(result){
			return parseInt(result.price)
		} else {
			return parseInt(sorted.slice(-1)[0].price);
		}
	},
	cartSum: ({cart, shop} : any) => {
		return cart.reduce(
			(accumulator : number, currentValue : {ID: number, count: number}) => {
				const product = shop.products.find((productitem: any)=>{
					return currentValue.ID == productitem.ID
				})
				return accumulator + calcusCart.choosePrice(product.prices, currentValue.count) * currentValue.count
			},
			0
		)
	},
	sortedPrices: (prices : {price: string, qty: string}[]) => {
		return [...prices].sort((a, b)=>{
			if(parseInt(a.qty)>parseInt(b.qty)){
				return 1
			} else {
				return -1
			}
		})
	}	
}
