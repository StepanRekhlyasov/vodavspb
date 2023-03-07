import React, { useState, useEffect, useRef, useMemo, memo, useCallback} from 'react';
import { SafeAreaView, RefreshControl, Text, View, StyleSheet, SectionList, FlatList, Pressable, StatusBar, Platform } from 'react-native';
import ProdBlock from '../components/Parts/product-block'
import CatBlock from '../components/Parts/category-block'
import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { ImOnScreen } from '../store/actions/app';
import { bindActionCreators } from 'redux';
import { useScrollToTop } from '@react-navigation/native';

/** Redux */
import { SetUpHeader } from '../store/actions/app';
import { BottomSheetToggler } from '../store/actions/app';
/** components */
import ProductBottomSheetComponent from '../components/Functional/ProductBottomSheet';
import CategorySlider from '../components/Parts/category_slider';
// import MapView from 'react-native-maps';
/** Saga */
import api from '../store/api/website'
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
/** types */
import MyTypes from '../store/types';
import ToCartFixed from '../components/Functional/ToCartFixed';

// type Categories = Category[]
const Main = memo(({actions, navigation, shop, ProductBottomSheet } : any) => {
	console.log('mega render')
	const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Main')
        });
        return unsubscribe;
    }, [navigation]);

    const [appIsReady, setAppIsReady] = useState(false);
    const [products, setProducts] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [categories, setCategories] = useState<MyTypes['Category'][]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
	const [listData, setListData] = useState<any>([])
	const [sectionPosition, setSectionPosition] = useState<number | undefined>()

	useEffect(()=>{
		const position = categories.findIndex((row : any)=>
			row.ID == sectionPosition
		)
		const xOffset = position * 85
		catListRef.current?.scrollTo({x: xOffset, y: 0})
	}, [sectionPosition])

	const onRefresh = () => {
		setRefreshing(true);
		prepare().then(() => setRefreshing(false));
	};

    async function prepare() {
		dispatch({type: 'SHOP_FETCH_REQUESTED', payload: 'jaja'})
    }
    useEffect(() => {
        prepare()
    }, []);

	useEffect(() => {
        setProducts(shop.products)
		setCategories(shop.categories)
		setIndexes(shop.indexes)
		if(shop.products?.length && shop.categories?.length){
            setAppIsReady(true);
            return
        }
    }, [shop]);

	const ITEM_HEIGHT = 140
	const HEADER_HEIGHT = 50
	const SPECIAL_HEIGHT = ITEM_HEIGHT
	const SEPARATOR_HEIGHT = 20
	const calcFlatLayout = useCallback((data : any, index : any) => {
		return {length: ITEM_HEIGHT + SEPARATOR_HEIGHT, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index, index}
	}, [])
	const flatListRef : any = useRef()
	const catListRef : any = useRef()
	const renderListItem = useCallback(({ item, index } : any) => {
		return (<ProdBlock item={item} navigation={navigation} actions={actions} index={index} ITEM_HEIGHT={ITEM_HEIGHT}/>)
	}, [])
	const styles = StyleSheet.create({
		slider_cats: { 
			backgroundColor: 'red',
			flexGrow: 1,
		},
		header: {
			color: 'black',
			height: HEADER_HEIGHT,
			lineHeight: HEADER_HEIGHT,
			fontSize: 24,
		}
	})
	const viewabilityConfig = {
		viewAreaCoveragePercentThreshold: 100,
	}
	const onViewableItemsChanged = (item : any) => {
		if(item.viewableItems.length){
			setSectionPosition(item.viewableItems[0].item.category)
		}
	}
	const viewabilityConfigCallbackPairs : any = useRef([{ onViewableItemsChanged, viewabilityConfig }])
	useScrollToTop(flatListRef)
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
					ref = {catListRef}
				>
					<CategorySlider categories={categories} indexes={indexes} sectionPosition={sectionPosition} setSectionPosition={setSectionPosition} flatListRef={flatListRef}/>
				</ScrollView>
			</View>
			<FlatList
				viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
				}
				data={products}
				ref = {flatListRef}
				numColumns={1}
				renderItem={renderListItem}
				getItemLayout={calcFlatLayout}
				ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT}} />}
				initialNumToRender={20}
				maxToRenderPerBatch={50}
				updateCellsBatchingPeriod={10}
				windowSize={300}
			/>
			{ ProductBottomSheet.show &&
				<Pressable 
					style={{opacity: 0.5, backgroundColor: 'black', width: 1000, height: '100%', position: 'absolute', top: 0, right: 0, zIndex: 0, flex: 1}} 
					onPress={()=>{actions.BottomSheetToggler(false)}}
				></Pressable>
			}
			<ProductBottomSheetComponent/>
			<ToCartFixed/>
		</SafeAreaView>
    ) 
})


const mapStateToProps = (state : any) => {
    const { shop, ProductBottomSheet } = state
    return { shop, ProductBottomSheet }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addToCart,
        saveProducts,
        SetUpHeader,
        ImOnScreen,
		BottomSheetToggler
    }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main)
