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
import BottomSheet from '../components/Functional/BottomSheet';

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
    const data = products.filter((row : any)=>{
        return cart_ids.includes(row.ID)
    })
    if(data.length>0){
        return (
            <SafeAreaView style={{paddingHorizontal: 12}}>
                <FlatGrid 
                itemDimension={1000} style={productStyle.gridView} data={data} renderItem={({ item  } : any) => (
                    <ProdBlock item={item} navigation={navigation} actions={actions} cart={cart}/>
                )} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>Детали заказа</Text>
                <Text>Всего в корзине {total} товаров на {total_cost} рублей</Text>
                <MyButton
                    text={'Заказать'}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{paddingHorizontal: 12}}>
                <Text>Ваша корзина пуста</Text>
                <MyButton
                    text={'Не жми меня'}
                    action={()=>{
                        
                    }}
                />
				<BottomSheet/>
            </SafeAreaView>
        )
    }
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
