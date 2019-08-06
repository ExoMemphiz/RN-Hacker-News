export interface ICounterAction {
	type: "Increase" | "Decrease" | "Reset";
	value?: number;
}

export const increaseAction = (): ICounterAction => {
	return {
		type: "Increase",
	};
};

export const decreaseAction = (): ICounterAction => {
	return {
		type: "Decrease",
	};
};
export const resetAction = (): ICounterAction => {
	return {
		type: "Reset",
	};
};
