import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { gStyle } from '../../styles/style'

export default function CatBlock({item, counter, active, flatListRef} : any) {
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
			color: active?'green':'black'
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
				// console.log('Scrolling to:', counter.index+1)
				flatListRef.current.scrollToLocation({
					itemIndex: 0,
					sectionIndex: counter.index,
					animated: false,
					// viewOffset: 50
				})
				// list.current.scrollToLocation({
				// 	itemIndex: 0,
				// 	sectionIndex: counter.index
				// });
			}}>
					{item.image?(
						<Image style={[styles.itemImg, {width: size?.width, height: size?.height}]} source={{uri:item.image}}></Image>
					):(<Text>{':('}</Text>)}
			</TouchableOpacity>
			<Text numberOfLines={2} style={[gStyle.textCenter, gStyle.font, {width: 70}, styles.activeText]}>{item.name} + {item.ID}</Text>
		</View>
    )
}
