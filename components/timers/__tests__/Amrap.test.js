import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

import Amrap from '../Amrap';

configure({ adapter: new Adapter() });

describe('<Amrap />', () => {
	it('renders the component', () => {
		const tree = shallow(<Amrap />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
