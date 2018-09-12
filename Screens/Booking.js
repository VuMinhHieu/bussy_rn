import React, {Component} from "react";
import {connect} from "react-redux";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image, Dimensions, TextInput, Alert
} from 'react-native';
import LottieView from 'lottie-react-native';
import gstyles from '../components/styles';

import {number_format} from "../functions";
import Icon from '@expo/vector-icons/FontAwesome';
import IonIcon from '@expo/vector-icons/Ionicons';
import DismissKeyboardView from '../components/DismissKeyboardView';
import db from "../Firebase";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Booking extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam('name', "BOOKING"),
		};
	};

	constructor(props) {
		super(props);
		this.state=({
			loading: false,
		});
		this.inputs = [];
		this.focusNextField = this.focusNextField.bind(this);
		this.checkout = this.checkout.bind(this);
	}

	focusNextField(id) {
		this.inputs[id].focus();
	}

	async checkout(listSelectedSeat) {
		console.log("checkout");
		this.setState({
		    loading: true,
		});
		const {routeData, userData} = this.props;
		const arrTicket = listSelectedSeat.map(seat =>  {
			return {
				seat: seat,
				user_name: userData.userName,
				phone_number: userData.userPhone,
				note: userData.userNote,
			}
		});
		const routes = {
			...routeData,
			ticket:[
				...routeData.ticket,
				...arrTicket
			]
		};
		db.collection('routes').doc(routeData.ID).set(routes);
		this.props.dispatch({type: "UPDATE_SEAT_STATUS_AFTER_BOOKING"});

		const datePicker = this.props.date.split("-");
		let startDate = new Date(datePicker[2], parseInt(datePicker[1]) - 1, datePicker[0], 0, 0, 0, 0).getTime();
		const now = new Date().getTime();
		if (startDate < now) startDate = now;
		const endDate = new Date(datePicker[2], parseInt(datePicker[1]) - 1, datePicker[0], 23, 59, 59, 0).getTime();

		const getRoutes = await db.collection("routes")
			.where("date", ">=", startDate)
			.where("date", "<=", endDate)
			.where("from", "==", this.props.from)
			.where("to", "==", this.props.to)
			.get().catch(function (error) {
				console.log("Error getting document:", error);
			});
		let busesData = [];
		getRoutes.forEach(route => {
			busesData.push({ID: route.id, ...route.data()})
		});

		busesData = busesData.sort((a, b) => a.date - b.date);

		this.props.dispatch({type: "GET_ROUTES", data: busesData});


		setTimeout(()=>{
			this.setState({
				loading: false,
			});
			Alert.alert(
				'Thanks for Booking with Us!',
				'Your booking is completed. Please come depart place at least 30 mins earlier to get your ticket. For more infomation please contact us: 19001006',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false}
			)
		}, 1000)
	}

	render() {
		const {navigation, routeData, listSeatBooked, userData} = this.props;
		const listSelectedSeat = [];
		listSeatBooked.map((seat, index) => seat === 2 ? listSelectedSeat.push(index + 1) : null);
		return (
			<DismissKeyboardView
				behavior="position"
				keyboardVerticalOffset={65}
				style={styles.container}>
				{this.state.loading ?
					<View style={[gstyles.container, {height: DEVICE_HEIGHT - 160, zIndex: 2}]}>
						<LottieView
							source={require('../images/checked_done_')}
							autoPlay
							loop/>
					</View>
					: null}
				<View style={{marginTop: 0, flexDirection: "row", marginHorizontal: 20}}>
					<View style={styles.defineWrap}>
						<Text style={[styles.defineSquare, {backgroundColor: "#FFF"}]}> </Text>
						<Text>Empty</Text>
					</View>
					<View style={styles.defineWrap}>
						<Text style={[styles.defineSquare, {backgroundColor: "#a6a6a6"}]}> </Text>
						<Text>Booked</Text>
					</View>
					<View style={styles.defineWrap}>
						<Text style={[styles.defineSquare, {backgroundColor: "#90ef3f"}]}> </Text>
						<Text>Selected</Text>
					</View>
				</View>

				<View style={{marginTop: 10, flexDirection: "row", borderWidth:1, borderRadius: 10, paddingVertical:5}}>
					<View style={styles.seatsWrap}>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 0})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[0] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[0] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 1})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[1] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[1] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<Image style={[styles.seat, {marginTop: 10}]} source={require("../images/steering-wheel.png")}/>
					</View>
					<View style={styles.seatsWrap}>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 2})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[2] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[2] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 3})}>
							<Image
								style={[styles.seat, {marginTop: 50}]}
								source={listSeatBooked[3] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[3] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
					</View>

					<View style={styles.seatsWrap}>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 4})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[4] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[4] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 5})}>
							<Image
								style={[styles.seat, {marginTop: 50}]}
								source={listSeatBooked[5] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[5] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
					</View>

					<View style={styles.seatsWrap}>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 6})}>
							<Image
								style={[styles.seat, {marginTop: 5}]}
								source={listSeatBooked[6] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[6] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 7})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[7] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[7] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.dispatch({type: "UPDATE_SEAT_STATUS", index: 8})}>
							<Image
								style={styles.seat}
								source={listSeatBooked[8] === 1 ? require("../images/limousine-gray.png") : listSeatBooked[8] === 0 ? require("../images/limousine-white.png") : require("../images/limousine-green.png")}/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{marginTop: 5, flexDirection: "row", marginHorizontal: 20}}>
					<View style={{flex: 2, marginRight: 5}}>
						<Text style={{height: 35}} >Seat Number: {listSelectedSeat.length > 0 ? listSelectedSeat.join(", ") : `Please select at least 1 seat.`}</Text>
					</View>
					<View style={{flex: 1, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end"}}>
						<Text>Total: {number_format(listSelectedSeat.length * routeData.price)}</Text>
						<Text style={{fontSize: 11}}>đ</Text>
					</View>
				</View>

				<View style={styles.formWrap}>
					<View style={styles.input_wrap}>
						<Icon style={styles.input_icon} name='user-secret'/>
						<TextInput
							onChangeText={(name) => this.props.dispatch({type: "UPDATE_USERDATA_NAME", data: name})}
							value={userData.userName}
							style={styles.field_input}
							placeholder="Name"
							placeholderTextColor='#A3A3A3'
							returnKeyType="next"
							autoCorrect={false}
							onSubmitEditing={() => {
								this.focusNextField('one');
							}}
						/>
					</View>
					<View style={styles.input_wrap}>
						<IonIcon style={styles.input_icon} name='ios-mail'/>
						<TextInput
							onChangeText={(email) => this.props.dispatch({type: "UPDATE_USERDATA_EMAIL", data: email})}
							value={userData.userEmail}
							style={styles.field_input}
							keyboardType='email-address'
							placeholderTextColor='#A3A3A3'
							placeholder="Email"
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
					<View style={styles.input_wrap}>
						<Icon style={styles.input_icon} name='phone'/>
						<TextInput
							onChangeText={(phone_number) => this.props.dispatch({type: "UPDATE_USERDATA_PHONE", data: phone_number})}
							value={userData.userPhone}
							style={styles.field_input}
							placeholder="Phone Number"
							placeholderTextColor='#A3A3A3'
							keyboardType='number-pad'
							autoCorrect={false}
						/>
					</View>
					<View style={styles.input_wrap}>
						<TextInput
							onChangeText={(note) => this.props.dispatch({type: "UPDATE_USERDATA_NOTE", data: note})}
							value={userData.userNote}
							multiline={true}
							numberOfLines={4}
							editable={true}
							maxLength={40}
							style={[styles.field_input, styles.field_input_multiple]}
							placeholder="Note..."
							placeholderTextColor='#A3A3A3'
							autoCorrect={false}
							onSubmitEditing={() => {
								this.checkout();
							}}
						/>
					</View>
					<TouchableOpacity
						style={styles.button_register}
						onPress={() => this.checkout(listSelectedSeat)}>
						<Text style={styles.button_register_text}>Checkout</Text>
					</TouchableOpacity>
				</View>
			</DismissKeyboardView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		height: DEVICE_HEIGHT - 60,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		backgroundColor:"#d6d6d6"
	},
	formWrap: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	seatsWrap: {
		flex: 1,
		alignItems: "center"
	},
	seat: {
		width: 40,
		height: 40,
		marginTop: 5
	},
	defineWrap: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row"
	},
	defineSquare: {
		width: 30,
		height: 30,
		marginRight: 5
	},
	search_btn: {
		flexWrap: 'wrap',
		marginLeft: 20,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: "#fff",
		backgroundColor: "#3947ff",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10
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
	input_wrap: {
		width: DEVICE_WIDTH - 50,
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
	input_icon: {
		fontSize: 20,
		marginRight: 15,
	},
	field_input: {
		width: DEVICE_WIDTH - 150,
		fontSize: 18,
		height: 25,
	},
	field_input_multiple: {
		height: 80
	}
});

export default connect(
	state => {
		return {
			routeData: state.book.routeData,
			listSeatBooked: state.book.listSeatBooked,
			userData: state.login.userData,
			date: state.search.date,
			from: state.search.from,
			to: state.search.to
		}
	}
)(Booking);