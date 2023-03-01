import React, { useState, useEffect, useCallback, useRef} from 'react';
import { SafeAreaView, RefreshControl, Text, View, StyleSheet, SectionList, FlatList, Pressable, StatusBar, Platform } from 'react-native';
import { gStyle } from '../styles/style'
import { FlatGrid } from 'react-native-super-grid';
// import * as SplashScreen from 'expo-splash-screen';
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
/** components */
import BottomSheet from '../components/Functional/BottomSheet';
// import MapView from 'react-native-maps';
/** Saga */
import api from '../store/api/website'
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

// type Categories = Category[]
type Category = {
	ID: number,
	name: string
}
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
    const [categories, setCategories] : [Category[], any] = useState([]);
	
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
	


	let listData : any = []
	listData.push({title: 'Акции', data: [{ list: [], special: true}]})
	for (const cat of Object.values(categories)) {
		const list = products.filter((row : any)=>{
			return row.category == cat.ID
		})
		listData.push({title: cat.name, data: [{ list: list.slice(0,3)}]})
	}

	const renderSection = ({ item }) => {
		if(item.special){
			return (
				<View style={{
					height: 180,
					backgroundColor: 'yellow'
				}}>
					<Text>Акции</Text>
				</View>
			)
		}
		return (
		  <FlatList
			data={item.list}
			numColumns={2}
			renderItem={renderListItem}
			keyExtractor={keyExtractor}
			ItemSeparatorComponent={() => <View style={{height: 20}} />}
		  />
		)
	}
	const keyExtractor = (item) => {
		return item.ID
	}
	const renderListItem = ({ item, index }) => {
		return (<ProdBlock item={item} navigation={navigation} actions={actions} cart={cart} index={index}/>)
	}
	const flatListRef : any = useRef()
	const cat_grid = categories.map(
		(item, index)=>(<CatBlock 
			key={index} 
			list={flatListRef} 
			item={item} 
			navigation={navigation} actions={actions} cart={cart} counter={{index: index, length: categories.length}}
		/>)
	)
    return (
        <SafeAreaView style={{paddingHorizontal: 12, flex:1}} >
			<StatusBar/>
			<View>
				<ScrollView 
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.slider_cats}
					scrollEventThrottle={200}
					decelerationRate="fast"
					nestedScrollEnabled = {true}
					style={{
						flexGrow: 0
					}}
				>
				{cat_grid}
				</ScrollView>
			</View>
			<SectionList
				ref = {flatListRef}
				initialNumToRender={8}
				sections={listData}
				keyExtractor={(item, index) => item + index}
				renderItem={renderSection}
				renderSectionHeader={({section: section}) => {
					if(section.title=='Акции'){
						return (
							<></>
						)
					}
					return(
						<Text style={styles.header}>{section.title}</Text>
					)
				}}
				stickySectionHeadersEnabled
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
				}
				onScrollToIndexFailed = { ({
					index,
					averageItemLength,
				  }) => {
					const wait = new Promise(resolve => setTimeout(resolve, 500));
					wait.then(() => {
						flatListRef.current?.scrollToOffset({
							offset: index * averageItemLength,
							animated: true,
						});
					});
				}}
			>
				
			</SectionList>
			<BottomSheet/>
		</SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
	slider_cats: { 
		backgroundColor: 'red',
		flexGrow: 1,
	},
	item: {

	},
	title: {

	},
	header: {
		backgroundColor: 'green',
		color: 'white',
		paddingVertical: 10
	}
})
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
