import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HomeScreen } from '../HomeScreen';
import Amrap from '../../components/timers/Amrap';
// import Emom from '../../components/timers/Emom';

configure({ adapter: new Adapter() });

describe('<HomeScreen />', () => {
	it('Renders the Homescreen component', () => {
		const tree = shallow(<HomeScreen />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('displays an amrap timer', () => {
		const tempProps = {
			timer: {
				timerType: 'AMRAP',
				timerDuration: 10,
				countdown: true,
				countdownDuration: 10
			}
		};

		const wrapper = shallow(<HomeScreen {...tempProps} />);

		expect(wrapper.state('timerType')).toEqual('AMRAP');
		expect(wrapper.find(Amrap)).toHaveLength(1);
	});

	// it('displays an emom timer', () => {
	// 	const tempProps = {
	// 		timer: {
	// 			timerType: 'Emom',
	// 			timerDuration: 10,
	// 			countdown: true,
	// 			countdownDuration: 10
	// 		}
	// 	};

	// 	const wrapper = shallow(<HomeScreen {...tempProps} />);

	// 	expect(wrapper.find(<Amrap />).toHaveLength(1);
	// });
});
