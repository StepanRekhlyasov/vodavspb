import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import MyButton from "../Parts/button";
import type { Product } from "../../store/types"
import { bindActionCreators } from "redux";
import { addToCart } from "../../store/actions/cart";
import { connect } from "react-redux";
import { BottomSheetHandler } from "../../store/actions/app";
import { Feather, Octicons, AntDesign } from '@expo/vector-icons'; 
import MyTypes from "../../store/types";

type Payload = {
	product : Product,
	actions : any,
	cart: {ID: number, count: number}[],
	bottomSheetShow: any,
	inModal?: boolean,
	inCart: any
}

const ProductCartControls = ({product, actions, inCart, inModal = false} : Payload) => {
	const button_action = useCallback(() => {
		if(product.min_qty>1){
			// if(!inModal){
			// 	return () => {
			// 		actions.BottomSheetHandler({
			// 			ID: product.ID,
			// 			show: true
			// 		})
			// 	}
			// } else {
				return () => {
					actions.addToCart({
						ID : product.ID,
						count : product.min_qty
					})
				}
			// }
		} else {
			return () =>{
				actions.addToCart({
					ID : product.ID,
					count : 1
				})
			}
		}
	}, [inCart, product.ID])
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
	}, [inCart, product.ID])
	if(inCart && inCart > 0){
		return (
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<Pressable
					onPress={minus}
					style={{
						height: 36
					}}
				>
					<Feather name="minus-circle" color={'#1197F8'} size={36} />
				</Pressable>
					<Text style={{width:48, textAlign:'center', fontSize: 16}}>{inCart}</Text>
				<Pressable
					style={{
						height: 36
					}}
					onPress={()=>{
						actions.addToCart({
							ID : product.ID,
							count : 1
						})
					}}
				>
					<Feather name="plus-circle" color={'#1197F8'} size={36} />
				</Pressable>
			</View>
		)
	}
	return (
		<Pressable
			onPress={button_action()}
			style={{
				width: 120,
				backgroundColor: '#1197F8',
				justifyContent: 'center',
				alignItems: 'flex-end',
				flexDirection: 'row',
				paddingVertical: 5,
				borderRadius: 15,
			}}
		>
			<Feather name="shopping-cart" color={'white'} size={24} />
			{product.min_qty>1 && (
				<Text style={{color:'#fff',fontSize:16,lineHeight:16}}>x{product.min_qty}</Text>
			)}
		</Pressable>
	)
}

const mapStateToProps = (state : MyTypes['Store'], props : any) => {
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