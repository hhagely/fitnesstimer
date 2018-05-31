import React, { Component } from 'react';
import { View } from 'react-native';

import TimeElapsed from '../TimeElapsed';

class EmomTimer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// TODO: put countdown methods in timer components and also make the stop/reset buttons part of the timer component

	render() {
		return <View>{this.props.render(this.state)}</View>;
	}
}

export default EmomTimer;
