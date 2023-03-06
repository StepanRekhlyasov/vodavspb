import React, { useCallback, useMemo, useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { connect } from 'react-redux';
import { BottomSheetHandler, BottomSheetToggler } from '../../store/actions/app';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCartControls from './ProductCartControls';
import { productStyle } from '../../styles/product';
import type { Product } from '../../store/types';

const ProductBottomSheetComponent = ({actions, BottomSheetHandler, ProductBottomSheet, shop} : any) => {

	const [product, setProduct] = useState<undefined | Product>(undefined)
	
	useMemo(() => {
		setProduct(shop.products.find((row: {ID: number})=>row.ID==ProductBottomSheet.ID))
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

  // renders
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
				<ScrollView style={{paddingHorizontal:10}}>
					{product.image ? (
					<View style={productStyle.itemImgWrapper}>
						<Image style={productStyle.itemImg} source={{uri:product.image}}></Image>
					</View>
					):(<View style={productStyle.itemImgWrapper}>
						<Text>No Image</Text>
					</View>)}
					<ProductCartControls product={product} inModal={true} />
				</ScrollView>
				</BottomSheetModal>
		</BottomSheetModalProvider>
	  );
  } else {
	return (<></>)
  }
};

const styles = StyleSheet.create({
	// container: {
	// 	paddingHorizontal: 24,
	// 	paddingVertical: 24,
	// 	justifyContent: 'center',
	// 	backgroundColor: 'grey',
	// },
	// contentContainer: {
	// 	flex: 1,
	// 	alignItems: 'center',
	// },
});

const mapStateToProps = (state : any) => {
    const { ProductBottomSheet, shop } = state
    return { ProductBottomSheet, shop }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        BottomSheetHandler,
		BottomSheetToggler
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBottomSheetComponent)