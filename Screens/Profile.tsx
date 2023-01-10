import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView } from 'react-native';
import { gStyle } from '../styles/style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Cart() {
        return (
            <SafeAreaView style={gStyle.box}>
                <Text>Авторизация и история заказов</Text>
                <StatusBar style="auto" />
            </SafeAreaView>
        )
}

const mapStateToProps = (state : any) => {
    const {  } = state
    return {  }
};

const mapDispatchToProps = (dispatch : any) => ({
    actions: bindActionCreators({
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)