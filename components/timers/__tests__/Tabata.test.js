import { Button } from 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tabata from '../Tabata';
import CountdownModal from '../../CountdownModal';

configure({ adapter: new Adapter() });

let wrapper;

let tempProps = {
	startCountdown: jest.fn(),
	timerSettings: {
		timerType: 'Tabata',
		timerDuration: 10,
		countdown: true,
		countdownDuration: 10
	}
};

beforeEach(() => {
	wrapper = shallow(<Tabata {...tempProps} />);

	jest.useFakeTimers();
});

describe('<Tabata />', () => {
	it('renders the component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('calls startCountdown when start is pressed', () => {
		jest.spyOn(Tabata.prototype, 'startCountdown');

		wrapper = shallow(<Tabata {...tempProps} />);

		const startButton = wrapper.find(Button).at(0);

		startButton.simulate('press');

		wrapper.update();

		expect(wrapper.state('showModal')).toBe(true);
		expect(wrapper.state('isRunning')).toBe(true);

		jest.advanceTimersByTime(11000);

		expect(wrapper.state('showModal')).toBe(false);
		expect(Tabata.prototype.startCountdown.mock.calls.length).toBe(1);
	});

	it('calls the reset function when the button is pressed', () => {
		jest.spyOn(Tabata.prototype, 'reset');

		wrapper = shallow(<Tabata {...tempProps} />);

		const startButton = wrapper.find(Button).at(0);
		const resetButton = wrapper.find(Button).at(1);

		startButton.simulate('press');

		wrapper.update();

		jest.advanceTimersByTime(11000);

		startButton.simulate('press');
		wrapper.update();
		resetButton.simulate('press');

		expect(Tabata.prototype.reset.mock.calls.length).toBe(1);
	});

	it('calls endTimer when the timer is finished', () => {
		tempProps = {
			startCountdown: jest.fn(),
			timerSettings: {
				timerType: 'Tabata',
				timerDuration: 1,
				countdown: false,
				countdownDuration: 10
			}
		};

		jest.spyOn(Tabata.prototype, 'endTimer');

		wrapper = shallow(<Tabata {...tempProps} />);

		const startButton = wrapper.find(Button).at(0);
		startButton.simulate('press');

		expect(Tabata.prototype.endTimer.mock.calls.length).toBe(0);

		jest.advanceTimersByTime(61000);

		// expect(Emom.prototype.endTimer.mock.calls.length).toBe(1);
	});

	// it('cancels the countdown', () => {
	// 	jest.spyOn(Emom.prototype, 'cancelCountdown');

	// 	wrapper = shallow(<Emom {...tempProps} />);

	// 	const startButton = wrapper.find(Button).at(0);

	// 	startButton.simulate('press');

	// 	wrapper.update();

	// 	const modal = wrapper.find(CountdownModal).at(0);

	// 	console.log(JSON.stringify(modal));

	// 	const cancelCountdownButton = modal.children(Button).at(0);

	// 	console.log('cancel button: ', cancelCountdownButton.prop('title'));

	// 	jest.advanceTimersByTime(2000);

	// 	cancelCountdownButton.simulate('press');

	// 	expect(Emom.prototype.cancelCountdown.mock.calls.length).toBe(1);

	// });
});
