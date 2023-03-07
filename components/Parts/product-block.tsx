import React, { memo, PureComponent, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { style } from '../../styles/product'
import { gStyle } from '../../styles/style'
import { addOne, removeOne, countInCart } from '../../helpers'
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
	}, [])
	
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
				<Text numberOfLines={2} style={[gStyle.textCenter]}>{item.name}</Text>
				{inCart?
					(
						<Text style={[gStyle.textCenter, {marginRight: 10}]}>{calcusCart.choosePrice(item.prices, inCart)} рублей/шт. </Text>
					):(
						<Text style={[gStyle.textCenter, {marginRight: 10}]}>{item.prices[0].price} рублей/шт. </Text>
					)
				}
				<View style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}>
					<ProductCartControls product={item} />
				</View>
			</View>
		</TouchableOpacity>
	)
}

const style = StyleSheet.create({
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
		width: 100,
		maxHeight: 140,
		height: 140
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