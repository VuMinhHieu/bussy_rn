import React, {Component} from "react";
import Icon from '@expo/vector-icons/FontAwesome';
import IonIcon from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Text,
	ImageBackground,
	Keyboard,
	Alert
} from 'react-native';

import DismissKeyboardView from '../components/DismissKeyboardView';
import Logo from '../components/logoComponent';
import db from "../Firebase";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class CreateAccountScreen extends Component {
	static navigationOptions = {title: 'Create Account'};

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			display_name: '',
			email: '',
			phone_number: '',
			loading: false,
			username_error: false,
			password_error: false,
			email_error: false,
		};
		this.inputs = [];
		this.focusNextField = this.focusNextField.bind(this);
		this.registerButton = this.registerButton.bind(this);
	}

	async registerButton() {
		Keyboard.dismiss();
		let email_error = false;
		let password_error = false;
		let username_error = false;
		this.setState({
			loading: true,
			email_error, password_error, username_error,
		});
		if ( this.state.email.length > 0 ) {
			const validateEmail = this.validateEmail(this.state.email);
			if (!validateEmail) email_error = true;
		}
		if ( this.state.password.length < 1 ) password_error = true;
		if ( this.state.username.length < 1 ) username_error = true;
		if ( email_error || password_error || username_error ) {
			this.setState({
				email_error, password_error, username_error,
				loading: false
			});
		} else {
			const users = db.collection('users');
			const getExistUsers = await users
				.where("username", "==", this.state.username)
				.where("password", "==", this.state.password)
				.get();
			const isUserExsits = [];
			getExistUsers.forEach((doc) => doc.exists ? isUserExsits.push(doc.data()) : null);
			if ( isUserExsits.length > 0 ) {
				username_error = true;
				password_error = true;
				this.setState({
					email_error, password_error, username_error,
					loading: false
				});
			} else {

					users.doc().set({
						display_name: this.state.display_name,
						email: this.state.email,
						password: this.state.password,
						phone_number: this.state.phone_number,
						username: this.state.username,
					});
				setTimeout(() => {
					this.setState({
						loading: false
					});
					Alert.alert(
						'Thanks for registration',
						'Your ' + this.state.username + ' account is now setup and ready to go.',
						[
							{text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
						],
						{cancelable: false}
					);
				}, 2500);
			}
		}
	}

	validateEmail = (email) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(email) === false) {
			return false;
		}
		return true;
	};

	focusNextField(id) {
		this.inputs[id].focus();
	}


	render() {
		return (
			<ImageBackground
				style={styles.wallpapper_image}
				source={require('../images/background_login.jpg')}>
				{this.state.loading ?
					<View style={[styles.container, {zIndex:2}]}>
						<LottieView
							source={require('../images/account_success')}
							autoPlay
							loop />
					</View>
					: null}
				<DismissKeyboardView
					keyboardVerticalOffset={150}
					style={styles.container}>
					<Logo/>
					<View style={[styles.register_input_wrap, this.state.username_error ? {borderColor:"#ff0e29"} : '']}>
						<Icon style={styles.register_icon} name='user'/>
						<TextInput
							onChangeText={(username) => this.setState({username})}
							value={this.state.username}
							style={styles.register_input}
							placeholder="Username *"
							placeholderTextColor='#1F1F1F'
							returnKeyType="next"
							autoCorrect={false}
							blurOnSubmit={false}
							ref={input => {
								this.inputs['one'] = input;
							}}
							onSubmitEditing={() => {
								this.focusNextField('two');
							}}
						/>
					</View>
					<View style={[styles.register_input_wrap, this.state.password_error ? {borderColor:"#ff0e29"} : '']}>
						<Icon style={styles.register_icon} name='lock'/>
						<TextInput
							onChangeText={(password) => this.setState({password})}
							value={this.state.password}
							style={styles.register_input}
							secureTextEntry={true}
							placeholder="Password *"
							placeholderTextColor='#1F1F1F'
							returnKeyType="next"
							autoCorrect={false}
							blurOnSubmit={false}
							ref={input => {
								this.inputs['two'] = input;
							}}
							onSubmitEditing={() => {
								this.focusNextField('three');
							}}
						/>
					</View>
					<View style={styles.register_input_wrap}>
						<Icon style={styles.register_icon} name='user-secret'/>
						<TextInput
							onChangeText={(display_name) => this.setState({display_name})}
							value={this.state.display_name}
							style={styles.register_input}
							placeholder="Display Name"
							placeholderTextColor='#1F1F1F'
							returnKeyType="next"
							autoCorrect={false}
							ref={input => {
								this.inputs['three'] = input;
							}}
							onSubmitEditing={() => {
								this.focusNextField('four');
							}}
						/>
					</View>
					<View style={[styles.register_input_wrap, this.state.email_error ? {borderColor:"#ff0e29"} : '']}>
						<IonIcon style={styles.register_icon} name='ios-mail'/>
						<TextInput
							onChangeText={(email) => this.setState({email})}
							value={this.state.email}
							style={styles.register_input}
							keyboardType='email-address'
							placeholderTextColor='#1F1F1F'
							placeholder="Email"
							returnKeyType="next"
							autoCorrect={false}
							blurOnSubmit={false}
							ref={input => {
								this.inputs['four'] = input;
							}}
							onSubmitEditing={() => {
								this.focusNextField('five');
							}}
						/>
					</View>
					<View style={styles.register_input_wrap}>
						<Icon style={styles.register_icon} name='phone'/>
						<TextInput
							onChangeText={(phone_number) => this.setState({phone_number})}
							value={this.state.phone_number}
							style={styles.register_input}
							placeholder="Phone Number"
							placeholderTextColor='#1F1F1F'
							keyboardType='number-pad'
							autoCorrect={false}
							ref={input => {
								this.inputs['five'] = input;
							}}
						/>
					</View>
					<TouchableOpacity
						style={styles.button_register}
						onPress={this.registerButton}>
						<Text style={styles.button_register_text}>Register</Text>
					</TouchableOpacity>
				</DismissKeyboardView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	wallpapper_image: {
		flex: 1,
	},
	container: {
		backgroundColor: 'rgba(0, 0, 0, .3)',
		position: 'absolute',
		flex: 1,
		height: DEVICE_HEIGHT - 60,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		top: 0
	},
	register_input_wrap: {
		width: DEVICE_WIDTH - 50,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'flex-start',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		marginTop: 5,
		marginBottom: 5,
		borderColor: "transparent",
		borderWidth:1
	},
	button_register: {
		width: DEVICE_WIDTH - 50,
		borderRadius: 5,
		backgroundColor: '#1180ff',
		marginTop: 10,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button_register_text: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold'
	},
	register_icon: {
		fontSize: 23,
		marginRight: 15,
	},
	register_input: {
		width: DEVICE_WIDTH - 150,
		fontSize: 18
	}
});

export default CreateAccountScreen;