import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import TimeElapsed from '../TimeElapsed';

configure({ adapter: new Adapter() });

describe('<TimeElapsed />', () => {
	it('renders the component', () => {
		const tree = shallow(<TimeElapsed />);

		expect(toJson(tree)).toMatchSnapshot();
	});
});
