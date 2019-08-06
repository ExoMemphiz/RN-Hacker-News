import { combineReducers } from "redux";
import counterReducer, { ICounterState } from "./reducers/CounterReducer";

export interface IState {
	counter: ICounterState;
}

export const reducer = combineReducers<IState>({
	counter: counterReducer,
});

export default reducer;
