import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
/** store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyButton from '../components/Parts/button';
import { removeAddress } from '../store/actions/address'
import { setAuth } from '../store/actions/profile'
import { SetUpHeader, ImOnScreen } from '../store/actions/app';
import MyTypes from "../store/types";

interface Payload {
	navigation: any,
	actions: any,
	user: MyTypes['User']
}

const Gated = ({ navigation, actions, user } : Payload) => {
	const route = useRoute()
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen(route.name)
        });
        return unsubscribe;
    }, [navigation]);

	useEffect(()=>{

	}, [])
	
	return (
		<SafeAreaView style={styles.wrapper}>
			<View>
				{
					user.is_auth ? (
						<Text>Вы авторизованы</Text>
					) : (
						<Text>Пожалуйста, авторизуйтесь</Text>
					)
				}
			</View>
		<Button
			title="Авторизоваться"
			onPress={() => actions.setAuth(!user.is_auth)}
		/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
 wrapper: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
 },
});

const mapStateToProps = (state : any) => {
    const { addresses, user } = state
    return { addresses, user }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        ImOnScreen,
		setAuth
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gated)