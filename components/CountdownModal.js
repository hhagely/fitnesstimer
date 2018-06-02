import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo';

class CountdownModal extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState = {
			countdownTimeLeft: 0
		};
	}

	renderModal() {
		if (this.props.countdownTimeLeft !== 0) {
			return (
				<View
					style={[
						styles.container,
						{ alignItems: 'center' },
						this.props.countdownTimeLeft <= 3 &&
							this.props.countdownTimeLeft > 0 &&
							styles.countdownBackgroundAlt
					]}
				>
					<View>
						<Text style={{ fontSize: 32 }}>Your workout will begin in:</Text>
					</View>
					<View>
						<Text style={{ fontSize: 72 }}>{this.props.countdownTimeLeft}</Text>
					</View>
					<View style={styles.buttonContainer}>
						<Button onPress={this.props.cancelCountdown} title="Cancel" />
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

	render() {
		return (
			<View>
				<Modal
					transparent={false}
					animationType="slide"
					visible={this.props.showModal}
					onRequestClose={this.props.cancelCountdown}
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
