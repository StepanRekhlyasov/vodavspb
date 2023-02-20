/** react */
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, FlatList, View } from 'react-native';
import { gStyle } from '../styles/style';
/** store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyButton from '../components/Parts/button';
import { removeAddress } from '../store/actions/address'
import { SetUpHeader, ImOnScreen } from '../store/actions/app';
/** components */
import PhoneNumber from "./PhoneNumber";
import AddressSelector from '../components/Address/AddressSelector'
/** types */
import type { Address } from '../store/types'
import { useRoute } from '@react-navigation/native';

type payload = {
    addresses: Address[],
    navigation: any,
    actions: any
}

  
function Profile({addresses, navigation, actions} : payload) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Профиль')
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={[gStyle.box, {flexDirection: 'column'}]}>
            <StatusBar style="auto" />
            <AddressSelector/>
            <MyButton text="test" action={()=>{navigation.navigate('Gated')}}></MyButton>
        </SafeAreaView>
    )
}

const mapStateToProps = (state : any) => {
    const { addresses } = state
    return { addresses }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        removeAddress,
        ImOnScreen
    }, dispatch),
});

Profile.navigationOptions = {
    drawer: {
        icon: () => (
          <Text>Test</Text>
    )}
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)