import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { productStyle } from '../../styles/product'
import { gStyle } from '../../styles/style'
import { addOne, removeOne, countInCart } from '../../helpers'
/** Components */
import ProductCartControls from '../Functional/ProductCartControls';
import MyButton from './button'

export default class ProdBlock extends React.PureComponent {
	render(){
		const {index, navigation, item, actions, cart} : any = this.props
		const onPress = () => navigation.jumpTo('Shop', { initial: false, screen: 'Product', params: { id: item.ID, title:item.post_title }})
		
		return (
			<TouchableOpacity style={[productStyle.itemContainer, {marginRight: index % 2 == 0?12:0}]} onPress={onPress}>
				{item.image?(
				<View style={productStyle.itemImgWrapper}>
					<Image style={productStyle.itemImg} source={{uri:item.image}}></Image>
				</View>
				):(<View style={productStyle.itemImgWrapper}>
					<Text>No Image</Text>
				</View>)}
				<View style={productStyle.infoWrapper}>
					<Text style={gStyle.textCenter}>{item.name}</Text>
					<Text style={gStyle.textCenter}>{item.prices[0].price} рублей/шт.</Text>
					<Text style={gStyle.textCenter}>Заказ от: {item.min_qty} шт.</Text>
					<Text>{JSON.stringify(cart)}</Text>
					<ProductCartControls product={item} />
				</View>
			</TouchableOpacity>
		)
	}
}