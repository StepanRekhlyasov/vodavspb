import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
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

interface Payload {
	shop : {
		categories: MyTypes['Category'][],
		products: MyTypes['Product'][]
	},
	cart : {
		ID: number,
		count: number
	}[],
	actions: any
}
function Cart({shop, cart, actions} : Payload) {
	const navigation = useNavigation();
	const [productsInCart, setProducts] = useState<MyTypes['Product'][]>([])

	useEffect(()=>{
		let ids_in_cart = cart.reduce((a : number[], b)=>{
			a.push(b.ID)
			return a
		}, [])
		const result = shop.products.filter((row)=>{
			return ids_in_cart.includes(row.ID)
		})
		setProducts(result)
	}, [cart])

	const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

	const ITEM_HEIGHT = 140
	const SEPARATOR_HEIGHT = 20
	const calcFlatLayout = useCallback((data : any, index : any) => {
		return {length: ITEM_HEIGHT + SEPARATOR_HEIGHT, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index, index}
	}, [])


	const renderListItem = useCallback(({ item, index } : any) => {
		return (<ProdBlock item={item} navigation={navigation} actions={actions} index={index} ITEM_HEIGHT={ITEM_HEIGHT}/>)
	}, [])

    return (
		<View style={{paddingHorizontal: 12, flex:1, paddingTop: 20}}>
			<StatusBar/>
			{
				productsInCart.length ? (
					<FlatList
						data={productsInCart}
						numColumns={1}
						renderItem={renderListItem}
						getItemLayout={calcFlatLayout}
						ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT}} />}
						initialNumToRender={20}
						maxToRenderPerBatch={50}
						updateCellsBatchingPeriod={10}
						windowSize={300}
						contentContainerStyle={{paddingBottom:50}} 
					/>
				) : (
					<Text>Добавьте в корзину товар для оформления заказа</Text>
				)
			}
			<ProductBottomSheet/>
			<ToCheckoutFixed/>
		</View>
	)
}

const mapStateToProps = (state : any) => {
    const { cart, shop, total, total_cost } = state
    return { cart, shop, total, total_cost }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
		ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
