import {
	StyleSheet,
	Dimensions,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
		alignItems: 'center',
		justifyContent: 'center',
		top: 0
	},
});