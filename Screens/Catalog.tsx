import React, {useEffect, useCallback} from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { gStyle } from '../styles/style'
import { gridStyle } from '../styles/grid'
import { FlatGrid } from 'react-native-super-grid';
import { useState } from 'react';
import CatBlock from '../components/Parts/category-block'
import * as SplashScreen from 'expo-splash-screen';
// import { useRoute } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { saveCategories } from '../store/actions/cart';
import type { Store } from '../store/types'


export default function Cart({navigation} : any) {

    // const route : any = useRoute();
    // const id = route.params?route.params.id:null
    // const title = route.params?route.params.title:null
    // console.log('boo')
    // console.log(route)
    // if(id){
    //     console.log('boos')
    //     navigation.navigate('Product', { id: id, title: title })
    // }

    SplashScreen.preventAutoHideAsync();
    
    const categories = useSelector((state : Store) => state.categories)
    const dispatch = useDispatch()

    const [appIsReady, setAppIsReady] = useState(false);
   
    const [refreshing, setRefreshing] = React.useState(false);
        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            prepare().then(() => setRefreshing(false));
        }, []);
    async function prepare() {
        try {
            const response = await fetch(
                'https://vodavspb.ru/wp-json/wp/v2/categories?per_page=100',
            );
            const answer = await response.json();
            const result = answer.filter((row : any)=>{
                return row.count > 0 && ![2,4,5,17,18,19].includes(row.id)
            })
            dispatch(saveCategories(result))
            return;
        } catch (error) {
            console.error(error);
        } finally {
            setAppIsReady(true);
        }
    }
    useEffect(() => {
        prepare()
    }, []);
    
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
            {/* <FlatGrid itemDimension={130} style={gridStyle.gridView} data={categories} renderItem={({ item  } : any) => (
                <CatBlock item={item} navigation={navigation} />
            )} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />} /> */}
        </SafeAreaView>
    )
}
