import React, { memo, PureComponent, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { productStyle } from '../../styles/product'
import { gStyle } from '../../styles/style'
import { addOne, removeOne, countInCart } from '../../helpers'
/** Components */
import ProductCartControls from '../Functional/ProductCartControls';
import MyButton from './button'
/** store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomSheetHandler } from '../../store/actions/app';

const ProdBlock = ({index, item, actions, ITEM_HEIGHT} : any) => {
	// console.log('rerrenders')
	// useEffect(()=>{
	// 	console.log('index changed')
	// }, [index])
	// useEffect(()=>{
	// 	console.log('item changed')
	// }, [item])
	// useEffect(()=>{
	// 	console.log('actions changed')
	// }, [actions])
	// console.log('product render')
	const onPress = useCallback(() => {
		actions.BottomSheetHandler({
			ID: item.ID,
			show: true
		})
	}, [])
	
	return (
		<TouchableOpacity style={[productStyle.itemContainer, {marginRight: index % 2 == 0?12:0}, {height:ITEM_HEIGHT,maxHeight:ITEM_HEIGHT}]} onPress={onPress}>
			{item.image?(
			<View style={productStyle.itemImgWrapper}>
				<Image style={productStyle.itemImg} source={{uri:item.image}}></Image>
			</View>
			):(<View style={productStyle.itemImgWrapper}>
				<Text>No Image</Text>
			</View>)}
			<View style={productStyle.infoWrapper}>
				<Text numberOfLines={2} style={gStyle.textCenter}>{item.name}</Text>
				{/* <Text style={gStyle.textCenter}>{item.prices[0].price} рублей/шт.</Text> */}
				{/* <Text style={[gStyle.textCenter, {marginBottom: 10}]}>Заказ от: {item.min_qty} шт.</Text> */}
				<ProductCartControls product={item} />
			</View>
		</TouchableOpacity>
	)
}

const mapStateToProps = (state : any) => {
    const {  } = state
    return {  }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
		BottomSheetHandler
    }, dispatch),
});
export default memo(connect(mapStateToProps, mapDispatchToProps)(ProdBlock))