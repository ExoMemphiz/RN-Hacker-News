import React, { Fragment } from "react";
import { SafeAreaView, Text, StatusBar, View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Counter from "./src/components/Counter";
import reducer from "./src/Reducer";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
				<Counter />
			</SafeAreaView>
		</Provider>
	);
};

export default App;
