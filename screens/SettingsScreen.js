import React, { Component } from 'react';
import {
	Picker,
	Text,
	View,
	ScrollView,
	Platform,
	StyleSheet,
	Switch,
	Button,
	AsyncStorage
} from 'react-native';

class SettingsScreen extends Component {
	static navigationOptions = {
		title: 'Timer Settings'
	};

	constructor(props) {
		super(props);

		this.state = {
			timerType: 'AMRAP',
			timerDuration: 10,
			countdown: true,
			countdownDuration: 10
		};
	}

	renderEmomSelector() {
		if (this.state.timerType === 'EMOM') {
			return (
				<View>
					<Text>EMOM Style</Text>

					<Picker
						selectedValue={this.state.emomStyle}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({ emomStyle: itemValue })
						}
					>
						<Picker.Item label="Every minute" value={1} />
						<Picker.Item label="Every 2 minutes" value={2} />
						<Picker.Item label="Every 3 minutes" value={3} />
					</Picker>
				</View>
			);
		}
	}

	generatePickerItems() {
		return Array(99)
			.fill()
			.map((entry, index) => {
				return (
					<Picker.Item
						key={index + 1}
						label={index === 0 ? `1 minute` : `${index + 1} minutes`}
						value={index + 1}
					/>
				);
			});
	}

	renderCountdownDurationPicker() {
		if (this.state.countdown) {
			return (
				<View>
					<Text>Countdown Duration</Text>
					<Picker
						selectedValue={this.state.countdownDuration}
						onValueChange={(itemValue, itemIndex) => {
							this.setState({ countdownDuration: itemValue });
						}}
					>
						<Picker.Item label="1 second" value={1} />
						<Picker.Item label="2 seconds" value={2} />
						<Picker.Item label="3 seconds" value={3} />
						<Picker.Item label="4 seconds" value={4} />
						<Picker.Item label="5 seconds" value={5} />
						<Picker.Item label="6 seconds" value={6} />
						<Picker.Item label="7 seconds" value={7} />
						<Picker.Item label="8 seconds" value={8} />
						<Picker.Item label="9 seconds" value={9} />
						<Picker.Item label="10 seconds" value={10} />
					</Picker>
				</View>
			);
		}
	}

	setTimerAndNavigate() {
		// save data in async storage and then navigate to the home screen.
		let timerSettings = {
			timerType: this.state.timerType,
			timerDuration: this.state.timerDuration,
			countdown: this.state.countdown,
			countdownDuration: this.state.countdownDuration
		};

		if (timerSettings.timerType === 'EMOM') {
			timerSettings.emomStyle = this.state.emomStyle;
		}

		this.props.navigation.navigate('Home', {
			timerSettings
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View>
						<Text>Timer Type</Text>
						<Picker
							selectedValue={this.state.timerType}
							onValueChange={(itemValue, itemIndex) => {
								this.setState({ timerType: itemValue });
								if (itemValue === 'Tabata' || itemValue === 'ReverseTabata') {
									this.setState({ timerDuration: 4 });
								}
							}}
						>
							<Picker.Item label="EMOM" value="EMOM" />
							<Picker.Item label="AMRAP" value="AMRAP" />
							<Picker.Item label="Tabata" value="Tabata" />
							<Picker.Item label="Reverse Tabata" value="ReverseTabata" />
						</Picker>
					</View>
					{this.renderEmomSelector()}
					<View>
						<Text>Timer Duration</Text>
						<Picker
							selectedValue={this.state.timerDuration}
							onValueChange={(itemValue, itemIndex) => {
								this.setState({ timerDuration: itemValue });
							}}
						>
							{this.generatePickerItems()}
						</Picker>
					</View>
					<View>
						<Text>Countdown</Text>
						<Switch
							value={this.state.countdown}
							onValueChange={(value) => {
								this.setState({ countdown: value });
							}}
						/>
					</View>
					{this.renderCountdownDurationPicker()}
					<View style={{ marginTop: 16 }}>
						<Button
							title="Set Timer"
							onPress={() => this.setTimerAndNavigate()}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	contentContainer: {
		paddingTop: 30,
		paddingHorizontal: 12
	}
});

export default SettingsScreen;
