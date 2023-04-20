import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { connect } from "react-redux";
import { calcusCart } from "../../helpers";

import { Dimensions } from 'react-native';
/** TS */
import MyTypes from "../../store/types";
const ToCartFixed = ({cart, shop, text = 'Перейти в корзину'} : {
	cart : MyTypes['Cart'][],
	shop : {
		products: MyTypes['Product'][],
		categories: MyTypes['Category'][],
	},
	text?: string,
}) => {
	const navigation : any = useNavigation()
	const [sum, setSum] = useState<number>(0)
	useEffect(()=>{
		const result = calcusCart.cartSum({cart, shop})
		setSum(result)
	}, [cart])
	if(cart.length){
		return (
			<View style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				width: Dimensions.get('window').width,
				justifyContent: 'center',
				backgroundColor: '#25263A',
				borderTopLeftRadius: 9,
				borderTopRightRadius: 9,
				paddingVertical: 12,
				paddingHorizontal: 24
			}}>
				<Pressable
					onPress={()=>{navigation.navigate('Cart')}}
				>
					<View style={{flexDirection:'row', justifyContent: 'space-between'}}>
						<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>{text}</Text>
						<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>{sum} руб.</Text>
					</View>
				</Pressable>
			</View>
		)
	} else {
		return (<></>)
	}
}

const mapStateToProps = (state : MyTypes['Store']) => {
    const { cart, shop } = state
    return { cart, shop }
};

export default connect(mapStateToProps)(ToCartFixed)