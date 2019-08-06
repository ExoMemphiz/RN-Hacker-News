import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { IState } from "../Reducer";
import {
	ICounterAction,
	increaseAction,
	decreaseAction,
	resetAction,
} from "../actions/CounterActions";

interface ICounterProps {
	value?: number;
	increase?: () => void;
	decrease?: () => void;
	reset?: () => void;
}

interface IDispatchProps {
	increase: () => void;
	decrease: () => void;
	reset: () => void;
}

class Counter extends React.Component<ICounterProps, {}> {
	handleIncrease = () => {
		if (this.props.increase) {
			this.props.increase();
		}
	};

	handleDecrease = () => {
		if (this.props.decrease) {
			this.props.decrease();
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Counter: {this.props.value}</Text>
				<TouchableOpacity
					style={[styles.button, { flex: 1 }]}
					onPress={this.handleIncrease}
				>
					<Text>Increase</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { flex: 1 }]}
					onPress={this.handleDecrease}
				>
					<Text>Decrease</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		backgroundColor: "green",
	},
	button: {
		marginTop: 5,
	},
});

function mapStateToProps(state: IState): ICounterProps {
	return {
		value: state.counter.counter,
	};
}

function mapDispatchToProps(
	dispatch: Dispatch<ICounterAction>,
): IDispatchProps {
	return {
		increase: () => {
			dispatch(increaseAction());
		},
		decrease: () => {
			dispatch(decreaseAction());
		},
		reset: () => {
			dispatch(resetAction());
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Counter);
