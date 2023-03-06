import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { productStyle } from '../styles/product'
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

function Cart({products, cart, actions, total, total_cost} : any) {
	const navigation = useNavigation();

	const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

    let cart_ids : Number[] = []
    cart.map((row : any)=>{
        if(row.count>0){
            cart_ids.push(row.ID) 
        }
    })
    return (
		<SafeAreaView style={{paddingHorizontal: 12}}>
			<Text>{JSON.stringify(cart)}</Text>
			<MyButton
				text={'Не жми меня'}
				action={()=>{
					
				}}
			/>
		</SafeAreaView>
	)
}

const mapStateToProps = (state : any) => {
    const { cart, products, total, total_cost } = state
    return { cart, products, total, total_cost }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
		ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
