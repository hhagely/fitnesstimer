import 'react-native';
import React from 'react';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<App />', () => {
	it('renders the loading screen', async () => {
		const tree = shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	it('renders the root without loading screen', async () => {
		const tree = shallow(<App skipLoadingScreen />);
		expect(toJson(tree)).toMatchSnapshot();
	});
});
