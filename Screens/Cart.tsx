import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { productStyle } from '../styles/product'
import { gStyle } from '../styles/style'
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { addToCart } from '../store/actions/cart';
import { bindActionCreators } from 'redux';
import { useNavigation } from '@react-navigation/native';
import ProdBlock from '../components/product-block'
import MyButton from '../components/button'


function Cart({products, cart, actions, total, total_cost} : any) {


    const navigation = useNavigation();

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
            <SafeAreaView style={gStyle.box}>
                <FlatGrid 
                itemDimension={1000} style={productStyle.gridView} data={data} renderItem={({ item  } : any) => (
                    <ProdBlock item={item} navigation={navigation} actions={actions} cart={cart}/>
                )} />
                <Text style={{fontSize:20,fontWeight:'bold'}}>Детали заказа</Text>
                <Text>Всего в корзине {total} товаров на {total_cost} рублей</Text>
                <MyButton
                    style={{
                        height: 30,
                        borderRadius: 10,
                        backgroundColor: '#f9c5c5',
                        padding: 10,
                        marginBottom: 50,
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                    text={'Заказать'}
                />
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={gStyle.box}>
                <Text>Ваша корзина пуста</Text>
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
        addToCart
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
