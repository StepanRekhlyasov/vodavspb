import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';
/** components */
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 


const GooglePlacesInput = (
    { MAP_KEY, setRegion, close} : 
    { MAP_KEY:String, setRegion: Function, close: any }
) => {
    const ref : any = useRef();
    
    /** кнопка назад */
    const backButton = ()=><TouchableOpacity onPress={close}>
        <AntDesign name="left" size={24} color="black" style={{marginTop:12,marginRight:10}} />
    </TouchableOpacity>
    /** кнопка отчистить инпут для андроида */
    const clearAndroid = Platform.OS === "android"?()=> 
        <TouchableOpacity onPress={()=>{ref.current?.clear();}}style={{position: 'absolute',right: 5,bottom: 15}}>
            <MaterialCommunityIcons name={'close'} color={'black'} size={30} />
    </TouchableOpacity>:()=><></>
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar/>
            <GooglePlacesAutocomplete
                    renderRightButton = {clearAndroid}
                    renderLeftButton = {backButton}
                    ref={ref}
                    placeholder='Поиск'
                    onPress={({}, detail) => {
                        setRegion({
                            latitude: detail?.geometry?.location?.lat, 
                            longitude: detail?.geometry?.location?.lng,
                            latitudeDelta: null,
                            longitudeDelta: null,
                        }, { isSearch : true })
                    }}
                    GooglePlacesSearchQuery = {{
                        rankby: 'distance'
                    }}
                    query={{
                        key: MAP_KEY,
                        language: 'ru',
                        components: 'country:ru',
                        types: 'address',
                        location: '59.992839241470726, 30.366506012581926',
                        radius: '50000',
                        strictbounds: true,
                    }}
                    fetchDetails = {true}
                    styles={{
                        textInput: {
                            height: 50,
                            color: '#5d5d5d',
                            fontSize: 14,
                            paddingRight: 25
                        },
                        container: {
                            width: '100%',
                            flex: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight?StatusBar.currentHeight+20:20:20
                        },
                    }}
                    GoogleReverseGeocodingQuery = {
                        {language: 'ru'}
                    }
                />
        </SafeAreaView>
    );
};

export default GooglePlacesInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    h1: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    shadowProp: {},
    back: {
        position: 'absolute',
        top: 25,
        right: 20
    },
    buttonOne: {
        backgroundColor: '#0080f0',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        zIndex: -1,
        width: '100%'
    },
    buttonOneText: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    wrapper: {
        flex: 1, 
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    }
})