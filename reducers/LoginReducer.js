const initialState = {
	loginStatus: false,
	userData: {
		userName: "Pious",
		userEmail: null,
		userPhone: "01664061024",
		userNote: "",
	}
};
export const LoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_LOGIN_STATUS":{
			return {
				...state,
				loginStatus: action.data,
			};
		}
		case "UPDATE_USERDATA_NAME" :
			return {
				...state,
				userData:{
					...state.userData,
					userName: action.data,
				}
			};
		case "UPDATE_USERDATA_EMAIL" :
			return {
				...state,
				userData:{
					...state.userData,
					userEmail: action.data,
				}
			};
		case "UPDATE_USERDATA_PHONE" :
			return {
				...state,
				userData:{
					...state.userData,
					userPhone: action.data,
				}
			};
		case "UPDATE_USERDATA_NOTE" :
			return {
				...state,
				userData:{
					...state.userData,
					userNote: action.data,
				}
			};
		default:
			return state;
	}
};