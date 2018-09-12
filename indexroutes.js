import db from "./Firebase";

var routes = db.collection('routes');

routes.doc().set({
		busData: {
			image: "https://adamviettravel.vn/wp-content/uploads/2018/04/Ford-Transit-Limousine.jpg",
			name: "White Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,10,30,0,0).getTime(),
		expected_time: 120,
		ticket:[
			{phone_number: "0901234567", seat: 1, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 7, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 8, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 9, user_name: "Pious", note: ""},
		],
		price: 150000
	}
);
routes.doc().set({
		busData: {
			image: "https://static.vexere.com/blog/uploads/2018/06/xelimousine.jpg",
			name: "White Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,13,30,0,0).getTime(),
		expected_time: 120,
		ticket:[
			{phone_number: "0901234567", seat: 1, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 2, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 3, user_name: "Pious", note: ""},
		],
		price: 140000
	}
);
routes.doc().set({
		busData: {
			image: "http://dongatrans.com/wp-content/uploads/2016/05/cho-thue-xe-dcar-limouisine-2.jpg",
			name: "White Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,19,30,0,0).getTime(),
		expected_time: 150,
		ticket:[
			{phone_number: "0901234567", seat: 4, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 3, user_name: "Pious", note: ""},
		],
		price: 150000
	}
);
routes.doc().set({
		busData: {
			image: "https://www.xedulich360.com/wp-content/uploads/thue-xe-limousine-dcar-hanoi.jpg",
			name: "Black Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,10,30,0,0).getTime(),
		expected_time: 120,
		ticket:[
			{phone_number: "0901234567", seat: 4, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 3, user_name: "Pious", note: ""},
		],
		price: 150000
	}
);
routes.doc().set({
		busData: {
			image: "http://xekhachquangninh.com/files/assets/anhxe/bentrongxelimousinehanoiquangninh1.jpg",
			name: "Black Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,16,0,0,0).getTime(),
		expected_time: 120,
		ticket:[
			{phone_number: "0901234567", seat: 4, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 3, user_name: "Pious", note: ""},
		],
		price: 150000
	}
);
routes.doc().set({
		busData: {
			image: "https://znews-photo-td.zadn.vn/w660/Uploaded/wyhktpu/2015_07_17/noithat3.jpg",
			name: "Black Bus",
			type: 9
		},
		busID: "YzZEXp4eobs2eUPq01aH",
		from: "Sai Gon",
		depart: "Office in district 1",
		to: "Vung Tau",
		destination: "Office in Vung Tau",
		date: new Date(2018,8,12,21,30,0,0).getTime(),
		expected_time: 135,
		ticket:[
			{phone_number: "0901234567", seat: 4, user_name: "Pious", note: ""},
			{phone_number: "0901234567", seat: 3, user_name: "Pious", note: ""},
		],
		price: 160000
	}
);