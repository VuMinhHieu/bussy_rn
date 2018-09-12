import { combineReducers } from 'redux';
import { LoginReducer as login } from "./LoginReducer";
import { SearchReducer as search } from "./SearchReducer";
import { BookingReducer as book } from "./BookingReducer";

export default
combineReducers({
  login,
  search,
	book,
});