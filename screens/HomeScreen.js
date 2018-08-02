import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebBrowser } from 'expo';
import AmrapTimer from '../components/timers/Amrap';
import EmomTimer from '../components/timers/Emom';
import TabataTimer from '../components/timers/Tabata';
import ReverseTabataTimer from '../components/timers/ReverseTabata';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			isRunning: false,
			timeElapsed: 0,
			countdownTimeLeft: 0,
			startTime: 0,
			timerSettings: {
				timerType: 'AMRAP',
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};
	}

	static navigationOptions = {
		header: null
	};

	renderTimer() {
		let timerSettings = this.props.navigation.getParam(
			'timerSettings',
			this.initialState.timerSettings
		);

		if (!timerSettings) {
			timerSettings = this.props.timerSettings
				? this.props.timerSettings
				: this.initialState.timerSettings;
		}

		// TODO: should not be passing identical props into 2 separate components like below. Separate it out.
		switch (timerSettings.timerType) {
			case 'AMRAP':
				return <AmrapTimer timerSettings={timerSettings} />;
			case 'EMOM':
				return <EmomTimer timerSettings={timerSettings} />;
			case 'Tabata':
				return <TabataTimer timerSettings={timerSettings} />;
			case 'ReverseTabata':
				return <ReverseTabataTimer timerSettings={timerSettings} />;
			default:
				return <View />;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.timerContainer}>{this.renderTimer()}</View>
				</ScrollView>
			</View>
		);
	}

	// _maybeRenderDevelopmentModeWarning() {
	// 	if (__DEV__) {
	// 		const learnMoreButton = (
	// 			<Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
	// 				Learn more
	// 			</Text>
	// 		);

	// 		return (
	// 			<Text style={styles.developmentModeText}>
	// 				Development mode is enabled, your app will be slower but you can use
	// 				useful development tools. {learnMoreButton}
	// 			</Text>
	// 		);
	// 	} else {
	// 		return (
	// 			<Text style={styles.developmentModeText}>
	// 				You are not in development mode, your app will run at full speed.
	// 			</Text>
	// 		);
	// 	}
	// }

	// _handleLearnMorePress = () => {
	// 	WebBrowser.openBrowserAsync(
	// 		'https://docs.expo.io/versions/latest/guides/development-mode'
	// 	);
	// };

	// _handleHelpPress = () => {
	// 	WebBrowser.openBrowserAsync(
	// 		'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
	// 	);
	// };
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	timerContainer: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between'
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center'
	},
	contentContainer: {
		flex: 1,
		paddingTop: 30
	}
});
