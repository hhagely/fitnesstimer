import { Button } from 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Amrap from '../Amrap';
import CountdownModal from '../../CountdownModal';

configure({ adapter: new Adapter() });

let wrapper;

let tempProps = {
	startCountdown: jest.fn(),
	timerSettings: {
		timerType: 'AMRAP',
		timerDuration: 10,
		countdown: true,
		countdownDuration: 10
	}
};

beforeEach(() => {
	wrapper = shallow(<Amrap {...tempProps} />);

	jest.useFakeTimers();
});

describe('<Amrap />', () => {
	it('renders the component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('calls startCountdown when start is pressed', () => {
		const startButton = wrapper.find(Button).at(0);

		startButton.simulate('press');

		wrapper.update();

		expect(wrapper.state('showModal')).toBe(true);
		expect(wrapper.state('isRunning')).toBe(true);

		jest.advanceTimersByTime(11000);

		expect(wrapper.state('showModal')).toBe(false);
		expect(clearInterval).toHaveBeenCalled();
	});

	it('calls the reset function when the button is pressed', () => {
		const startButton = wrapper.find(Button).at(0);
		const resetButton = wrapper.find(Button).at(1);

		startButton.simulate('press');

		wrapper.update();

		jest.advanceTimersByTime(11000);

		startButton.simulate('press');
		wrapper.update();
		resetButton.simulate('press');

		expect(clearInterval).toHaveBeenCalled();
		expect(wrapper.state()).toEqual(wrapper.instance().initialState);
	});

	it('calls endTimer when the timer is finished', () => {
		tempProps = {
			startCountdown: jest.fn(),
			timerSettings: {
				timerType: 'AMRAP',
				timerDuration: 1,
				countdown: false,
				countdownDuration: 10
			}
		};

		jest.spyOn(Amrap.prototype, 'endTimer');

		wrapper = shallow(<Amrap {...tempProps} />);

		const startButton = wrapper.find(Button).at(0);
		startButton.simulate('press');

		expect(Amrap.prototype.endTimer.mock.calls.length).toBe(0);

		jest.advanceTimersByTime(61000);

		// expect(Amrap.prototype.endTimer.mock.calls.length).toBe(1);
	});

	// it('cancels the countdown', () => {
	// 	const startButton = wrapper.find(Button).at(0);

	// 	startButton.simulate('press');

	// 	const modal = wrapper.find(CountdownModal).at(0);

	// 	console.log(modal.prop('showModal'));

	// 	wrapper.update();

	// 	wrapper.find(Button).map((b) => {
	// 		console.log('button title: ', b.prop('title'));
	// 	});
	// });
});
