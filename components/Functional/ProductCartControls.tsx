import React from "react";
import { Text, View } from "react-native";
import MyButton from "../Parts/button";
import type { Product } from "../../store/types"
import { bindActionCreators } from "redux";
import { addToCart } from "../../store/actions/cart";
import { connect } from "react-redux";

type Payload = {
	product : Product,
	actions : any,
	cart: {ID: number, count: number}[]
}

function ProductCartControls({product, actions, cart} : Payload){
	const button_text = () => {
		if(product.min_qty>1){
			return product.prices[0].price*product.min_qty + ' руб. ('+product.min_qty+' шт.)'
		}
		return product.prices[0].price + ' руб.'
	}
	const button_action = () => {
		if(product.min_qty>1){
			return () => {
				console.log('Window!')
			}
		} else {
			return () =>{
				actions.addToCart({
					ID : product.ID,
					count : 1
				})
			}
		}
	}
	const inCart = cart.find((row : any)=>row.ID==product.ID)
	if(inCart && inCart.count > 0){
		return (
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<MyButton 
					text={ "-" } 
					options = {{
						height: 50,
						width: 50,
						fontSize: 14,
					}}
					action={ ()=>{
						actions.addToCart({
							ID : product.ID,
							count : -1
						})
					} }
				/>
				<Text>{inCart.count}</Text>
				<MyButton 
					text={ "+" } 
					options = {{
						height: 50,
						width: 50,
						fontSize: 14,
					}}
					action={ ()=>{
						actions.addToCart({
							ID : product.ID,
							count : 1
						})
					} }
				/>
			</View>
		)
	}
	return (
		<MyButton 
			text={ button_text() } 
			options = {{
				height: 50,
				fontSize: 14,
				width: '100%'
			}}
			action={ button_action() }
		/>
	)
}

const mapStateToProps = (state : any) => {
    const { cart } = state
    return { cart }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartControls)