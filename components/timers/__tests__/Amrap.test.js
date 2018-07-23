import { Button } from 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Amrap from '../Amrap';

configure({ adapter: new Adapter() });

let wrapper;

const tempProps = {
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
});

describe('<Amrap />', () => {
	it('renders the component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('calls startCountdown when start is pressed', () => {
		const startButton = wrapper.find(Button).at(0);

		startButton.simulate('press');

		expect(tempProps.instance().startCountdown).toHaveBeenCalled();

		// expect(tempProps.startCountdown).toHaveBeenCalled();
	});
});
