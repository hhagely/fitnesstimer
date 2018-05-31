import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, Modal } from 'react-native';
import { Audio } from 'expo';
import PropTypes from 'prop-types';

import TimeElapsed from './TimeElapsed';
import AmrapTimer from './timers/Amrap';
import TabataTimer from './timers/Tabata';
import ReverseTabataTimer from './timers/ReverseTabata';
import EmomTimer from './timers/Emom';

class StopWatch extends Component {
	constructor(props) {
		super(props);

		// ['update', 'reset', 'toggle', 'cancelCountdown'].forEach((method) => {
		// 	this[method] = this[method].bind(this);
		// });
		this.cancelCountdown = this.cancelCountdown.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

		this.state = this.initialState = {
			isRunning: false,
			timeElapsed: 0,
			countdownTimeLeft: 0,
			startTime: 0,
			showModal: false
		};
	}

	/**
	 * TODO: put countdown methods in timer components and also make the stop/reset buttons part of the timer component
	 * TODO: this will allow for each timer component to define their own way of handling counting and display.
	 **/
	// toggle() {
	// 	this.setState(
	// 		{
	// 			isRunning: !this.state.isRunning
	// 		},
	// 		() => {
	// 			const { timerSettings } = this.props;
	// 			if (timerSettings.countdown && this.state.isRunning) {
	// 				this.setState({ showModal: true });
	// 				this.startCountdown();

	// 				this.countdownTimerTimeout = setTimeout(() => {
	// 					this.startTimer();
	// 					this.setState({ showModal: false });
	// 					clearInterval(this.countdownTimer);
	// 					// add 1 second to the countdown duration so the countdown actually goes to zero
	// 				}, timerSettings.countdownDuration * 1000 + 1000);
	// 			} else {
	// 				this.state.isRunning ? this.startTimer() : clearInterval(this.timer);
	// 			}
	// 		}
	// 	);
	// }

	// reset() {
	// 	clearInterval(this.timer);
	// 	this.setState(this.initialState);
	// }

	// startTimer() {
	// 	this.setState({ startTime: Date.now() });

	// 	const { timerSettings } = this.props;

	// 	this.timer = setInterval(this.update, 1000);
	// }

	// update() {
	// 	const newTime = Date.now();
	// 	const delta = newTime - this.state.startTime;

	// 	this.setState({
	// 		startTime: newTime,
	// 		timeElapsed: this.state.timeElapsed + delta
	// 	});
	// }

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
	// 						Audio.Sound.create(require('../assets/sounds/Ping.mp3'), {
	// 							shouldPlay: true
	// 						});
	// 					} else if (this.state.countdownTimeLeft === 0) {
	// 						console.log('playing popcorn');
	// 						Audio.Sound.create(require('../assets/sounds/Popcorn.mp3'), {
	// 							shouldPlay: true
	// 						});
	// 					}
	// 				}
	// 			),
	// 		1000
	// 	);
	// }

	renderIntervals() {
		const { timerType } = this.props.timerSettings;
		const isTabata = timerType === 'Tabata' || timerType === 'ReverseTabata';
		if (isTabata) {
			return (
				<View>
					<Text style={{ fontSize: 72, textAlign: 'center' }}>01</Text>
				</View>
			);
		}
	}

	// cancelCountdown() {
	// 	clearTimeout(this.countdownTimerTimeout);
	// 	clearInterval(this.countdownTimer);
	// 	this.setState({
	// 		countdownTimeLeft: this.props.timerSettings.countdownDuration,
	// 		isRunning: false,
	// 		showModal: false
	// 	});
	// }

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	// renderModal() {
	// 	if (this.state.countdownTimeLeft !== 0) {
	// 		return (
	// 			<View
	// 				style={[
	// 					styles.container,
	// 					{ alignItems: 'center' },
	// 					this.state.countdownTimeLeft <= 3 &&
	// 						this.state.countdownTimeLeft > 0 &&
	// 						styles.countdownBackgroundAlt
	// 				]}
	// 			>
	// 				<View>
	// 					<Text style={{ fontSize: 32 }}>Your workout will begin in:</Text>
	// 				</View>
	// 				<View>
	// 					<Text style={{ fontSize: 72 }}>{this.state.countdownTimeLeft}</Text>
	// 				</View>
	// 				<View style={styles.buttonContainer}>
	// 					<Button onPress={this.cancelCountdown} title="Cancel" />
	// 				</View>
	// 			</View>
	// 		);
	// 	} else {
	// 		return (
	// 			<View
	// 				style={[
	// 					styles.container,
	// 					{ alignItems: 'center' },
	// 					styles.countdownBackgroundGo
	// 				]}
	// 			>
	// 				<View>
	// 					<Text style={{ fontSize: 108 }}>GO!</Text>
	// 				</View>
	// 			</View>
	// 		);
	// 	}
	// }

	renderTimer() {
		const { timerSettings } = this.props;
		const { isRunning, timeElapsed } = this.state;

		switch (timerSettings.timerType) {
			case 'AMRAP':
				return (
					<AmrapTimer
						render={(timer) => (
							<TimeElapsed
								id="timer"
								timeElapsed={timeElapsed}
								isRunning={isRunning}
								timerSettings={timerSettings}
							/>
						)}
						timeElapsed={timeElapsed}
						isRunning={isRunning}
						timerSettings={timerSettings}
						toggleModal={this.toggleModal}
						// timerSettings={timerSettings}
						// timeElapsed={this.state.timeElapsed}
						// isRunning={this.state.isRunning}
						// update={this.updateAmrap}
						// startTimer={this.startTimer}
						// stopTimer={this.stopTimer}
						// resetTimer={this.reset}
					/>
				);
				break;
			case 'Emom':
				return (
					<EmomTimer
						render={(timer) => (
							<TimeElapsed
								timeElapsed={timeElapsed}
								isRunning={isRunning}
								timerSettings={timerSettings}
							/>
						)}
					/>
				);
				break;
			// case 'Tabata':
			// 	return <TabataTimer duration={timerSettings.timerDuration} />;
			// 	break;
			// case 'ReverseTabata':
			// 	return <ReverseTabataTimer duation={timerSettings.timerDuration} />;
			// 	break;
		}
	}

	render() {
		const { isRunning, timeElapsed } = this.state;

		return (
			<View style={styles.container}>
				{/* <Modal
					transparent={false}
					animationType="slide"
					visible={this.state.showModal}
					onRequestClose={this.cancelCountdown}
				>
					{this.renderModal()}
				</Modal> */}

				{this.renderTimer()}

				{/* {this.renderIntervals()} */}

				{/* <TimeElapsed
					id="timer"
					timeElapsed={timeElapsed}
					isRunning={isRunning}
					timerDuration={this.props.timerSettings.timerDuration}
				/> */}

				{/* <View
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
				</View> */}
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
	}
	// buttonContainer: {
	// 	width: 125
	// },
	// countdownBackgroundAlt: {
	// 	backgroundColor: 'red'
	// },
	// countdownBackgroundGo: {
	// 	backgroundColor: 'green'
	// }
});

StopWatch.propTypes = {
	timerSettings: PropTypes.shape({
		timerType: PropTypes.string,
		timerDuration: PropTypes.number,
		countdown: PropTypes.bool,
		countdownDuration: PropTypes.number,
		emomStyle: PropTypes.number
	})
};

export default StopWatch;
