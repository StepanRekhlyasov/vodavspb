import React, {useEffect, useCallback} from 'react';
import { productStyle } from '../styles/product'
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView, RefreshControl, FlatList, Text, View } from 'react-native';
import { gStyle } from '../styles/style';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import ProdBlock from '../components/Parts/product-block'
// import * as SplashScreen from 'expo-splash-screen';

import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { ImOnScreen } from '../store/actions/app';
import { bindActionCreators } from 'redux';


function Category({cart, products, actions, navigation, shop} : any) {

    const route : any = useRoute();
    const id = route.params?route.params.id:null
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Category')
        });
        return unsubscribe;
    }, [navigation]);

    // const [refreshing, setRefreshing] = React.useState(false);
    //     const onRefresh = React.useCallback(() => {
    //         setRefreshing(true);
    //         prepare().then(() => setRefreshing(false));
    //     }, []);

    // async function prepare() {
    //     try {
    //         const response = await fetch(
    //             'https://vodavspb.ru/api/posts/',
    //         );
    //         const answer = await response.json();
    //         actions.saveProducts(answer)
    //         return;
    //     } catch (error) {
    //         console.error(error);
    //     } 
    // }

    // useEffect(() => {
    //     if(products.length){
    //         setAppIsReady(true);
    //         return
    //     }
    //     prepare()
    // }, []);
    
    const data = shop.products.filter((i : any)=>{
        return i.category.includes(id)
    })

    return (
		<SafeAreaView style={gStyle.box}>
            <FlatList
				initialNumToRender={8}
				data={data}
				numColumns={2}
				ItemSeparatorComponent={() => <View style={{height: 20}} />}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item, index } : any) => (
					<ProdBlock item={item} navigation={navigation} actions={actions} cart={cart} index={index}/>
				)}
				// onScrollToIndexFailed = { ({
				// 	index,
				// 	averageItemLength,
				//   }) => {
				// 	const wait = new Promise(resolve => setTimeout(resolve, 500));
				// 	wait.then(() => {
				// 		flatListRef.current?.scrollToOffset({
				// 			offset: index * averageItemLength,
				// 			animated: true,
				// 		});
				// 	});
				// }}
			/>
        </SafeAreaView>
        // <SafeAreaView style={gStyle.box}>
        //     <FlatGrid 
        //     // refreshControl={
        //     //     <RefreshControl
        //     //         refreshing={refreshing}
        //     //         onRefresh={onRefresh}
        //     //     />}
        //     itemDimension={1000} style={productStyle.gridView} data={data} renderItem={({ item  } : any) => (
        //         <ProdBlock item={item} navigation={navigation} actions={actions} cart={cart}/>
        //     )} />
        // </SafeAreaView>
    ) 
}

const mapStateToProps = (state : any) => {
    const { products, cart, shop } = state
    return { products, cart, shop }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
        saveProducts,
		ImOnScreen,
    }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Category)