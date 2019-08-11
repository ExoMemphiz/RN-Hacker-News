import React from "react";
import { SafeAreaView } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/Reducer";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Settings from "./src/screens/Settings";
import Home from "./src/screens/Home";
import StoryPage from "./src/screens/StoryPage";
import { IHackerNewsStory } from "./src/types/types";
import { NavigationScreenProps } from "react-navigation";
import Header from "./src/components/Header";

const store = createStore(reducer);

let RootStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }: NavigationScreenProps<void>) => {
            return ({
                title: `Home`,
                header: (
                    <Header navigation={navigation} />
                ),
            });
        }
    },

    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }: NavigationScreenProps<void>) => ({
            title: "Settings",
            header: (
                <Header navigation={navigation} />
            ),
        })
    },

    StoryPage: {
        screen: StoryPage,
        navigationOptions: ({ navigation }: NavigationScreenProps<IHackerNewsStory>) => ({
            title: "StoryPage",
            header: (
                <Header navigation={navigation} />
            ),
        })
    }
});

let Navigation = createAppContainer(RootStack);

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <Navigation />
            </SafeAreaView>
        </Provider>
    );
};

export default App;
