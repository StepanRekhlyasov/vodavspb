import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, FlatList, View } from 'react-native';
import { gStyle } from '../styles/style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyButton from '../components/button';
import { removeAddress } from '../store/actions/profile'
import PhoneNumber from "./PhoneNumber";

type payload = {
    addresses: string[],
    navigation: any,
    actions: any
}

  
function Cart({addresses, navigation, actions} : payload) {
        const toMaps = () => {
            navigation.navigate('Map')
        }
        const Item = ({title} : any) => (
            <View style={{
                backgroundColor: '#f9c2ff',
                padding: 10,
                paddingRight: 25,
                marginTop: 5,
                width: '100%',
            }}>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                <MyButton
                    text="x"
                    style={{position: 'absolute', right: 10, top: 10}}
                    action={()=>{actions.removeAddress(title)}}
                />
            </View>
        );
        return (
            <SafeAreaView style={[gStyle.box, {flexDirection: 'column'}]}>
                <StatusBar style="auto" />
                <Text>Адреса:</Text>
                <MyButton
                        text="Добавить новый адрес" 
                        style={{
                            backgroundColor: '#0080f0',
                            marginTop: 5
                        }}
                        textStyle={{
                            color: '#fff',
                            textAlign: 'center',
                            padding: 10,
                        }}
                        action={toMaps}
                    />
                <FlatList
                    data={addresses}
                    renderItem={ ({item}) => <Item title={item}/> }
                />
                <PhoneNumber/>
                
            </SafeAreaView>
        )
}

const mapStateToProps = (state : any) => {
    const { addresses } = state
    return { addresses }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        removeAddress
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)