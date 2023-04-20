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

const AddressBottomSheet = ({actions, show} : any) => {

	useEffect(()=>{
		if(show){
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [show])

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ['100%'], []);
	const handleSheetChanges = (index: number) => {
		actions.BottomSheetToggler(index<0?false:true)
	}
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
					<Text>Hello</Text>
				</View>
				</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AddressBottomSheet)