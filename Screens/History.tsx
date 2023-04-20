/** React */
import { useRoute } from "@react-navigation/native";
import React, { useEffect, ReactElement, FC, FunctionComponent} from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
/** Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/** Store */
import { ImOnScreen } from '../store/actions/app';
/** Components */

const Template = ({navigation, actions} : any) => {
	const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);
	return (
		<View style={{paddingHorizontal: 12, flex:1, paddingTop: 20}}>
			<StatusBar/>
			<Text>История заказов скоро будет!</Text>
		</View>
	)
}

const mapStateToProps = (state : any) => {
    const { } = state
    return { }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
		ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template)