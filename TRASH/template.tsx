/** React */
import React, { useEffect, ReactElement, FC, FunctionComponent} from "react";
import { View } from "react-native";
/** Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/** Store */
import { ImOnScreen } from '../store/actions/app';
/** Components */

const Template = ({navigation, actions} : any) => {
	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            actions.ImOnScreen('Profile')
        });
        return unsubscribe;
    }, [navigation]);
	return (
		<></>
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