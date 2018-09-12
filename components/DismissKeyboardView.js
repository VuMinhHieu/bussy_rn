import React from 'react';
import {TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, View, StyleSheet, Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const DismissKeyboardHOC = (Comp) => {
	return ({children, ...props}) => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Comp {...props}>
				<KeyboardAvoidingView
					style={props.style || styles.container}
					keyboardVerticalOffset={props.keyboardVerticalOffset}
					behavior={props.behavior || "padding"}
					enabled
				>
					{children}
				</KeyboardAvoidingView>
			</Comp>
		</TouchableWithoutFeedback>
	);
};
export default DismissKeyboardView = DismissKeyboardHOC(View);

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0, 0, 0, .5)',
		position: 'absolute',
		flex: 1,
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
	},
});