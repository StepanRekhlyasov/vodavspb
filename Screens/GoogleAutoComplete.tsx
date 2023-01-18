import React, { useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import MyButton from '../components/button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { addAddress } from '../store/actions/profile'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const GooglePlacesInput = (
    {navigation, addresses, MAP_KEY, setAdress, address = '', actions} : 
    {navigation: any, addresses: string[], MAP_KEY:String, setAdress: Function, address: string, actions: any }
) => {
    const ref : any = useRef();
    useEffect(() => {
        ref.current?.setAddressText(address);
    }, [address]);

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                ref={ref}
                placeholder='Поиск'
                onPress={(data, details = null) => {
                    setAdress(data, details);
                }}
                GooglePlacesSearchQuery = {{
                    rankby: 'distance'
                }}
                query={{
                    key: MAP_KEY,
                    language: 'ru',
                    components: 'country:ru',
                    types: 'address'
                }}
                fetchDetails = {true}
                styles={{
                    textInput: {
                        height: 50,
                        color: '#5d5d5d',
                        fontSize: 14,
                    },
                    container: {
                        width: '100%',
                        flex: 1,
                    },
                }}
                textInputProps = {{
                    multiline: true,
                }}
                keyboardShouldPersistTaps = {'never'}
                numberOfLines = {2}
                GoogleReverseGeocodingQuery = {
                    {language: 'ru'}
                }
            />
            {addresses.length > 0 ? (
                <MyButton 
                    text="Добавить" 
                    style={{
                        backgroundColor: '#0080f0',
                    }}
                    textStyle={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: 10
                    }}
                    disabled = {address?false:true}
                    action={()=>{
                        actions.addAddress(address)
                        navigation.navigate('Profile')
                    }}
                />
            ) : (
                <MyButton 
                    text="Далее" 
                    style={{
                        backgroundColor: '#0080f0',
                    }}
                    textStyle={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: 10
                    }}
                    disabled = {address?false:true}
                    action={()=>{
                        actions.addAddress(address)
                    }}
                />
            )
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    }
})

const mapStateToProps = (state : any) => {
    const { addresses } = state
    return { addresses }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addAddress
    }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(GooglePlacesInput);