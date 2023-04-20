import React from "react";
import { Pressable, Text, View } from "react-native";
const BottomButtonFixed = ({wrapperStyle, containerStyle, text1, text2, onPress} : {
	containerStyle?: any,
	wrapperStyle: any,
	text1: string,
	text2?: string,
	onPress: ()=>void
}) => {
	return (
		<View style={containerStyle}>
			<Pressable
				onPress={onPress}
			>
				<View style={wrapperStyle?wrapperStyle:{flexDirection:'row', justifyContent: 'space-between'}}>
					<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>{text1}</Text>
					<Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>{text2}</Text>
				</View>
			</Pressable>
		</View>
	)
}

// const mapStateToProps = (state : MyTypes['Store']) => {
//     const {} = state
//     return {}
// };

// export default connect(mapStateToProps)(ToCheckoutFixed)

export default BottomButtonFixed