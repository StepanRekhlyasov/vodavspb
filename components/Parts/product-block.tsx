import React, { memo, PureComponent, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { style } from '../../styles/product'
import { gStyle } from '../../styles/style'
/** Components */
import ProductCartControls from '../Functional/ProductCartControls';
import MyButton from './button'
/** store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomSheetHandler } from '../../store/actions/app';
/** etc */
import { calcusCart } from '../../helpers';
const ProdBlock = ({ item, actions, ITEM_HEIGHT, inCart} : any) => {
	const onPress = useCallback(() => {
		actions.BottomSheetHandler({
			ID: item.ID,
			show: true
		})
	}, [item.ID])
	const style = StyleSheet.create({
		quantity : {
			flex: 1,
			width: 30,
			height: 30,
			alignItems: 'center',
			justifyContent: 'center',
			margin: 'auto'
		},
		itemImgWrapper: {
			width: 100,
			maxHeight: ITEM_HEIGHT,
			height: ITEM_HEIGHT
		},
		itemImg: {
			flex:1, 
			resizeMode: 'contain',
		},
		infoWrapper: {
			flex: 1,
			alignItems: 'center',
			// height: ITEM_HEIGHT,
			justifyContent: 'space-between',
		},
		gridView: {
			marginTop: 10,
			flex: 1,
		},
		itemContainer: {
			justifyContent: 'flex-start',
			alignItems: 'center',
			flexDirection: 'row',
			flex: 1,
			width: '100%',
			borderRadius: 16,
			backgroundColor: 'white',
			overflow: 'hidden',
			
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
	return (
		<TouchableOpacity style={[style.itemContainer, {height:ITEM_HEIGHT, maxHeight:ITEM_HEIGHT}]} onPress={onPress}>
			{
				item.image?(
				<View style={style.itemImgWrapper}>
					<Image style={style.itemImg} source={{uri:item.image}}></Image>
				</View>
				):(<View style={style.itemImgWrapper}>
					<Text>No Image</Text>
				</View>)
			}
			<View style={style.infoWrapper}>
				<Text numberOfLines={2} style={[gStyle.textCenter, {fontSize: 16, marginBottom: 10, maxWidth: '60%'}]}>{item.name}</Text>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}>
					<Text style={[gStyle.textCenter, {marginRight: 10, fontSize: 16}]}>{calcusCart.choosePrice(item.prices, inCart)} руб. </Text>
					<ProductCartControls product={item} />
				</View>
			</View>
		</TouchableOpacity>
	)
}



const mapStateToProps = (state : any, props: any) => {
    const { cart } = state
	const inCart = cart.find((row : any)=>row.ID==props.item.ID)?.count
    return { inCart }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
		BottomSheetHandler
    }, dispatch),
});
export default memo(connect(mapStateToProps, mapDispatchToProps)(ProdBlock))