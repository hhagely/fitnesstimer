import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo';
import PropTypes from 'prop-types';

import TimeElapsed from '../TimeElapsed';
import CountdownModal from '../CountdownModal';

class EmomTimer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			isRunning: false,
			timeElapsed: 0
		};

		this.initialState = {
			timerSettings: this.props.timerSettings,
			showModal: false,
			isRunning: false,
			timeElapsed: 0
		};

		['update', 'reset', 'toggle', 'cancelCountdown'].forEach((method) => {
			this[method] = this[method].bind(this);
		});
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	toggle() {
		this.setState(
			{
				isRunning: !this.state.isRunning
			},
			() => {
				const { timerSettings } = this.props;
				const { isRunning, timeElapsed } = this.state;
				if (timerSettings.countdown && isRunning && timeElapsed === 0) {
					this.toggleModal();
					this.startCountdown();

					this.countdownTimerTimeout = setTimeout(() => {
						this.startTimer();
						this.toggleModal();
						clearInterval(this.countdownTimer);
						// add 1 second to the countdown duration so the countdown actually goes to zero
					}, timerSettings.countdownDuration * 1000 + 1000);
				} else {
					isRunning && timeElapsed > 0
						? this.startTimer()
						: clearInterval(this.timer);
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

		this.timer = setInterval(this.update, 1000);
	}

	update() {
		const newTime = Date.now();
		const delta = newTime - this.state.startTime;

		console.log(`delta: ${delta}`);

		this.setState({
			startTime: newTime,
			timeElapsed: this.state.timeElapsed + delta
		});
	}

	startCountdown() {
		const { countdownDuration } = this.props.timerSettings;

		this.setState({ countdownTimeLeft: countdownDuration });

		this.countdownTimer = setInterval(
			() =>
				this.setState(
					{ countdownTimeLeft: this.state.countdownTimeLeft - 1 },
					() => {
						if (
							this.state.countdownTimeLeft <= 3 &&
							this.state.countdownTimeLeft > 0
						) {
							Audio.Sound.create(require('../../assets/sounds/Ping.mp3'), {
								shouldPlay: true
							});
						} else if (this.state.countdownTimeLeft === 0) {
							Audio.Sound.create(require('../../assets/sounds/Popcorn.mp3'), {
								shouldPlay: true
							});
						}
					}
				),
			1000
		);
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

	// TODO: put countdown methods in timer components and also make the stop/reset buttons part of the timer component

	render() {
		const { timerSettings } = this.props;
		const { timeElapsed, isRunning, showModal, countdownTimeLeft } = this.state;

		return (
			<View>
				<CountdownModal
					showModal={showModal}
					countdownTimeLeft={countdownTimeLeft}
					cancelCountdown={this.cancelCountdown}
				/>
				<TimeElapsed
					timeElapsed={timeElapsed}
					isRunning={isRunning}
					timerSettings={timerSettings}
				/>
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
				<Text>Emom Timer</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 125
	}
});

export default EmomTimer;
