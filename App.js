import React, { Component } from 'react';
import createStore from "./Store";
import { Provider } from "react-redux";
import { createStackNavigator , createDrawerNavigator,DrawerItems, createSwitchNavigator} from 'react-navigation';

import LoginScreen from "./Screens/Login";
import CreateAccountScreen from "./Screens/CreateAccount";
import Home from "./Screens/Home";
import Booking from "./Screens/Booking";
import SideBar from './Screens/sidebar';

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

const DrawerStack = createDrawerNavigator({
	Home: { screen: Home },
}, {
	contentComponent: props => <SideBar  {...props} />
});

const MAIN = createStackNavigator({
	Home: { screen: DrawerStack, navigationOptions: { title: 'Home',  header: null } },
	Booking: Booking,
});

const Auth = createStackNavigator({
	Login : LoginScreen,
	CreateAccount : CreateAccountScreen
});

const RootStack = createSwitchNavigator({
	Auth : Auth,
	App : MAIN
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
export default App;
