import React, {Component} from "react";
import {connect} from "react-redux";
import Icon from '@expo/vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import {
	View,
	AsyncStorage,
	StyleSheet,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Text,
	ImageBackground,
	Alert, Keyboard,
} from 'react-native';

import DismissKeyboardView from '../components/DismissKeyboardView';
import Logo from '../components/logoComponent';
import db from "../Firebase";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Login extends Component {
	static navigationOptions = {title: 'Login', header: null};

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			username: '',
			password: '',
		}
	}

	async componentDidMount() {
		const fb_token = await AsyncStorage.getItem('fb_access_token');
		fb_token && this.props.navigation.navigate('App');

		const user_account = await AsyncStorage.getItem('user_account');
		const user_password = await AsyncStorage.getItem('user_password');
		const user_name = await AsyncStorage.getItem('user_name');
		const user_email = await AsyncStorage.getItem('user_email');
		const user_phone = await AsyncStorage.getItem('user_phone');

		this.props.dispatch({type: "UPDATE_USERDATA_NAME", data: user_name});
		this.props.dispatch({type: "UPDATE_USERDATA_EMAIL", data: user_email});
		this.props.dispatch({type: "UPDATE_USERDATA_PHONE", data: user_phone});

		user_account && user_password && this.props.navigation.navigate('App');

		this.setState({
			loading: false
		})
	}

	async Login() {
		Keyboard.dismiss();
		this.setState({
			loading: true
		});
		setTimeout(async () => {
			const users = db.collection('users');
			const getExistUsers = await users
				.where("username", "==", this.state.username)
				.where("password", "==", this.state.password)
				.limit(1)
				.get();
			const isUserExsits = [];
			getExistUsers.forEach(async (user) => {
				if ( user.exists ){
					const userData = user.data();
					isUserExsits.push(userData);
					await AsyncStorage.setItem('user_account', this.state.username);
					await AsyncStorage.setItem('user_password', this.state.password);
					await AsyncStorage.setItem('user_name', userData.display_name);
					await AsyncStorage.setItem('user_email', userData.email);
					await AsyncStorage.setItem('user_phone', userData.phone_number);

					this.props.dispatch({type: "UPDATE_USERDATA_NAME", data: userData.display_name});
					this.props.dispatch({type: "UPDATE_USERDATA_EMAIL", data: userData.email});
					this.props.dispatch({type: "UPDATE_USERDATA_PHONE", data: userData.phone_number});

					this.props.navigation.navigate('App');
				}
			});
			this.setState({
				loading: false
			});
		}, 1200);
	}

	async FbLogin() {
		const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2216234058704282', {
			permissions: ['public_profile'],
		});
		if (type === 'success') {// Get the user's name using Facebook's Graph API
			try {
				await AsyncStorage.setItem('fb_access_token', token);
				this.props.navigation.navigate('App');
			} catch (error) {
				console.log('Error: setItem fb_access_token');
			}
		}
	}

	createAccount() {
		this.props.navigation.navigate('CreateAccount');
	}

	forgotPassword() {
		Alert.alert(
			'Notice',
			'This feature is under development',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{cancelable: false}
		)
	}

	render() {
		return (
			<ImageBackground
				style={styles.wallpapper_image}
				source={require('../images/background_login.jpg')}>
				{this.state.loading ?
					<View style={[styles.container, {zIndex: 2}]}>
						<LottieView
							source={require('../images/trail_loading')}
							autoPlay
							loop/>
					</View>
					: null}
				<DismissKeyboardView>
					<Logo/>
					<View style={styles.login_input_wrap}>
						<Icon style={styles.login_icon} name='user'/>
						<TextInput
							onChangeText={(username) => this.setState({username})}
							value={this.state.username}
							style={styles.login_input}
							placeholder="Username"
							placeholderTextColor='#1F1F1F'
							returnKeyType="next"
							autoCorrect={false}
							blurOnSubmit={false}
							onSubmitEditing={() => {
								this.passwordTextInput.focus();
							}}
						/>
					</View>
					<View style={styles.login_input_wrap}>
						<Icon style={styles.login_icon} name='lock'/>
						<TextInput
							onChangeText={(password) => this.setState({password})}
							value={this.state.password}
							ref={(input) => {
								this.passwordTextInput = input;
							}}
							style={styles.login_input}
							autoCorrect={false}
							secureTextEntry={true}
							placeholder="Password"
							placeholderTextColor='#1F1F1F'
							onSubmitEditing={() => this.Login()}
						/>
					</View>
					<TouchableOpacity
						style={styles.button_login}
						onPress={() => this.Login()}>
						<Text style={styles.button_login_text}>LOGIN</Text>
					</TouchableOpacity>
					<View style={styles.fb_button_wrap}>
						<Icon style={styles.fb_icon} name='facebook'/>
						<TouchableOpacity
							style={{marginTop: 10}}
							onPress={() => this.FbLogin()}>
							<Text style={styles.fb_button_text}>Login with facebook</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.create_account_wrap}>
						<TouchableOpacity
							style={styles.create_account_button}
							onPress={() => this.createAccount()}>
							<Text style={styles.create_account_button_text}>Create Account</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.forgot_password_button}
							onPress={() => this.forgotPassword()}>
							<Text style={styles.create_account_button_text}>Forgot Password</Text>
						</TouchableOpacity>
					</View>
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
		backgroundColor: 'rgba(0, 0, 0, .9)',
		position: 'absolute',
		flex: 1,
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		top: 0
	},
	login_input_wrap: {
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
		marginBottom: 5
	},
	button_login: {
		width: DEVICE_WIDTH - 50,
		backgroundColor: '#1180ff',
		marginTop: 10,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5
	},
	button_login_text: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold'
	},
	login_icon: {
		fontSize: 23,
		marginRight: 15,
	},
	login_input: {
		width: DEVICE_WIDTH - 150,
		fontSize: 18
	},
	fb_button_wrap: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		padding: 5,
		borderWidth: 1,
		borderColor: '#3947ff',
		backgroundColor: '#3947ff',
		borderRadius: 5,
	},
	fb_icon: {
		color: '#3947ff',
		fontSize: 25,
		marginRight: 10,
		paddingTop: 4,
		paddingBottom: 4,
		paddingRight: 8,
		paddingLeft: 8,
		backgroundColor: '#fff'
	},
	fb_button_text: {
		fontSize: 20,
		color: '#fff',
		marginTop: -8
	},
	create_account_wrap: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: DEVICE_WIDTH - 50,
		marginTop: 30
	},
	create_account_button: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	create_account_button_text: {
		fontSize: 18,
		color: '#fff'
	},
	forgot_password_button: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
});

export default connect()(Login);