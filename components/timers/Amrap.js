import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo';

import TimeElapsed from '../TimeElapsed';
import CountdownModal from '../CountdownModal';

class AmrapTimer extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		['update', 'reset', 'toggle'].forEach((method) => {
			this[method] = this[method].bind(this);
		});
	}

	toggle() {
		console.log(`toggle was clicked`);
		this.setState(
			{
				isRunning: !this.state.isRunning
			},
			() => {
				const { timerSettings } = this.props;
				if (timerSettings.countdown && this.state.isRunning) {
					// this.setState({ showModal: true });
					this.props.toggleModal();
					this.startCountdown();

					this.countdownTimerTimeout = setTimeout(() => {
						this.startTimer();
						// this.setState({ showModal: false });
						this.props.toggleModal();
						clearInterval(this.countdownTimer);
						// add 1 second to the countdown duration so the countdown actually goes to zero
					}, timerSettings.countdownDuration * 1000 + 1000);
				} else {
					this.state.isRunning ? this.startTimer() : clearInterval(this.timer);
				}
			}
		);
	}

	reset() {
		clearInterval(this.timer);
		this.setState(this.initialState);
	}

	startTimer() {
		this.setState({ startTime: Date.now() });

		const { timerSettings } = this.props;

		this.timer = setInterval(this.update, 1000);
	}

	update() {
		const newTime = Date.now();
		const delta = newTime - this.state.startTime;

		this.setState({
			startTime: newTime,
			timeElapsed: this.state.timeElapsed + delta
		});
	}

	// startCountdown() {
	// 	const { countdownDuration } = this.props.timerSettings;

	// 	this.setState({ countdownTimeLeft: countdownDuration });

	// 	this.countdownTimer = setInterval(
	// 		() =>
	// 			this.setState(
	// 				{ countdownTimeLeft: this.state.countdownTimeLeft - 1 },
	// 				() => {
	// 					console.log(`countdowntime left: ${this.state.countdownTimeLeft}`);
	// 					if (
	// 						this.state.countdownTimeLeft <= 3 &&
	// 						this.state.countdownTimeLeft > 0
	// 					) {
	// 						console.log('playing ping');
	// 						Audio.Sound.create(require('../../assets/sounds/Ping.mp3'), {
	// 							shouldPlay: true
	// 						});
	// 					} else if (this.state.countdownTimeLeft === 0) {
	// 						console.log('playing popcorn');
	// 						Audio.Sound.create(require('../../assets/sounds/Popcorn.mp3'), {
	// 							shouldPlay: true
	// 						});
	// 					}
	// 				}
	// 			),
	// 		1000
	// 	);
	// }

	render() {
		const { timeElapsed, isRunning, timerSettings } = this.props;
		return (
			<View>
				<CountdownModal
					timerSettings={timerSettings}
					// startTimerCallback={}
				/>
				<TimeElapsed
					id="timer"
					timeElapsed={timeElapsed}
					isRunning={isRunning}
					timerSettings={timerSettings}
				/>
				{/* {this.props.render(this.state)} */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<View style={styles.buttonContainer}>
						<Button
							onPress={this.toggle}
							title={isRunning ? 'Stop' : 'Start'}
						/>
					</View>

					<View style={styles.buttonContainer}>
						<Button
							onPress={this.reset}
							disabled={!isRunning && !timeElapsed}
							title="Reset"
						/>
					</View>
				</View>
			</View>
			// <View>
			// 	<TimeElapsed
			// 		id="timer"
			// 		timeElapsed={timeElapsed}
			// 		isRunning={isRunning}
			// 		timerDuration={timerSettings.timerDuration}
			// 	/>
			// </View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 125
	}
});

export default AmrapTimer;
