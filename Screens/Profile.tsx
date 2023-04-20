/** react */
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, FlatList, View, Dimensions } from 'react-native';
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
import BottomButtonFixed from '../components/Functional/BottomButtonFixed';
import MyTypes from '../store/types';

type payload = {
    addresses: Address[],
    navigation: any,
    actions: any,
	user: MyTypes['User']
}

  
function Profile({addresses, navigation, actions, user} : payload) {
    const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{paddingHorizontal: 12, flex:1, paddingTop: 20}}>
            <StatusBar style="auto" />
            <AddressSelector/>
			{
				!user.is_auth &&  <BottomButtonFixed
					text1 = {'Авторизоваться'}
					text2 = {''}
					onPress = {()=>{navigation.navigate('Authorization')}}
					containerStyle = {{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: Dimensions.get('window').width,
						justifyContent: 'center',
						backgroundColor: '#303148',
						borderTopLeftRadius: 9,
						borderTopRightRadius: 9,
						paddingVertical: 12,
						paddingHorizontal: 24
					}}
					wrapperStyle = {{flexDirection:'row', justifyContent: 'center'}}
				/>
			}
        </View>
    )
}

const mapStateToProps = (state : any) => {
    const { addresses, user } = state
    return { addresses, user }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        removeAddress,
        ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)