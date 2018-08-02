import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo';
import PropTypes from 'prop-types';

import TimeElapsed from '../TimeElapsed';
import CountdownModal from '../CountdownModal';

/**
 * TODO: Make a 'Timer' component that all the different timers use.
 * TODO: This component should accept an update function that is unique to that timer type.
 * TODO: This method decides what to do at each update interval of the timer.
 */
class TabataTimer extends Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			timerSettings: this.props.timerSettings,
			intervalCount: 0,
			showModal: false,
			isRunning: false,
			timeElapsed: 0,
			intervalElapsed: 0,
			countdownTimeLeft: 0,
			work: false,
			rest: false,
			startTime: 0
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
				if (isRunning && timeElapsed === 0) {
					if (timerSettings.countdown) {
						this.toggleModal();
						this.startCountdown();

						this.countdownTimerTimeout = setTimeout(() => {
							this.startTimer();
							this.toggleModal();
							clearInterval(this.countdownTimer);
							// add 1 second to the countdown duration so the countdown actually goes to zero
						}, timerSettings.countdownDuration * 1000 + 1000);
					} else {
						this.startTimer();
					}
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
		this.setState({
			startTime: Date.now(),
			work: true,
			intervalCount: this.state.intervalCount + 1
		});

		this.timer = setInterval(this.update, 1000);
	}

	playPing() {
		Audio.Sound.create(require('../../assets/sounds/Ping.mp3'), {
			shouldPlay: true
		});
	}

	playPopcornSound() {
		Audio.Sound.create(require('../../assets/sounds/Popcorn.mp3'), {
			shouldPlay: true
		});
	}

	endTimer() {
		clearInterval(this.timer);
		this.toggle();
		this.setState(this.initialState);
		this.playPopcornSound();
		ToastAndroid.show('Your workout is  finished!', ToastAndroid.SHORT);
	}

	update() {
		const newTime = Date.now();
		const delta = newTime - this.state.startTime;

		let durationInMs = this.props.timerSettings.timerDuration * 60 * 1000; // 60k ms in 1 minute

		let tempElapsed = this.state.timeElapsed + delta;
		let tempIntervalElapsed = this.state.intervalElapsed + delta;
		let timeLeft = durationInMs - tempElapsed;

		if (this.state.work && tempIntervalElapsed % 20000 < 1000) {
			this.playPing();
			this.setState({
				startTime: newTime,
				work: false,
				rest: true,
				timeElapsed: tempElapsed,
				intervalElapsed: 0,
				timeLeft
			});
		} else if (this.state.rest && tempIntervalElapsed % 10000 < 1000) {
			this.playPing();
			this.setState({
				work: true,
				rest: false,
				timeElapsed: tempElapsed,
				intervalElapsed: 0,
				intervalCount: this.state.intervalCount + 1,
				timeLeft,
				startTime: newTime
			});
		} else {
			this.setState(
				{
					startTime: newTime,
					timeElapsed: tempElapsed,
					intervalElapsed: tempIntervalElapsed,
					timeLeft
				},
				() => {
					if (
						-1000 <= this.state.timeLeft &&
						this.state.timeLeft <= 0 &&
						this.state.intervalCount === 8 &&
						this.state.rest
					) {
						this.endTimer();
					}
				}
			);
		}
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
						} else if (this.state.countdownTimeLeft === 0) {
							this.playPopcornSound();
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
		const {
			timeElapsed,
			isRunning,
			showModal,
			countdownTimeLeft,
			intervalElapsed
		} = this.state;

		return (
			<View>
				<CountdownModal
					showModal={showModal}
					countdownTimeLeft={countdownTimeLeft}
					cancelCountdown={this.cancelCountdown}
				/>
				<TimeElapsed
					timeElapsed={intervalElapsed}
					isRunning={isRunning}
					timerSettings={timerSettings}
				/>
				<View style={styles.intervalCountContainer}>
					<Text style={{ fontSize: 32 }}>
						Interval: {this.state.intervalCount}
					</Text>
				</View>
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
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 125
	},
	intervalCountContainer: {
		padding: 20,
		alignItems: 'center'
	}
});

TabataTimer.propTypes = {
	timerSettings: PropTypes.shape({
		timerType: PropTypes.string,
		timerDuration: PropTypes.number,
		countdown: PropTypes.bool,
		countdownDuration: PropTypes.number,
		emomStyle: PropTypes.number
	})
};

export default TabataTimer;
