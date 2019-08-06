import { ICounterAction } from "../actions/CounterActions";

export interface ICounterState {
	counter: number;
}

const initialState: ICounterState = {
	counter: 0,
};

const counterReducer = (
	state: ICounterState = initialState,
	action: ICounterAction,
): ICounterState => {
	switch (action.type) {
		case "Increase":
			return {
				...state,
				counter: state.counter + 1,
			};
		case "Decrease":
			return {
				...state,
				counter: state.counter - 1,
			};
		case "Reset":
			return {
				...state,
				counter: 0,
			};
		default:
			return state;
	}
};

export default counterReducer;
