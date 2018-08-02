import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import HomeScreen from '../HomeScreen';
import Amrap from '../../components/timers/Amrap';
import Emom from '../../components/timers/Emom';
import Tabata from '../../components/timers/Tabata';
import ReverseTabata from '../../components/timers/ReverseTabata';

configure({ adapter: new Adapter() });

describe('<HomeScreen />', () => {
	it('Renders the Homescreen component', () => {
		let tempProps = {
			navigation: {
				getParam: jest.fn()
			},
			timerSettings: {
				timerType: 'AMRAP',
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const tree = shallow(<HomeScreen {...tempProps} />);

		expect(toJson(tree)).toMatchSnapshot();
	});

	it('displays an amrap timer', () => {
		let tempProps = {
			navigation: {
				getParam: jest.fn()
			},
			timerSettings: {
				timerType: 'AMRAP',
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const wrapper = shallow(<HomeScreen {...tempProps} />);

		expect(wrapper.find(Amrap).at(0)).toHaveLength(1);
	});

	it('displays an emom timer', () => {
		let tempProps = {
			navigation: {
				getParam: jest.fn()
			},
			timerSettings: {
				timerType: 'EMOM',
				emomStyle: 1,
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const wrapper = shallow(<HomeScreen {...tempProps} />);

		expect(wrapper.find(Emom).at(0)).toHaveLength(1);
	});

	it('displays a tabata timer', () => {
		let tempProps = {
			navigation: {
				getParam: jest.fn()
			},
			timerSettings: {
				timerType: 'Tabata',
				emomStyle: 1,
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const wrapper = shallow(<HomeScreen {...tempProps} />);

		expect(wrapper.find(Tabata).at(0)).toHaveLength(1);
	});

	it('displays a reverse tabata timer', () => {
		let tempProps = {
			navigation: {
				getParam: jest.fn()
			},
			timerSettings: {
				timerType: 'ReverseTabata',
				emomStyle: 1,
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const wrapper = shallow(<HomeScreen {...tempProps} />);

		expect(wrapper.find(ReverseTabata).at(0)).toHaveLength(1);
	});
});
