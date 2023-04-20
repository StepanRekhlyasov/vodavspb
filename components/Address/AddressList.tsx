import React, { useEffect } from "react";
import { Text, FlatList, Pressable, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';
/** Store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store, Address } from "../../store/types";
import { removeAddress, changeAddressProp, chooseAddress } from '../../store/actions/address'
import { useNavigation, useRoute } from "@react-navigation/native";
import { ImOnScreen } from '../../store/actions/app';

function AddressList({selected_address, addresses, actions} : any) {
	const navigation = useNavigation()
	const route : any = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

    const Item = ({street, index} : any) => (
        <View style={{
            backgroundColor: '#fff',
			borderRadius: 5,
            padding: 10,
            paddingRight: 25,
            marginTop: 5,
            width: '100%',
        }}>
            <Pressable onPress={()=>{
                actions.chooseAddress(index)
                navigation.goBack()
            }}
			style={{
				justifyContent: 'space-between',
				flexDirection: 'row'
			}}
			>
				<Text style={{fontWeight: 'bold'}}>{street}</Text>
				{selected_address===index?(<AntDesign name={'check'} color={'green'} size={18}/>):(<></>)}
			</Pressable>
        </View>
    );
    return (
        <View style={[styles.overlay]}>
            <FlatList
                data={addresses}
                renderItem={ ({item, index}) => <Item street={item.street} index={index}/> }
            />
			<View style={{
				backgroundColor: '#1197F8',
				borderRadius: 5,
				padding: 10,
				paddingRight: 25,
				marginTop: 5,
				width: '100%',
			}}>
				<Pressable onPress={()=>{
					(navigation as any).navigate('Map')
				}}
				style={{
					justifyContent: 'space-between',
					flexDirection: 'row'
				}}
				>
					<Text style={{fontWeight: 'bold', color: '#fff'}}>Добавить новый</Text>
				</Pressable>
			</View>
        </View>
    )
}
const mapStateToProps = (state : Store) => {
    const { addresses, selected_address } = state
    return { addresses, selected_address }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        removeAddress,
        changeAddressProp,
        chooseAddress,
		ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    overlay: {
        // flex: 1, 
        // zIndex: 2,
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // width: '100%',
        // height: screenHeight,
        // backgroundColor: '#f7f7f7',
    }
})