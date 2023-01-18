import React, { useState, useEffect, useCallback} from 'react';
import { SafeAreaView, RefreshControl, Text, View } from 'react-native';
import { gStyle } from '../styles/style'
import { FlatGrid } from 'react-native-super-grid';
import * as SplashScreen from 'expo-splash-screen';
import { TOP_PRODUCTS } from '../store/constants'
// import { productStyle } from '../styles/product'
import ProdBlock from '../components/product-block'
import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { bindActionCreators } from 'redux';

// import MapView from 'react-native-maps';


function Main({cart, products, actions, navigation} : any) {
    
    SplashScreen.preventAutoHideAsync();

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
        return TOP_PRODUCTS.includes(i.ID)
    })
    
    return (
        <SafeAreaView style={gStyle.box} onLayout={onLayoutRootView}>
            <Text style={{fontSize: 21,textAlign:'center',marginTop:20, fontWeight: 'bold', padding:10,}}>Добро пожаловать в интернет-магазин "Водяной"!</Text>
            <FlatGrid 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            itemDimension={1000} style={{flex:1}} data={data} renderItem={({ item  } : any) => (
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
export default connect(mapStateToProps, mapDispatchToProps)(Main)
