import React from 'react';
import { Left, Right, Body, Title, Form, Picker, Input, Item, Header, Button, Icon } from 'native-base';

export default class AppHeader extends React.Component {
	render() {
		return (
				<Header rounded>
					<Left>
						<Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body>
						<Title>HOME</Title>
					</Body>
					<Right>
						<Button transparent onPress={()=>this.props._onSearchClick()}>
							<Icon name='ios-search' />
						</Button>
					</Right>
				</Header>
		);
	}
}
