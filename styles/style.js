import { StyleSheet } from "react-native";
import { Platform, StatusBar } from 'react-native';

export const gStyle = StyleSheet.create({
    box: {
        backgroundColor: 'red',
        paddingHorizontal: 19,
        paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight?StatusBar.currentHeight+20:20:20,
		flex: 1
    },
	pH: {
		paddingHorizontal: 19
	},
    button: {
        backgroundColor: 'blue'
    },
    center: {
        textAlign: 'center'
    }
})