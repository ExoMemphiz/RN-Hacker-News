import React from "react";
import { SafeAreaView } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/Reducer";
import StoryList from "./src/components/StoryList";

const store = createStore(reducer);

const App = () => {
	return (
		<Provider store={store}>
			<SafeAreaView style={{ flex: 1 }}>
				<StoryList />
			</SafeAreaView>
		</Provider>
	);
};

export default App;
