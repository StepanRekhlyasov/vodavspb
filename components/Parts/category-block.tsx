import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { gStyle } from '../../styles/style'

export default function CatBlock({navigation, item, counter} : any) {
	const styles = StyleSheet.create({
		itemContainer: {
			width: 70,
			height: 70,
			backgroundColor: '#1197F8',
			borderRadius: 16,
			color: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: counter.length === counter.index+1?0:19
		},
		itemImg: {
			maxWidth: 28,
			maxHeight: 38,
		}
	})
	const [size, setSize] : any = useState({})
	useEffect (()=>{ 
		if(item.image){
			Image.getSize(item.image, (width,height)=>{ 
				setSize({width, height}) 
			})
		}
	},[item.image])
    return (
        <TouchableOpacity style={[gStyle.pH, styles.itemContainer]} onPress={()=> { navigation.push('Category', { id:item.id, title:item.name }) }}>
                {item.image?(
					<Image style={[styles.itemImg, {width: size?.width, height: size?.height}]} source={{uri:item.image}}></Image>
                ):(<Text>{':('}</Text>)}
        </TouchableOpacity>
    )
}
