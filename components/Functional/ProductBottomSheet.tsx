import React, { useCallback, useMemo, useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { connect } from 'react-redux';
import { BottomSheetToggler } from '../../store/actions/app';
import { bindActionCreators } from 'redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCartControls from './ProductCartControls';
import type { Product } from '../../store/types';
import { calcusCart } from '../../helpers';

const ProductBottomSheetComponent = ({actions, ProductBottomSheet, shop, inCart} : any) => {
	const [product, setProduct] = useState<{prices: [], image: '', ID: number, name: string} | Product>({prices: [], image: '', ID: -1, name: ''})

	const [sortedPrices, setSortedPrices] = useState<{qty: string, price: string}[]>([{qty: '', price: ''}])
	const [choosedPrice, setChoosedPrice] = useState<number>()

	useEffect(()=>{
		setChoosedPrice(calcusCart.choosePrice(product.prices, inCart))
	}, [inCart])
	

	useMemo(() => {
		const prod = shop.products.find((row: {ID: number})=>row.ID==ProductBottomSheet.ID)
		if(prod){
			setProduct(prod)
			setSortedPrices(calcusCart.sortedPrices(prod.prices))
		}
	}, [ProductBottomSheet.ID]);
	
	useEffect(()=>{
		if(ProductBottomSheet.show){
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [ProductBottomSheet.show])

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ['90%'], []);
	const handleSheetChanges = useCallback((index: number) => {
		actions.BottomSheetToggler(index<0?false:true)
	}, []);
	if(product){
		return (
			<BottomSheetModalProvider>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={0}
						snapPoints={snapPoints}
						onChange={handleSheetChanges}
						enablePanDownToClose={true}
					>
					<View style={{paddingHorizontal:10}}>
						<View style={style.centerWrapper}>
							<Text style={{fontSize: 20, fontWeight: '700', maxWidth: '90%', textAlign: 'center'}}>{product.name}</Text>
						</View>
						{product.image ? (
						<View style={style.itemImgWrapper}>
							<Image style={style.itemImg} source={{uri:product.image}}></Image>
						</View>
						):(<View style={style.itemImgWrapper}>
							<Text>No Image</Text>
						</View>)}
						<View style={style.centerWrapper}>
							<ProductCartControls product={product} inModal={true} />
						</View>
						<View style={style.centerWrapper}>
							{/* <Text>{JSON.stringify(product)}</Text> */}
							<FlatList
								data={sortedPrices}
								renderItem={({item})=>(
									<Text style={{
										fontWeight: choosedPrice==parseInt(item.price)?'700':'400'
									}}>Цена от {item.qty} шт. - {item.price} руб.</Text>
								)}
							/>
						</View>
					</View>
					</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	} else {
		return (<></>)
	}
};

const style = StyleSheet.create({
	prices : {

	},
	centerWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
    quantityButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },  
    quantityButton: {
        width: 60,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#beffb4'
    },
    button: {
        height: 30,
        borderRadius: 10,
        backgroundColor: '#b4b4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    quantity : {
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    itemImgWrapper: {
		width: '100%',
		maxHeight: 140,
		height: 140,
    },
    itemImg: {
		flex:1, 
		resizeMode: 'contain',
	},
    infoWrapper: {
        flex: 1,
		alignItems: 'center',
        height: 100,
		marginTop: 20,
        justifyContent: 'space-between',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
		flexDirection: 'row',
		flex: 1,
		width: '100%',
        borderRadius: 16,
		backgroundColor: 'purple'
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    }
})

const mapStateToProps = (state : any) => {
    const { ProductBottomSheet, shop, cart } = state
	const inCart = cart.find((row : any)=>row.ID==ProductBottomSheet.ID)?.count
	return { ProductBottomSheet, shop, inCart }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
		BottomSheetToggler
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBottomSheetComponent)