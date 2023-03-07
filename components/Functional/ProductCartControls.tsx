import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import MyButton from "../Parts/button";
import type { Product } from "../../store/types"
import { bindActionCreators } from "redux";
import { addToCart } from "../../store/actions/cart";
import { connect } from "react-redux";
import { BottomSheetHandler } from "../../store/actions/app";

type Payload = {
	product : Product,
	actions : any,
	cart: {ID: number, count: number}[],
	bottomSheetShow: any,
	inModal?: boolean,
	inCart: any
}

const ProductCartControls = ({product, actions, inCart, inModal = false} : Payload) => {
	const button_text = useCallback(() => {
		if(product.min_qty>1){
			return parseInt(product.prices[0].price)*product.min_qty + ' руб. ('+product.min_qty+' шт.)'
		}
		return product.prices[0].price + ' руб.'
	},[])
	const button_action = useCallback(() => {
		if(product.min_qty>1){
			if(!inModal){
				return () => {
					actions.BottomSheetHandler({
						ID: product.ID,
						show: true
					})
				}
			} else {
				return () => {
					actions.addToCart({
						ID : product.ID,
						count : product.min_qty
					})
				}
			}
		} else {
			return () =>{
				actions.addToCart({
					ID : product.ID,
					count : 1
				})
			}
		}
	}, [inCart])
	const minus = useCallback(()=>{
		if(inCart && (inCart - 1) < product.min_qty){
			actions.addToCart({
				ID : product.ID,
				count : -product.min_qty
			})
		} else {
			actions.addToCart({
				ID : product.ID,
				count : -1
			})
		}
	}, [inCart])
	if(inCart && inCart > 0){
		return (
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<MyButton 
					text={ "-" } 
					options = {{
						height: 40,
						width: 40,
						fontSize: 14,
					}}
					action={ minus }
				/>
				<Text style={{width:70, textAlign:'center'}}>{inCart}</Text>
				<MyButton 
					text={ "+" } 
					options = {{
						height: 40,
						width: 40,
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
				height: 40,
				fontSize: 14,
				width: 140,
			}}
			action={ button_action() }
		/>
	)
}

const mapStateToProps = (state : any, props : any) => {
	const { cart } = state
	const inCart = cart.find((row : any)=>row.ID==props.product.ID)?.count
    return { inCart }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
		BottomSheetHandler
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartControls)