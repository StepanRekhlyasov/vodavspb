import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
/** store */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyButton from '../components/Parts/button';
import { removeAddress } from '../store/actions/address'
import { SetUpHeader, ImOnScreen } from '../store/actions/app';

const Gated = ({ navigation, actions } : any) => {
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Gated')
        });
        return unsubscribe;
    }, [navigation]);
	
	return (
		<SafeAreaView style={styles.wrapper}>
		<View>
			<Text>Successfully registered!</Text>
		</View>
		<Button
			title="Start over"
			onPress={() => navigation.replace("PhoneNumber")}
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
    const { addresses } = state
    return { addresses }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
        ImOnScreen
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gated)