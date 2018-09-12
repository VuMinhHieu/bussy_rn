const initialState = {
	places: [],
	date: "12-09-2018",
	from: '',
	to: '',
	routes: [],
	// places: [
	// 	{
	// 		"data": {
	// 			"name": "Sai Gon",
	// 		},
	// 		"id": "C29Di8Id9SIg0I2L60Hy",
	// 	},
	// 	{
	// 		"data": {
	// 			"name": "Nha Trang",
	// 		},
	// 		"id": "GshnPMEpwku31i4iQame",
	// 	},
	// 	{
	// 		"data": {
	// 			"name": "Da Nang",
	// 		},
	// 		"id": "epEDiacG6Qrfe7c2c0QC",
	// 	},
	// 	{
	// 		"data": {
	// 			"name": "Vung Tau",
	// 		},
	// 		"id": "r9FporMdV8zHSfwH4WdP",
	// 	},
	// 	{
	// 		"data": {
	// 			"name": "Da Lat",
	// 		},
	// 		"id": "w1D4Y58mYtM4FPL43D92",
	// 	},
	// ],
// routes: [
	// {
	// 	"busData": {
	// 		"image": "https://adamviettravel.vn/wp-content/uploads/2018/04/Ford-Transit-Limousine.jpg",
	// 		"name": "Huy Hoang Limousine",
	// 		"type": 9,
	// 	}, "busID": "YzZEXp4eobs2eUPq01aH",
	// 	"date": 1536712300000,
	// 	"depart": "Office in district 1",
	// 	"destination": "Office in Vung Tau",
	// 	"expected_time": 130,
	// 	"from": "Sai Gon",
	// 	"price": 150000,
	// 	"ticket": [
	// 		{
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 1,
	// 			"user_name": "Pious",
	// 		}, {
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 7,
	// 			"user_name": "Pious",
	// 		}, {
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 8,
	// 			"user_name": "Pious",
	// 		}, {
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 9,
	// 			"user_name": "Pious",
	// 		}], "to": "Vung Tau",
	// }, {
	// 	"busData": {
	// 		"image": "https://www.xedulich360.com/wp-content/uploads/thue-xe-limousine-dcar-hanoi.jpg",
	// 		"name": "Phat Loc An",
	// 		"type": 9,
	// 	},
	// 	"busID": "YzZEXp4eobs2eUPq01aH",
	// 	"date": 1536713800000,
	// 	"depart": "Office in district 1",
	// 	"destination": "Office in Vung Tau",
	// 	"expected_time": 135,
	// 	"from": "Sai Gon",
	// 	"price": 150000,
	// 	"ticket": [
	// 		{
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 4,
	// 			"user_name": "Pious",
	// 		}, {
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 3,
	// 			"user_name": "Pious",
	// 		}
	// 		],
	// 	"to": "Vung Tau",
	// }, {
	// 	"busData": {
	// 		"image": "https://www.xedulich360.com/wp-content/uploads/thue-xe-limousine-dcar-hanoi.jpg",
	// 		"name": "Thanh Vinh",
	// 		"type": 9,
	// 	},
	// 	"busID": "YzZEXp4eobs2eUPq01aH",
	// 	"date": 1536725900000,
	// 	"depart": "Office in district 1",
	// 	"destination": "Office in Vung Tau",
	// 	"expected_time": 120,
	// 	"from": "Sai Gon",
	// 	"price": 150000,
	// 	"ticket": [
	// 		{
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 4,
	// 			"user_name": "Pious",
	// 		}, {
	// 			"note": "",
	// 			"phone_number": "0901234567",
	// 			"seat": 3,
	// 			"user_name": "Pious",
	// 		}
	// 		],
	// 	"to": "Vung Tau",
	// },
	// ],
	// date: "12-09-2018",
	// from: 'Sai Gon',
	// to: 'Vung Tau',
};
export const SearchReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_PLACES" :
			return {
				...state,
				places: action.data,
			};
		case "GET_ROUTES" :
			return {
				...state,
				routes: action.data,
			};
		case "SET_FROM" :
			return {
				...state,
				from: action.data,
			};
		case "SET_TO" :
			return {
				...state,
				to: action.data,
			};
		case "SET_DATE" :
			return {
				...state,
				date: action.data,
			};
		default:
			return state;
	}
};