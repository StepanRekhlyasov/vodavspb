import React, {useEffect, useCallback} from 'react';
import { gridStyle } from '../styles/grid'
import { Text, SafeAreaView, View, Image } from 'react-native';
import { gStyle } from '../styles/style';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function Product({navigation} : any) {
    const route : any = useRoute();
    const id = route.params?route.params.id:null
    
    const [appIsReady, setAppIsReady] = useState(false);
    const [item, setProduct] : any = useState([])

    useEffect(() => {
        async function prepare() {
            try {
                const response = await fetch(
                    'https://vodavspb.ru/wp-json/wp/v2/posts/'+ id +'?_embed',
                );
                const answer = await response.json();
                setProduct(answer)
                return;
            } catch (error) {
                console.error(error);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, [id]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    
    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView style={gStyle.box} onLayout={onLayoutRootView}>
                    {item._embedded['wp:featuredmedia']['0'].source_url?(
                    <View style={gridStyle.itemImgWrapper}>
                        <Image style={gridStyle.itemImg} source={{uri:item._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url}}></Image>
                        <Text>Здесь можно будет добавить товар в карзину</Text>
                        <Text onPress={()=>{navigation.goBack()}}>Go Back</Text>
                    </View>
                    ):(<View style={gridStyle.itemImgWrapper}>
                        <Text>No Image</Text>
                    </View>)}
        </SafeAreaView>
    )

   
}

