import React, { useEffect, useState } from "react";
import { Text, FlatList, Pressable, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
/** Components */
import MyButton from "../Parts/button";
import AddressList from "./AddressList";
/** Store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store, Address } from "../../store/types";
import { removeAddress, changeAddressProp, chooseAddress } from '../../store/actions/address'
import { Dimensions } from 'react-native';
/** helpers */
import { getSelectedAddress } from '../../helpers'
import {Alert} from 'react-native' 
import { useNavigation } from '@react-navigation/native';


type PayLoad = {
    addresses : Address[],
    selected_address: any
    actions : any,
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function AddressSelector({ addresses, selected_address, actions } : PayLoad) {
    const [showList, toggleList] = useState(false)
    const navigation = useNavigation()
    const selectedAddress = getSelectedAddress()
    const toMaps = () => {
        (navigation as any).navigate('Map', {})
    }
    const updateAddress = (text : string, field : "entrance" | "intercom" | "apt" | "floor" | "info") => {
        actions.changeAddressProp(selected_address, field, text);
    }
    const name = selectedAddress?selectedAddress.street:'Адрес не выбран'
    const editable = selectedAddress?true:false
    return (
        <View style={styles.container}>
            {showList && 
                (<AddressList toggleList={toggleList}/>)
            }
            <View style={[styles.flexBetween, {marginBottom:14}]}>
                <Text style={{fontSize: 16,fontWeight: 'bold'}}>Адрес доставки</Text>
                <Pressable onPress={()=>{toggleList(true)}}><Text style={{fontSize: 14}}>Выбрать из списка</Text></Pressable>
            </View>
            <MyButton text={name} options={{
                height: 35,
                fontSize: 14,
                textAlign: 'left',
                paddingLeft: 17
            }}/>
            <View style={styles.flexBetween}>
                <TextInput editable={editable} placeholder="Подъезд" style={[styles.inputShort, styles.input]} onChangeText={(text)=>{updateAddress(text, 'entrance')}}>{selectedAddress?.entrance}</TextInput>
                <TextInput editable={editable} placeholder="Домофон" style={[styles.inputShort, styles.input]} onChangeText={(text)=>{updateAddress(text, 'intercom')}}>{selectedAddress?.intercom}</TextInput>
            </View>
            <View style={styles.flexBetween}>
                <TextInput editable={editable} placeholder="Кв./Офис" style={[styles.inputShort, styles.input]} onChangeText={(text)=>{updateAddress(text, 'apt')}}>{selectedAddress?.apt}</TextInput>
                <TextInput editable={editable} placeholder="Этаж" style={[styles.inputShort, styles.input]} onChangeText={(text)=>{updateAddress(text, 'floor')}}>{selectedAddress?.floor}</TextInput>
            </View>
            <TextInput editable={editable} placeholder="Комментарий к адресу" style={[styles.input]} onChangeText={(text)=>{updateAddress(text, 'info')}}>{selectedAddress?.info}</TextInput>
            <Pressable onPress={toMaps}><Text style={styles.addButton}>+ Добавить новый адрес</Text></Pressable>
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
        chooseAddress
    }, dispatch),
});

const styles = StyleSheet.create({
    container : {
        width: '100%',
        paddingHorizontal: 10
    },
    flexBetween: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        fontSize: 14,
        color: '#1197F8',
        textAlign: 'right',
        marginTop: 16
    },
    inputShort: {
        width: screenWidth - (screenWidth / 2) - 15,
    },
    input: {
        backgroundColor: '#F8F8F8',
        paddingVertical: 7,
        paddingHorizontal: 17,
        borderRadius: 9,
        marginTop: 9
    },
    overlay: {
        flex: 1, 
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: screenHeight,
        backgroundColor: '#f7f7f7',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressSelector)