import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MyButton from "../Parts/button";
import { calcusCart } from "../../helpers";

const ToCartFixed = ({cart, shop} : any) => {
	const navigation : any = useNavigation()
	const [sum, setSum] = useState<number>(0)
	useEffect(()=>{
		const result = calcusCart.cartSum({cart, shop})
		// const result = cart.reduce(
		// 	(accumulator : number, currentValue : {ID: number, count: number}) => {
		// 		const product = shop.products.find((productitem: any)=>{
		// 			return currentValue.ID == productitem.ID
		// 		})
		// 		return accumulator + parseInt(product.prices[0].price) * currentValue.count
		// 	},
		// 	0
		// )
		setSum(result)
	}, [cart])
	if(cart.length){
		return (
			<View style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				width: '100%',
				justifyContent: 'center',
				backgroundColor: '#25263A',
				borderRadius: 9,
				paddingVertical: 12,
				paddingHorizontal: 24
			}}>
				<Pressable
					onPress={()=>{navigation.navigate('Корзина')}}
				>
					<View style={{flexDirection:'row', justifyContent: 'space-between'}}>
						<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>Перейти в корзину</Text>
						<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>{sum} руб.</Text>
					</View>
				</Pressable>
			</View>
		)
	} else {
		return (<></>)
	}
}

const mapStateToProps = (state : any) => {
    const { cart, shop } = state
    return { cart, shop }
};

export default connect(mapStateToProps)(ToCartFixed)