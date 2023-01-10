import React, {useEffect, useCallback} from 'react';
import { productStyle } from '../styles/product'
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView, RefreshControl } from 'react-native';
import { gStyle } from '../styles/style';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import ProdBlock from '../components/product-block'
import * as SplashScreen from 'expo-splash-screen';

import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { bindActionCreators } from 'redux';


function Category({cart, products, actions, navigation} : any) {

    SplashScreen.preventAutoHideAsync();

    const route : any = useRoute();
    const id = route.params?route.params.id:null

    const [appIsReady, setAppIsReady] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);
        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            prepare().then(() => setRefreshing(false));
        }, []);

    async function prepare() {
        try {
            const response = await fetch(
                'https://vodavspb.ru/api/posts/',
            );
            const answer = await response.json();
            actions.saveProducts(answer)
            return;
        } catch (error) {
            console.error(error);
        } finally {
            setAppIsReady(true);
        }
    }

    useEffect(() => {
        if(products.length){
            setAppIsReady(true);
            return
        }
        prepare()
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    
    if (!appIsReady) {
        return null;
    }

    const data = products.filter((i : any)=>{
        return i.categories.includes(id)
    })

    return (
        <SafeAreaView style={gStyle.box} onLayout={onLayoutRootView}>
            <FlatGrid 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            itemDimension={1000} style={productStyle.gridView} data={data} renderItem={({ item  } : any) => (
                <ProdBlock item={item} navigation={navigation} actions={actions} cart={cart}/>
            )} />
        </SafeAreaView>
    ) 
}

const mapStateToProps = (state : any) => {
    const { products, cart } = state
    return { products, cart }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
        saveProducts,
    }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Category)