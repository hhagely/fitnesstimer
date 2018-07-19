import { SAVE_TIMER_SETTINGS } from './types';

export const saveTimerSettings = (timerSettings) => {
	return { type: SAVE_TIMER_SETTINGS, payload: timerSettings };
};
