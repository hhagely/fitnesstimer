import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const leftPad = (width, n) => {
	if ((n + '').length > width) {
		return n;
	}
	const padding = new Array(width).join('0');
	return (padding + n).slice(-width);
};

class TimeElapsed extends Component {
	getUnits() {
		const { timeElapsed, isRunning, timerSettings } = this.props;

		const seconds =
			!isRunning && timeElapsed === 0
				? timerSettings.timerDuration * 60
				: timeElapsed / 1000;

		return {
			min: Math.floor(seconds / 60).toString(),
			sec: Math.floor(seconds % 60).toString(),
			msec: (seconds % 1).toFixed(1).substring(2)
		};
	}

	render() {
		const units = this.getUnits();
		return (
			<View>
				<Text style={{ fontSize: 108, textAlign: 'center' }}>
					{leftPad(2, units.min)}:{leftPad(2, units.sec)}
				</Text>
			</View>
		);
	}
}

TimeElapsed.propTypes = {
	timerSettings: PropTypes.shape({
		timerType: PropTypes.string,
		timerDuration: PropTypes.number,
		countdown: PropTypes.bool,
		countdownDuration: PropTypes.number,
		emomStyle: PropTypes.number
	})
};

export default TimeElapsed;
