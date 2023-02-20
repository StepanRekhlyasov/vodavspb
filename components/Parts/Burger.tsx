import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StatusBar, StyleSheet, View, Text } from "react-native";
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { SafeAreaView } from "react-native-safe-area-context";
import { requireNativeComponent } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 

export default function Burger({leftInclude} : {leftInclude?: JSX.Element}) {
    const navigation = useNavigation();
    return (
        <View style={styles.headerWrapper}>
            <Pressable style={styles.burger} onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
                <Entypo name="menu" size={24} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 17,
        paddingLeft: 17,
        // paddingVertical: 24,
    },
    burger: {
        // marginLeft: 'auto'
    }
})