import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { gStyle } from '../styles/style'
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { addToCart } from '../store/actions/cart';
import { bindActionCreators } from 'redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProdBlock from '../components/Parts/product-block'
import MyButton from '../components/Parts/button'
import { ImOnScreen } from '../store/actions/app'

/** Components */
import ProductCartControls from '../components/Functional/ProductCartControls';
import ProductBottomSheet from '../components/Functional/ProductBottomSheet';

/** TS */
import MyTypes from '../store/types';
import ToCartFixed from '../components/Functional/ToCartFixed';
import ToCheckoutFixed from '../components/Functional/ToCheckoutFixed';
import { useDispatch } from 'react-redux';
import { calcusCart } from '../helpers';
import ToOrderFixed from '../components/Functional/ToOrderFixed';
import AddressSelector from '../components/Address/AddressSelector';
import BottomButtonFixed from '../components/Functional/BottomButtonFixed';

interface Payload {
	shop : {
		categories: MyTypes['Category'][],
		products: MyTypes['Product'][]
	},
	cart : {
		ID: number,
		count: number
	}[],
	actions: any,
	navigation: any,
	user: MyTypes['User']
}
function Cart({shop, cart, actions, navigation, user} : Payload) {

	const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

	const [productsInCart, setProducts] = useState<MyTypes['Product'][]>([])

	useEffect(()=>{
		let ids_in_cart = cart.reduce((a : number[], b)=>{
			a.push(b.ID)
			return a
		}, [])
		const result = shop.products.filter((row)=>{
			return ids_in_cart.includes(row.ID)
		})
		if(!result.length){
			navigation.goBack()
		}
		setProducts(result)
	}, [cart])

	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);


	const renderListItem = useCallback(({ item, index } : any) => {
		const _inCart = cart.find((a)=>a.ID===item.ID)
		if(_inCart){
			return (
				<View style={style.checkoutItems} key={index}>
					<Text style={{fontWeight:'700', width:'10%'}}>{_inCart.count}x</Text>
					<Text numberOfLines={3} style={{marginRight:10, width:'60%'}}>{item.name}</Text>
					<Text style={{width:'25%', textAlign: 'right'}}>{calcusCart.choosePrice(item.prices, _inCart.count)*_inCart.count}&nbsp;руб</Text>
				</View>
			)
		} else {
			return (<></>)
		}
	}, [productsInCart])
	const [checkoutItems, setCheckoutItems] = useState<any>()
	useEffect(()=>{
		const result = productsInCart.map(
			(item, index : number)=>(renderListItem({item: item, index: index}))
		)
		setCheckoutItems(result)
	}, [productsInCart])

    return (
		<View style={{paddingHorizontal: 12,flex: 1}}>
			<ScrollView 
				contentContainerStyle={
					{
						 
						justifyContent: 'flex-start', 
						alignItems: 'flex-start', 
						flexDirection: 'column', 
						width: '100%'
					}
				}
			>
			<StatusBar/>
			<Text style={style.checkoutTitle}>Ваш заказ</Text>
			{checkoutItems}
			<View style={{height: 20}}></View>
			<AddressSelector/>
			</ScrollView>
			<ProductBottomSheet/>
			{
				!user.is_auth ? (<BottomButtonFixed
					text1 = {'Авторизоваться'}
					text2 = {''}
					onPress = {()=>{navigation.navigate('Authorization')}}
					containerStyle = {{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: Dimensions.get('window').width,
						justifyContent: 'center',
						backgroundColor: '#303148',
						borderTopLeftRadius: 9,
						borderTopRightRadius: 9,
						paddingVertical: 12,
						paddingHorizontal: 24
					}}
					wrapperStyle = {{flexDirection:'row', justifyContent: 'center'}}
				/>) : (
					<ToOrderFixed/>
				)
			}
		</View>
	)
}

const style = StyleSheet.create({
	checkoutTitle: {
		fontWeight: 'bold',
		fontSize: 28,
		marginBottom: 10
	},
	checkoutItems: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		maxWidth: '100%',
		flex: 1,
	}
})
const mapStateToProps = (state : any) => {
    const { cart, shop, total, total_cost, user } = state
    return { cart, shop, total, total_cost, user }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
		ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
