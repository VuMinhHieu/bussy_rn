import React from 'react';
import {Image, View, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import {Text, Thumbnail, Icon, ListItem, Left, Body, Right, Button, Content, Badge} from 'native-base';
import {connect} from "react-redux";
import gstyles from '../components/styles';
import LottieView from 'lottie-react-native';

class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			air_plane: false,
			loading: false

		};
		this._inDevelopment = this._inDevelopment.bind(this);
		this._logout = this._logout.bind(this);
	}

	async _logout() {
		this.setState({loading: true});
		await AsyncStorage.setItem('fb_access_token', "");
		await AsyncStorage.setItem('user_account', "");
		await AsyncStorage.setItem('user_password', "");
		this.props.dispatch({type: "SET_LOGIN_STATUS", data: false});
		this.props.navigation.navigate('Login');
		this.setState({
			loading: false,
		});
	}

	_inDevelopment() {
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
			<Content>
				{this.state.loading ?
					<View style={[gstyles.container, {zIndex: 2}]}>
						<LottieView
							source={require('../images/loading..')}
							autoPlay
							loop/>
					</View>
					: null}
				<Image style={{height: 180, width: 280, resizeMode: 'cover'}}
				       source={require('../images/sidebar_image.jpg')}/>
				<View style={{
					alignItems: 'center',
					position: 'absolute',
					top: 60,
					right: 60,
					flexDirection: 'row',
					flexWrap: 'wrap'
				}}>
					<Thumbnail large source={require('../images/logo.gif')}/>
					<View style={{paddingLeft: 10}}>
						<Text style={{fontSize: 25}}>Bussy</Text>
						<Text note style={{color: '#252525', fontSize: 13}}>Booking service</Text>
					</View>
				</View>
				<View style={{backgroundColor: '#d0d0d0'}}>
					<View style={{backgroundColor: '#fff'}}>

						<ListItem icon>
							<Left>
								<Button style={{backgroundColor: "#71ff2a"}}>
									<Icon active type='FontAwesome' name="user"/>
								</Button>
							</Left>
							<Body>
							<Text>My Profiles</Text>
							</Body>
							<Right>
								<TouchableOpacity onPress={this._inDevelopment}>
									<Icon active style={{color: "#007AFF"}} name="arrow-forward"/>
								</TouchableOpacity>
							</Right>
						</ListItem>

						<ListItem icon>
							<Left>
								<Button style={{backgroundColor: "#f11c26"}}>
									<Icon active type='MaterialCommunityIcons' name="logout"/>
								</Button>
							</Left>
							<Body>
							<Text>Log out</Text>
							</Body>
							<Right>
								<TouchableOpacity onPress={this._logout}>
								<Icon active style={{color: "#007AFF"}} name="arrow-forward"/>
								</TouchableOpacity>
							</Right>
						</ListItem>
					</View>
				</View>
			</Content>
		);
	}
};

export default connect()(SideBar);