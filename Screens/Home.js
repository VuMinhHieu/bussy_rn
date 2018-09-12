import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Dimensions, FlatList, ActivityIndicator, Image} from 'react-native';
import {Picker, Icon, ListItem, Button} from 'native-base';
import {connect} from "react-redux";
import DatePicker from "react-native-datepicker";
import db from "../Firebase";
import IconFA from '@expo/vector-icons/FontAwesome';
import IconMC from '@expo/vector-icons/MaterialCommunityIcons';
import {number_format, getTimeText} from "../functions";

import AppHeader from "./header";
import LottieView from 'lottie-react-native';
import gstyles from '../components/styles';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_search: true,
			loading: false,
			from_error: false,
			to_error: false,
		};
		this.handlePickDate = this.handlePickDate.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.searchBus = this.searchBus.bind(this);
		this._onSearchClick = this._onSearchClick.bind(this);
	}

	componentDidMount() {
		if (this.props.places.length <= 0) {
			this.setState({
				loading: true
			});
			db.collection("places")
				.get()
				.then((querySnapshot) => {
					let places = [];
					querySnapshot.forEach((doc) => {
						if (doc.exists) {
							places.push({id: doc.id, data: doc.data()})
						}
					});
					this.props.dispatch({type: "GET_PLACES", data: places});
					this.setState({
						loading: false
					});
				});
		}
	}

	async searchBus() {
		let from_error = false;
		let	to_error = false;
		this.setState({
			loading: true,
			from_error, to_error
		});
		if (this.props.from.length <= 0) {
			from_error = true
		}
		if (this.props.to.length <= 0) {
			to_error = true
		}
		if ( from_error || to_error ) {
			this.setState({
				loading: false,
				from_error, to_error
			});
		} else {
			const datePicker = this.props.date.split("-");
			let startDate = new Date(datePicker[2], parseInt(datePicker[1]) - 1, datePicker[0], 0, 0, 0, 0).getTime();
			const now = new Date().getTime();
			if (startDate < now) startDate = now;
			const endDate = new Date(datePicker[2], parseInt(datePicker[1]) - 1, datePicker[0], 23, 59, 59, 0).getTime();

			const routes = await db.collection("routes")
				.where("date", ">=", startDate)
				.where("date", "<=", endDate)
				.where("from", "==", this.props.from)
				.where("to", "==", this.props.to)
				.get().catch(function (error) {
					console.log("Error getting document:", error);
				});
			let busesData = [];
			routes.forEach(route => {
				busesData.push({ID: route.id, ...route.data()})
			});

			busesData = busesData.sort((a, b) => a.date - b.date);

			this.props.dispatch({type: "GET_ROUTES", data: busesData});
			setTimeout(() => {
				this.setState({
					loading: false,
					show_search: false
				})
			}, 1000);
		}
	}

	handleSelect(value, type) {
		if (type === "from") {
			this.props.dispatch({type: "SET_FROM", data: value});
		} else {
			this.props.dispatch({type: "SET_TO", data: value});
		}
	}

	handlePickDate(date) {
		this.props.dispatch({type: "SET_DATE", data: date});
	}

	_onSearchClick() {
		this.setState({
			show_search: !this.state.show_search
		})
	}

	render() {
		return (
			<View>
				<AppHeader
					navigation={this.props.navigation}
					_onSearchClick={this._onSearchClick}
				/>
				{this.state.loading ?
					<View style={[gstyles.container, {zIndex: 2}]}>
						<LottieView
							source={require('../images/trail_loading')}
							autoPlay
							loop/>
					</View>
					: null}
				{this.state.show_search ?
					<View style={styles.select_wrap}>
						{this.props.places ?
							<View>
								<Picker
									mode="dropdown"
									iosHeader="Select From"
									iosIcon={<Icon name="ios-arrow-down-outline"/>}
									style={[styles.select_input, this.state.from_error ? {borderColor:"#ff0e29"} : null ]}
									selectedValue={this.props.from}
									onValueChange={(itemValue) => this.handleSelect(itemValue, "from")}
								>
									<Picker.Item label="Select depart place..." value=""/>
									{this.props.places.map(place =>
										<Picker.Item label={place.data.name} value={place.data.name}/>)}
								</Picker>

								<Picker
									mode="dropdown"
									iosHeader="Select To"
									iosIcon={<Icon name="ios-arrow-down-outline"/>}
									style={[styles.select_input, this.state.to_error ? {borderColor:"#ff0e29"} : null ]}
									selectedValue={this.props.to}
									onValueChange={(itemValue) => this.handleSelect(itemValue, "to")}
								>
									<Picker.Item label="Select destination..." value=""/>
									{this.props.places.map(place =>
										<Picker.Item label={place.data.name} value={place.data.name}/>)}
								</Picker>
							</View>
							: null}

						<View style={{
							flexWrap: 'wrap',
							alignItems: 'flex-start',
							flexDirection: 'row'
						}}>
							<DatePicker
								style={{width: 200}}
								date={this.props.date}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36,
									}
								}}
								onDateChange={this.handlePickDate}
							/>
							<TouchableOpacity style={styles.search_btn} onPress={this.searchBus}>
								<IconFA style={{color: "#fff", fontSize: 18, marginRight: 20}} name="bus"/>
								<Text style={{color: "#fff", fontSize: 16, fontWeight: "600"}}>Search</Text>
							</TouchableOpacity>
						</View>
					</View>
					: ''
				}
				<View style={styles.listItem}>
					{this.props.routes.length > 0 ?
						<FlatList
							data={this.props.routes}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({item}) => {
								const expected_hour = parseInt(item.expected_time / 60);
								const expected_minutes = item.expected_time - expected_hour * 60;
								let expected_text = expected_hour + "h";
								if (expected_minutes > 0) expected_text += expected_minutes + "'";
								const seat_booked = (item.ticket && item.ticket.length) || 0;
								return (
									<ListItem>
										<View style={{flex: 3, justifyContent: "center", alignItems: "center"}}>
											<Image style={{width: 100, height: 60}} source={{uri: item.busData.image}}/>
											<Text style={{fontWeight: "600", marginTop: 10}}>{item.busData.name}</Text>
										</View>
										<View style={{flex: 4, justifyContent: "center", alignItems: "center"}}>
											<Text>{getTimeText(item.date)} -> {getTimeText(item.date + item.expected_time * 60)}</Text>
											<Text>( Expected: {expected_text} )</Text>
											<Text style={{marginTop: 10}}>{item.busData.type - seat_booked} seat available</Text>
											<Text>
												<IconMC name='star' style={styles.icon_star}/>
												<IconMC name='star' style={styles.icon_star}/>
												<IconMC name='star' style={styles.icon_star}/>
												<IconMC name='star-half' style={styles.icon_star}/>
												<IconMC name='star-outline' style={styles.icon_star}/>
											</Text>
										</View>
										<View style={{flex: 2, alignItems: "flex-end"}}>
											<View style={{flexWrap: 'wrap', flexDirection: "row"}}>
												<Text style={{fontWeight: '600'}}>{number_format(item.price)}</Text>
												<Text style={{fontSize: 11}}>đ</Text>
											</View>
											<Button onPress={() => {
												this.props.dispatch({type: "SET_ROUTE_DATA", data: item});
												const tikets = item.ticket;
												const listBooked = tikets.map(ticket => ticket.seat);
												const listSeatBooked = [];
												for (let i = 1; i < 10; i++) {
													if (listBooked.indexOf(i) > -1) {
														listSeatBooked.push(1);
													} else listSeatBooked.push(0);
												}
												this.props.dispatch({type: "SET_SEAT_STATUS", data: listSeatBooked});
												this.props.navigation.navigate("Booking", {name: item.busData.name})
											}} style={{marginTop: 10, borderRadius: 5}} full iconLeft>
												<IconFA style={{color: "#fff62a"}} name='bus'/>
												<Text style={{marginLeft: 5, color: "#fff", fontWeight: "500"}}>BOOK</Text>
											</Button>
										</View>
									</ListItem>
								);
							}}
						/>
						:
						!this.state.loading ?
							<LottieView
								style={{marginTop: 40, width: DEVICE_WIDTH}}
								source={require('../images/moving_bus/ex-splash')}
								autoPlay
								loop/>
							:
							null
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listItem: {
		paddingBottom: 130,
	},
	select_wrap: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: "#FFF",
	},
	select_input: {
		width: '100%',
		borderWidth: 1,
		borderColor: "#000",
		padding: 5,
		marginBottom: 10
	},
	search_btn: {
		flexWrap: 'wrap',
		marginLeft: 20,
		width: DEVICE_WIDTH - 250,
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
	icon_star: {
		fontSize: 18,
		color: "#e3e239"
	},
});

function mapStateToProps(state) {
	return {
		places: state.search.places,
		routes: state.search.routes,
		date: state.search.date,
		from: state.search.from,
		to: state.search.to,
	}
}

export default connect(mapStateToProps)(Home);