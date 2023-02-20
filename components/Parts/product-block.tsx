import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { productStyle } from '../../styles/product'
import { gStyle } from '../../styles/style'
import { addOne, removeOne, countInCart } from '../../helpers'
import MyButton from './button'

export default function ProdBlock({navigation, item, actions, cart} : any) {
    const onPress = () => navigation.jumpTo('Shop', { initial: false, screen: 'Product', params: { id: item.ID, title:item.post_title }})
    return (
        <TouchableOpacity style={productStyle.itemContainer} onPress={onPress}>
            {item.thumbnail?(
            <View style={productStyle.itemImgWrapper}>
                <Image style={{width: 100,height: 100,}}  source={{uri:item.thumbnail}}></Image>
            </View>
            ):(<View style={productStyle.itemImgWrapper}>
                <Text>No Image</Text>
            </View>)}
            <View style={productStyle.infoWrapper}>
                <Text style={gStyle.center}>{item.post_title}</Text>
                <Text style={gStyle.center}>{item.price} рублей/шт. Заказ от: {item.qty} шт.</Text>
                    {countInCart(item.ID, cart) > 0 ? (
                        <View style={{marginTop:'auto'}}>
                            <Text style={gStyle.center}>Итого: {item.price*countInCart(item.ID, cart)} руб.</Text>
                            <View style={productStyle.quantityButtons}>
                                <MyButton
                                    text={'-'}
                                    // style={productStyle.quantityButton}
                                    action={()=>{actions.addToCart({
                                        ID : item.ID,
                                        count : removeOne({item, cart})
                                    })}}
                                    />
                                <View style={productStyle.quantity}><Text>{countInCart(item.ID, cart)}</Text></View>
                                <MyButton
                                    text={'+'}
                                    // style={productStyle.quantityButton}
                                    action={()=>{actions.addToCart({
                                        ID : item.ID,
                                        count : addOne({item, cart})
                                    })}}
                                />
                            </View>
                        </View>
                        ):(
                            <View style={{marginTop:'auto'}}>
                                {/* <MyButton 
                                text={'Добавить в корзину'} 
                                style={productStyle.button}
                                action={()=>{actions.addToCart({
                                    ID : item.ID,
                                    count : addOne({item, cart})
                                })}}/> */}
                            </View>
                    )}
            </View>
        </TouchableOpacity>
    )
}