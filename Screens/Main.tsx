import React, { useState, useEffect, useCallback} from 'react';
import { SafeAreaView, RefreshControl, Text, View } from 'react-native';
import { gStyle } from '../styles/style'
import { FlatGrid } from 'react-native-super-grid';
import * as SplashScreen from 'expo-splash-screen';
import { TOP_PRODUCTS } from '../store/constants'
// import { productStyle } from '../styles/product'
import ProdBlock from '../components/Parts/product-block'
import CatBlock from '../components/Parts/category-block'
import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { ImOnScreen } from '../store/actions/app';
import { bindActionCreators } from 'redux';

/** Redux */
import { SetUpHeader } from '../store/actions/app';
import { useRoute } from '@react-navigation/native';
// import Header from '../components/Parts/Burger';
// import MapView from 'react-native-maps';
/** Saga */
import api from '../store/api/website'
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

function Main({cart, actions, navigation, shop } : any) {
	const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Main')
        });
        return unsubscribe;
    }, [navigation]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
	
    

	SplashScreen.preventAutoHideAsync();
    const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		prepare().then(() => setRefreshing(false));
	}, []);

    async function prepare() {
		dispatch({type: 'SHOP_FETCH_REQUESTED', payload: 'jaja'})
    }
    useEffect(() => {
        prepare()
    }, []);

	useEffect(() => {
        setProducts(shop.products)
		setCategories(shop.categories)
		if(shop.products?.length && shop.categories?.length){
            setAppIsReady(true);
            return
        }
    }, [shop]);
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    if (!appIsReady) {
        return null;
    }
    const cat_grid = categories.map((item, index)=>(<CatBlock key={index} item={item} navigation={navigation} actions={actions} cart={cart} counter={{index: index, length: categories.length}}/>))
	const prod_grid = products.map((item, index)=>(<ProdBlock key={index} item={item} navigation={navigation} actions={actions} cart={cart} counter={{index: index, length: categories.length}}/>))
    return (
        <SafeAreaView>
			
			
			{/* <ScrollView
					contentContainerStyle={{ paddingHorizontal: 10 }}
					scrollEventThrottle={200}
					decelerationRate="fast"
				> */}
			<ScrollView scrollEventThrottle={200} onLayout={onLayoutRootView} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
			} 
			style={gStyle.box} 
			nestedScrollEnabled = {true}
			>
				<Text>ЧТототыфвфыв</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 10 }}
						scrollEventThrottle={200}
						decelerationRate="fast"
						nestedScrollEnabled = {true}
					>
						{cat_grid}
					</ScrollView>
			
					{prod_grid}
			</ScrollView>
				{/* <FlatGrid 
					itemDimension={1000} 
					style={{
						flex:1
					}} 
					data={products} 
					renderItem={({ item  } : any) => (
						<ProdBlock item={item} navigation={navigation} actions={actions} cart={cart}/>
					)} 
				/> */}
			{/* </ScrollView> */}
		</SafeAreaView>
    ) 
}

const mapStateToProps = (state : any) => {
    const { cart, shop } = state
    return { cart, shop }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
        saveProducts,
        SetUpHeader,
        ImOnScreen
    }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main)
