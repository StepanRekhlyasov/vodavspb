import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { MAP_KEY_ANDROID, MAP_KEY_IOS, MAP_KEY_DEVELOP } from '../store/constants'
import GoogleAutoComplete from './GoogleAutoComplete'
import Geocoder from 'react-native-geocoding';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { geocodeResultToStreet, getSelectedAddress } from '../helpers'
import MyButton from '../components/Parts/button'
/** Redux */
import { addAddress, chooseAddress } from '../store/actions/address'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const latitudeDelta = 0.009
const longitudeDelta = 0.009
const MAP_KEY = Platform.OS == 'android'?MAP_KEY_DEVELOP:MAP_KEY_DEVELOP



function Map({actions, addresses, navigation} : any) {
    const route : any = useRoute();
    const [state, setState] : any = useState({
        latitudeDelta,
        longitudeDelta,
        region: undefined,
        street: '',
        formatted_address: '',
        hasLocationPermissions: false,
        locationResult: null,
        keyboardOffset: 0,
        addressWarning: 'Поиск...',
        search: false,
        initialRegion: undefined,
        geocoding: false,
        city: ''
    })
    const selectedAddress = getSelectedAddress()
    
    useEffect(() => {
        prepare()
    }, []);

    const addAddress = () => {
        if(state.street){
            actions.addAddress({
                street : state.street,
                city: state.city,
                formatted_address : state.formatted_address,
                lat : region.latitude,
                lng : region.longitude
            })
            actions.chooseAddress(addresses.length)
            if(route.name == 'Map'){
                navigation.goBack()
            }
        }
    }

    async function prepare(){
        Geocoder.init(MAP_KEY, {language : "ru"});
        if(selectedAddress && (selectedAddress.lat && selectedAddress.lng)){
            setState({...state, initialRegion: {latitude: selectedAddress.lat, longitude: selectedAddress.lng, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta}})
        } else {
            _getLocationAsync()
        }
    }
    
    const _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setState({
                ...state,
                locationResult: 'Разрешение на доступ к геопозиции не получено',
            });
            return
        } else {
            setState({...state, hasLocationPermissions: true });
        }
        const location = await Location.getCurrentPositionAsync({accuracy:5});
        setState({...state, initialRegion: {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta}})
    };

    const onRegionChange = (region : any, type? : any) => {
        if(type?.isGesture || type?.isSearch){
            setState({...state, 
                street: '', addressWarning: 'Поиск...', search: false, 
                region: { latitude: region.latitude, longitude: region.longitude, latitudeDelta: region.latitudeDelta?region.latitudeDelta:latitudeDelta, longitudeDelta: region.longitudeDelta?region.longitudeDelta:longitudeDelta }})
        }  else {
            setState({...state, geocoding: true})
            addressGeocode(region.latitude, region.longitude)
        }
    }

    const addressGeocode = (lat : number, lng : number) => {
        console.log('GOOGLE EATS MY MONEY')
        Geocoder.from(lat, lng).then(json => {
            const result = geocodeResultToStreet(json)
            setState({...state, 
                addressWarning: result.addressWarning, 
                street: result.street, 
                city: result.city,
                formatted_address: result.formatted_address
            })
		}).catch(error => console.warn(error.message));
    }

    const { region, street, addressWarning, locationResult, initialRegion } : any = state
    return (
        <SafeAreaView style={styles.map}>
            <StatusBar style="auto" />
            {/* {back button to do} */}
            { route.name == 'Map' &&
                <TouchableOpacity 
                onPress={()=>{
                    navigation.goBack()
                }}
                style={{
                    position: 'absolute',
                    left: 10,
                    top: 40,
                    zIndex: 10,
                }}>
                    <MaterialCommunityIcons name={'close'} color={'black'} size={30} />
                </TouchableOpacity>
            }
            {/* {back button to do} */}
            {state.initialRegion === undefined?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>{locationResult?locationResult:'Получаем местоположение...'}</Text> 
                </View>
                :
                <View style={styles.map}>
                    {state.search &&
                            <GoogleAutoComplete 
                                MAP_KEY={MAP_KEY}
                                setRegion={onRegionChange}
                                close = {()=>{setState({...state, search : false})}}
                            />
                    }
                    <View style={styles.header} pointerEvents={'box-none'}>
                        <View pointerEvents={'none'}>
                            <Text style={styles.region}>{street?street:addressWarning}</Text>
                        </View>
                        <MyButton 
                            text='Изменить адрес доставки' 
                            action = {() => { 
                                setState({...state, search: true})
                            }}
                            options = {{
                                backGroundColor : '#fff',
                                textColor: '#000',
                                fontSize: 14,
                                height: 40,
                                borderRadius: 31,
                                shadow: true
                            }}
                        />
                    </View>
                    <SafeAreaView style={styles.footer}>
                        <MyButton disabled={!street} text={'Я здесь'} action={addAddress} />
                    </SafeAreaView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <MapView
                            style={styles.map}
                            region={region}
                            initialRegion={initialRegion}
                            onRegionChangeComplete={onRegionChange}
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            mapPadding = {{top:30,right:10,bottom:100,left:10}}
                        ></MapView>
                    </TouchableWithoutFeedback>
                    <View style={styles.markerFixed}>
                        <Image source={require('../assets/marker.png')} />
                    </View>
                </View>
            }
        </SafeAreaView>
    )
        
}
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -20,
        marginTop: -90,
        position: 'absolute',
        top: '50%'
    },
    footer: {
        bottom: 28,
        zIndex: 1,
        position: 'absolute',
        width: '90%',
        flex: 1,
        alignSelf: 'center'
    },
    header: {
        top: 100,
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    region: {
        color: '#25263A',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 35,
        margin: 20,
        textAlign: 'center',
    },
})
const mapStateToProps = (state : any) => {
    const { cart, products, total, total_cost, selected_address, addresses } = state
    return { cart, products, total, total_cost, addresses, selected_address }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        addAddress,
        chooseAddress
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)