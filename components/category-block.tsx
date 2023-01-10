import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { gridStyle } from '../styles/grid'

export default function CatBlock({navigation, item} : any) {
    return (
        <TouchableOpacity style={gridStyle.itemContainer} onPress={()=> { navigation.push('Category', { id:item.id, title:item.name }) }}>
                {item.acf.image?(
                <View style={gridStyle.itemImgWrapper}>
                    <Image style={gridStyle.itemImg} source={{uri:item.acf.image}}></Image>
                </View>
                ):(<View style={gridStyle.itemImgWrapper}>
                    <Text>No Image</Text>
                </View>)}
                <Text>{item.name} ({item.count})</Text>
        </TouchableOpacity>
    )
}