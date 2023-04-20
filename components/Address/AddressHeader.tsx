import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View, Alert} from "react-native";
import { getSelectedAddress } from '../../helpers'

export default function AddressHeader(){
    const selectedAddress = getSelectedAddress()
	const navigtation = useNavigation()
	const route = useRoute()
    return (
		<Pressable 
			style={{
				flexDirection:'row', 
				alignItems:'center', 
				justifyContent:'flex-start', 
				paddingLeft: 12,
				width: 300
			}}
			onPress={()=>{(navigtation as any).navigate('AddressList')}}
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