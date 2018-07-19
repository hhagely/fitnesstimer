import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HomeScreen } from '../HomeScreen';

configure({ adapter: new Adapter() });

describe('<HomeScreen />', () => {
	it('Renders the Homescreen component', () => {
		const tree = shallow(<HomeScreen />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
