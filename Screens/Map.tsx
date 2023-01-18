import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { MAP_KEY_ANDROID, MAP_KEY_IOS, MAP_KEY_DEVELOP } from '../store/constants'
import GoogleAutoComplete from './GoogleAutoComplete'
import Geocoder from 'react-native-geocoding';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const latitudeDelta = 0.002
const longitudeDelta = 0.002

function Map({actions, addresses, navigation} : any) {
    const [state, setState] : any = useState({
        latitudeDelta,
        longitudeDelta,
        region: undefined,
        address: '',
        hasLocationPermissions: false,
        locationResult: null,
        keyboardOffset: 0,
    })
    useEffect(() => {
        prepare()
    }, []);

    const MAP_KEY = Platform.OS == 'android'?MAP_KEY_DEVELOP:MAP_KEY_DEVELOP
    function prepare(){
        Geocoder.init(MAP_KEY, {language : "ru"});
        _getLocationAsync();
    }
    
    const _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setState({
                ...state,
                locationResult: 'Permission to access location was denied',
            });
        } else {
            setState({...state, hasLocationPermissions: true });
        }
        Location.getCurrentPositionAsync({}).then(location=>{
            setState({...state, region: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }})
        })
    };

    const onRegionChange = (region : any) => {
        console.log('GOOGLE EATS MY MONEY')
        Geocoder.from(region.latitude, region.longitude).then(json => {
            const address_components = json.results[0].address_components.map((row)=>{
                return row.long_name
            })
            const address = address_components[2] + ', ' + address_components[1] + ', ' + address_components[0]
            setState({...state, address: address})
		}).catch(error => console.warn(error));
    }

    const setAdress = (data : any, details : any) => {
        setState({...state, region: { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta}})
    }
    const { region, address } : any = state
    return (
        <SafeAreaView style={styles.map}>
            {state.region === undefined 
                ?
                <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Получаем местоположение...</Text> 
                </View>
                :
                <View style={styles.map}>
                    <SafeAreaView style={styles.header}>
                        <Text style={styles.region}>{address}</Text>
                    </SafeAreaView>
                    <MapView
                        style={styles.map}
                        region={region}
                        onRegionChangeComplete={onRegionChange}
                        provider={PROVIDER_GOOGLE}
                    />
                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={require('../assets/icons8-marker.png')} />
                    </View>
                </View>
            }
            <GoogleAutoComplete 
                MAP_KEY={MAP_KEY}
                setAdress={setAdress}
                address={address}
                navigation={navigation}
            />
        </SafeAreaView>
    )
        
}
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        position: 'absolute',
        width: '100%',
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    }
})

const mapStateToProps = (state : any) => {
    const { cart, products, total, total_cost } = state
    return { cart, products, total, total_cost }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)