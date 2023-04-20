import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { gStyle } from '../../styles/style'

export default function CatBlock({item, counter, active, flatListRef, indexes} : any) {
	const [size, setSize] : any = useState({})
	const styles = StyleSheet.create({
		itemContainer: {
			width: 70,
			height: 70,
			borderRadius: 16,
			color: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 8,
		},
		itemImg: {
			maxWidth: 28,
			resizeMode: 'contain'
		},
		mainWrapper:{
			marginRight: counter.length === counter.index+1?0:15,
			alignItems: 'center',
		},
		activeText: {
			color: 'black'
		},
		activeBackground: {
			backgroundColor: active?'#303148':'#1197F8'
		}
	})

	useEffect (()=>{ 
		if(item.image){
			Image.getSize(item.image, (width,height)=>{ 
				setSize({width, height}) 
			})
		}
	},[item.image])

    return (
		<View style={[styles.mainWrapper]}>
			<TouchableOpacity style={[styles.itemContainer, styles.activeBackground]} onPress={()=>{
				flatListRef.current.scrollToIndex({
					index: indexes[item.ID],
					animated: true,
				})
			}}>
					{item.image?(
						<Image style={[styles.itemImg, {width: size?.width, height: size?.height}]} source={{uri:item.image}}></Image>
					):(<Text>{':('}</Text>)}
			</TouchableOpacity>
			<Text numberOfLines={1} style={[gStyle.textCenter, gStyle.font, {width: 70}, styles.activeText]}>{item.name}</Text>
		</View>
    )
}
