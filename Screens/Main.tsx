import React, { useState, useEffect, useRef, useMemo, memo, useCallback} from 'react';
import { SafeAreaView, RefreshControl, Text, View, StyleSheet, SectionList, FlatList, Pressable, StatusBar, Platform } from 'react-native';
import ProdBlock from '../components/Parts/product-block'
import CatBlock from '../components/Parts/category-block'
import { connect } from 'react-redux';
import { addToCart, saveProducts } from '../store/actions/cart';
import { ImOnScreen } from '../store/actions/app';
import { bindActionCreators } from 'redux';

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

// type Categories = Category[]
const Main = memo(({actions, navigation, shop, ProductBottomSheet } : any) => {
	// console.log('mega render')
	const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Main')
        });
        return unsubscribe;
    }, [navigation]);

    const [appIsReady, setAppIsReady] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] : [MyTypes['Category'][], any] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
	const [listData, setListData] = useState<any>([])
	const [sectionPosition, setSectionPosition] = useState<string>('')

	useEffect(()=>{
		const catNumber = listData.findIndex((row : any)=>
			row.title == sectionPosition
		)
		const xOffset = (catNumber - 1) * 85
		catListRef.current?.scrollTo({x:xOffset, y: 0})
	}, [sectionPosition])

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

	useEffect(()=>{
		let result = []
		// result.push({title: 'Акции', data: [{ list: [], special: true}]})
		for (const cat of Object.values(categories)) {
			const list = products.filter((row : any)=>{
				return row.category == cat.ID
			})
			result.push({title: cat.name, data: [{ list: list }]})
			// result.push({title: cat.name, data: [{ list: list.slice(0, 21) }]})
		}
		setListData(result)
	}, [categories])
	const ITEM_HEIGHT = 295
	const HEADER_HEIGHT = 50
	const SPECIAL_HEIGHT = ITEM_HEIGHT
	const SEPARATOR_HEIGHT = 20
	const calcFlatLayout = useCallback((data : any, index : any) => {
		// console.log(data, index)
		// console.log('Render'+data[0].category, data[index], index )
		return {length: ITEM_HEIGHT + SEPARATOR_HEIGHT, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index, index}
	}, [])
	// const calcSectionLayout = useCallback((data : any, index : any) => {
	// 	return {length: ITEM_HEIGHT + SEPARATOR_HEIGHT * 24, offset: ITEM_HEIGHT + SEPARATOR_HEIGHT * 24, index}
	// 	const headers = [0,3,6,9,12,15,18,21,24,27]
	// 	const footers = [2,5,8,11,14,17,20,23,26,29]
	// 	if(headers.includes(index)){
	// 		return {length: HEADER_HEIGHT, offset: HEADER_HEIGHT * index, index}
	// 	}
	// 	if(footers.includes(index)){
	// 		return {length: 0, offset: 0, index}
	// 	}
	// 	const trueIndex = [1,4,7,10,13,16,19,22,25,28]
	// 	const items = data[trueIndex.indexOf(index)].data[0].list.length
	// 	console.log('Render', data[trueIndex.indexOf(index)], index )
	// 	console.log({length: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * items, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * items * trueIndex.indexOf(index), index})
	// 	return {length: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * items, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * items * trueIndex.indexOf(index), index}
	// }, [])
	const renderSection = useCallback(({ item } : any) => (!item.special ? 
		<FlatList
			data={item.list}
			numColumns={2}
			renderItem={renderListItem}
			getItemLayout={calcFlatLayout}
			keyExtractor={item.ID}
			ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT}} />}
		/> : <View style={{
			height: SPECIAL_HEIGHT,
			backgroundColor: 'yellow'
		}}>
			<Text>Акции</Text>
		</View>
	), [])

	const renderListItem = useCallback(({ item, index } : any) => {
		return (<ProdBlock item={item} navigation={navigation} actions={actions} index={index} ITEM_HEIGHT={ITEM_HEIGHT}/>)
	}, [])
	// const renderListItem = useMemo(() => {
	// 	return (<ProdBlock item={item} navigation={navigation} actions={actions} index={index}/>)
	//   }, [listData]);
	
	// useCallback(({ item, index } : any) => {
	// 	return (<ProdBlock item={item} navigation={navigation} actions={actions} index={index}/>)
	// }, [])
	const flatListRef : any = useRef()
	const catListRef : any = useRef()

	const onCheckViewableItems = (item : any) =>{
		// console.log(listData)
						setSectionPosition(item.viewableItems
							[0]?.section.title)
	}

	const styles = StyleSheet.create({
		slider_cats: { 
			backgroundColor: 'red',
			flexGrow: 1,
		},
		header: {
			// backgroundColor: 'white',
			color: 'black',
			height: HEADER_HEIGHT,
			lineHeight: HEADER_HEIGHT,
			fontSize: 24,
		}
	})

    return (
        <SafeAreaView style={{paddingHorizontal: 12, flex:1}} >
			<StatusBar/>
			<View>
				<ScrollView 
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.slider_cats}
					// scrollEventThrottle={200}
					// decelerationRate="fast"
					nestedScrollEnabled = {true}
					style={{
						flexGrow: 0
					}}
					ref = {catListRef}
				>
					<CategorySlider categories={categories} sectionPosition={sectionPosition} setSectionPosition={setSectionPosition} flatListRef={flatListRef}/>
				</ScrollView>
			</View>
			<SectionList
				ref = {flatListRef}

				initialNumToRender={20}
				maxToRenderPerBatch={50}
				updateCellsBatchingPeriod={10}
				windowSize={300}

				sections={listData}
				renderItem={renderSection}
				viewabilityConfig={{
					viewAreaCoveragePercentThreshold: 50,
				}}
				// getItemLayout = {calcSectionLayout}
				onViewableItemsChanged={onCheckViewableItems}
				renderSectionHeader={({section: section}) => {
					const index = listData.indexOf(section)
					if(section.title=='Акции'){
						return (
							<></>
						)
					}
					return(
						<Text style={styles.header}>{section.title}</Text>
					)
				}}
				stickySectionHeadersEnabled = {false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
				}
				onScrollToIndexFailed = { ({
					index,
					averageItemLength,
				  }) => {
					console.log('Scroll faild!', averageItemLength, index)
					return
					const wait = new Promise(resolve => setTimeout(resolve, 500));
					wait.then(() => {
						flatListRef.current?.scrollToOffset({
							offset: index * averageItemLength,
							animated: true,
						});
					});
				}}
			>
				<Text>Test</Text>
			</SectionList>
			{/* { ProductBottomSheet.show &&
				<Pressable 
					style={{opacity: 0.5, backgroundColor: 'black', width: 1000, height: '100%', position: 'absolute', top: 0, right: 0, zIndex: 0, flex: 1}} 
					onPress={()=>{actions.BottomSheetToggler(false)}}
				></Pressable>
			}
			<ProductBottomSheetComponent/> */}
		</SafeAreaView>
    ) 
})


const mapStateToProps = (state : any) => {
    const { cart, shop, ProductBottomSheet } = state
    return { cart, shop, ProductBottomSheet }
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
