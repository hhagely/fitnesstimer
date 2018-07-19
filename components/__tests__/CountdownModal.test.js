import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import CountdownModal from '../CountdownModal';
import Amrap from '../timers/Amrap';

configure({ adapter: new Adapter() });

describe('<CountdownModal />', () => {
	it('CountdownModal accepts cancelCountdown prop', () => {
		const amrap = shallow(<Amrap />);

		const props = {
			cancelCountdown: jest.fn(),
			countdownTimeLeft: 10,
			showModal: false
		};

		const countdown = shallow(<CountdownModal {...props} />);

		expect(countdown.instance().props.showModal).toBe(false);
		expect(countdown.instance().props.countdownTimeLeft).toBe(10);
	});
});
