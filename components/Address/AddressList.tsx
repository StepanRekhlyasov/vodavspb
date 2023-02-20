import React from "react";
import { Text, FlatList, Pressable, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';
/** Store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store, Address } from "../../store/types";
import { removeAddress, changeAddressProp, chooseAddress } from '../../store/actions/address'

function AddressList({toggleList, addresses, actions} : any) {
    const Item = ({street, index} : any) => (
        <View style={{
            backgroundColor: '#f9c2ff',
            padding: 10,
            paddingRight: 25,
            marginTop: 5,
            width: '100%',
        }}>
            <Pressable onPress={()=>{
                actions.chooseAddress(index)
                toggleList(false)
            }}><Text style={{fontWeight: 'bold'}}>{street}</Text></Pressable>
        </View>
    );
    return (
        <View style={[styles.overlay]}>
            <TouchableOpacity onPress={()=>{toggleList(false)}}>
                <AntDesign name="left" size={24} color="black" style={{marginTop:12,marginRight:10}} />
            </TouchableOpacity>
            <FlatList
                data={addresses}
                renderItem={ ({item, index}) => <Item street={item.street} index={index}/> }
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
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