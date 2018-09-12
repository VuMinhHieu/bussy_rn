import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Image,
	Text,
} from 'react-native';

export default class Logo extends Component {
	render() {
		return (
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<Image style={styles.image_logo} source={require('../images/logo.gif')}/>
				<Text style={styles.app_title}>BUSSY</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image_logo: {
		width: 100,
		height: 100
	},
	app_title: {
		fontSize: 23,
		fontWeight: '800',
		color: '#fff',
		marginBottom: 30
	}
});

