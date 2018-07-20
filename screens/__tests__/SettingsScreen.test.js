import { Button, Picker, Switch } from 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
// import configureStore from 'redux-mock-store';

import { SettingsScreen } from '../SettingsScreen';
// import reducers from '../../reducers';

// const middlewares = [];
// const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

const initialState = {
	timerType: 'AMRAP',
	timerDuration: 10,
	countdown: true,
	countdownDuration: 10
};

const tempProps = {
	saveTimerSettings: jest.fn(),
	navigation: {
		navigate: jest.fn()
	}
};

let wrapper;

beforeEach(() => {
	wrapper = shallow(<SettingsScreen {...tempProps} />);

	// wrapper = shallow(<SettingsScreen {...tempProps} />, {
	// 	context: { store: mockStore(initialState) }
	// });
});

describe('<SettingsScreen />', () => {
	it('Renders the SettingsScreen component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('calls componentDidMount', () => {
		jest.spyOn(SettingsScreen.prototype, 'componentDidMount');

		wrapper = shallow(<SettingsScreen {...tempProps} />);
		expect(SettingsScreen.prototype.componentDidMount.mock.calls.length).toBe(
			1
		);
	});

	it('Successfully changes the timerType', () => {
		const picker = wrapper.find(Picker).at(0);

		picker.simulate('valueChange', { itemValue: 'AMRAP' });

		expect(picker.props().selectedValue).toBe('AMRAP');
	});

	it('renders 4 pickers when timer type is EMOM', () => {
		const toggle = wrapper.find(Switch).at(0);

		toggle.simulate('valueChange', true);

		wrapper.update();

		const picker = wrapper.find(Picker).at(0);

		picker.simulate('valueChange', 'EMOM');

		wrapper.update();

		expect(wrapper.find(Picker).length).toBe(4);
	});

	it('calls Switch onvalueChange', () => {
		const toggle = wrapper.find(Switch).at(0);

		toggle.simulate('valueChange', true);

		expect(wrapper.state('countdown')).toBe(true);
	});

	it('Successfully changes the countdownDuration', () => {
		const toggle = wrapper.find(Switch).at(0);

		toggle.simulate('valueChange', true);

		wrapper.update();

		const picker = wrapper.find(Picker).at(2);

		picker.simulate('valueChange', 10);

		expect(wrapper.state('timerDuration')).toBe(10);
	});

	it('successfully changes the emom style picker', () => {
		const timerType = wrapper.find(Picker).at(0);

		timerType.simulate('valueChange', 'EMOM');

		wrapper.update();

		const emomStyle = wrapper.find(Picker).at(1);

		emomStyle.simulate('valueChange', 2);

		expect(wrapper.state('emomStyle')).toBe(2);
	});

	it('contains a button to be clicked', () => {
		const button = wrapper.find(Button).at(0);

		expect(button.exists()).toEqual(true);
	});

	it('calls setTimerAndNavigate when button is clicked', () => {
		const button = wrapper.find(Button).at(0);
		button.simulate('press');

		expect(tempProps.saveTimerSettings).toHaveBeenCalled();
	});
});
