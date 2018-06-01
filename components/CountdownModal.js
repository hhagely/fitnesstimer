import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo';

class CountdownModal extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {
			countdownTimeLeft: 0
		};
	}

	startCountdown() {
		const { countdownDuration } = this.props.timerSettings;

		this.setState({ countdownTimeLeft: countdownDuration });

		this.countdownTimer = setInterval(
			() =>
				this.setState(
					{ countdownTimeLeft: this.state.countdownTimeLeft - 1 },
					() => {
						console.log(`countdowntime left: ${this.state.countdownTimeLeft}`);
						if (
							this.state.countdownTimeLeft <= 3 &&
							this.state.countdownTimeLeft > 0
						) {
							console.log('playing ping');
							Audio.Sound.create(require('../assets/sounds/Ping.mp3'), {
								shouldPlay: true
							});
						} else if (this.state.countdownTimeLeft === 0) {
							console.log('playing popcorn');
							Audio.Sound.create(require('../assets/sounds/Popcorn.mp3'), {
								shouldPlay: true
							});
						}
					}
				),
			1000
		);
	}

	renderModal() {
		if (this.state.countdownTimeLeft !== 0) {
			return (
				<View
					style={[
						styles.container,
						{ alignItems: 'center' },
						this.state.countdownTimeLeft <= 3 &&
							this.state.countdownTimeLeft > 0 &&
							styles.countdownBackgroundAlt
					]}
				>
					<View>
						<Text style={{ fontSize: 32 }}>Your workout will begin in:</Text>
					</View>
					<View>
						<Text style={{ fontSize: 72 }}>{this.state.countdownTimeLeft}</Text>
					</View>
					<View style={styles.buttonContainer}>
						<Button onPress={this.cancelCountdown} title="Cancel" />
					</View>
				</View>
			);
		} else {
			return (
				<View
					style={[
						styles.container,
						{ alignItems: 'center' },
						styles.countdownBackgroundGo
					]}
				>
					<View>
						<Text style={{ fontSize: 108 }}>GO!</Text>
					</View>
				</View>
			);
		}
	}

	cancelCountdown() {
		clearTimeout(this.countdownTimerTimeout);
		clearInterval(this.countdownTimer);
		this.setState({
			countdownTimeLeft: this.props.timerSettings.countdownDuration,
			isRunning: false,
			showModal: false
		});
	}

	render() {
		return (
			<View>
				<Modal
					transparent={false}
					animationType="slide"
					visible={this.state.showModal}
					onRequestClose={this.cancelCountdown}
				>
					{this.renderModal()}
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		justifyContent: 'space-around'
	},
	contentContainer: {
		paddingTop: 30,
		paddingHorizontal: 12
	},
	buttonContainer: {
		width: 125
	},
	countdownBackgroundAlt: {
		backgroundColor: 'red'
	},
	countdownBackgroundGo: {
		backgroundColor: 'green'
	}
});

export default CountdownModal;
