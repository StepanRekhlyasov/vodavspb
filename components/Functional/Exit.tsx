import React from "react";
import { Pressable, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAuth } from "../../store/actions/profile";

const Exit = ({actions}: any) => {
	return (
			<Pressable
				onPress={()=>{actions.setAuth(false)}}
			>
				<Text style={{fontSize: 14, fontWeight: '400', color: 'red', paddingHorizontal: 12}}>Выйти</Text>
			</Pressable>
	)
}
const mapStateToProps = (state : any) => {
    const { } = state
    return { }
};

const mapDispatchToProps = (dispatch : any) => ({
	actions: bindActionCreators({
		setAuth
	}, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Exit)