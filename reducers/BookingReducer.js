const initialState = {
	routeData: {
		"ID": "7CcWma8h65EMNs1aXMiB",
		"busData": {
			"image": "https://znews-photo-td.zadn.vn/w660/Uploaded/wyhktpu/2015_07_17/noithat3.jpg",
			"name": "Hoa Mai",
			"type": 9,
		},
		"busID": "YzZEXp4eobs2eUPq01aH",
		"date": 1536762600000,
		"depart": "Office in district 1",
		"destination": "Office in Vung Tau",
		"expected_time": 135,
		"from": "Sai Gon",
		"price": 160000,
		"ticket": [
			{
				"note": "",
				"phone_number": "0901234567",
				"seat": 4,
				"user_name": "Pious",
			},
			{
				"note": "",
				"phone_number": "0901234567",
				"seat": 3,
				"user_name": "Pious",
			},
		],
		"to": "Vung Tau",
	},
	listSeatBooked: [1, 0, 0, 0, 0, 0, 1, 1, 1]

};
export const BookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_ROUTE_DATA" :
			return {
				...state,
				routeData: action.data,
			};
		case "SET_SEAT_STATUS" :
			return {
				...state,
				listSeatBooked: action.data,
			};
		case "UPDATE_SEAT_STATUS" :
			return {
				...state,
				listSeatBooked: state.listSeatBooked.map((seat, index) => index === action.index && seat !== 1 ? seat === 0 ? 2 : 0 : seat),
			};
		case "UPDATE_SEAT_STATUS_AFTER_BOOKING" :
			return {
				...state,
				listSeatBooked: state.listSeatBooked.map((seat) => seat === 2 ? 1 : seat ),
			};
		default:
			return state;
	}
};