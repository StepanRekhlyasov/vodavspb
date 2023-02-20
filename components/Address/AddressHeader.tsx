import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View, Alert} from "react-native";
import { getSelectedAddress } from '../../helpers'

export default function AddressHeader(){
    const selectedAddress = getSelectedAddress()
    return (
		<Pressable 
			style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingLeft: 19}}
			onPress={()=>{Alert.alert('Поздравляю','Ты нажал')}}
		>
			<Image style={{width:14, height:18, marginRight: 11}} source={require('../../assets/geoposition.png')}></Image>
			<Text 
			numberOfLines={1}
			style={{
				color: '#373F47',
				fontWeight: 'bold',
				fontSize: 16,
				lineHeight: 18
			}}>{selectedAddress.street}</Text>
		</Pressable>
    )
}