import 'react-native';
import React from 'react';
import { MonoText } from '../StyledText';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
	const tree = shallow(<MonoText>Snapshot test!</MonoText>);

	expect(toJson(tree)).toMatchSnapshot();
});
