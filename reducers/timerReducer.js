import { SAVE_TIMER_SETTINGS } from '../actions/types';

const INITIAL_STATE = {
	timerType: 'AMRAP',
	timerDuration: 10,
	countdown: true,
	countdownDuration: 10
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVE_TIMER_SETTINGS:
			return action.payload;
		default:
			return state;
	}
};
