import React from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/Reducer";
import { createStackNavigator, createAppContainer, NavigationRouteConfigMap, NavigationRouteConfig } from "react-navigation";
import Icon from "./src/helpers/Icon";
import Settings from "./src/screens/Settings";
import Home from "./src/screens/Home";
import StoryPage from "./src/screens/StoryPage";
import { IHackerNewsStory } from "./src/types/types";
import { NavigationScreenProps } from "react-navigation";
import Globals from "./src/Globals";

const store = createStore(reducer);

let RootStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }: NavigationScreenProps<void>) => {
            return ({
                title: `Home`,
                headerTintColor: `rgba(255, 102, 0, 1)`,
                headerTransparent: false,
                headerRight: (
                    <TouchableOpacity
                        disabled={false}
                        // @ts-ignore
                        onPress={() => { console.log(`Navigating`, this.props); navigation.navigate("Settings") }}
                        style={[styles.settingsTouchable]}
                    >
                        <Icon
                            style={styles.settingsIcon}
                            iconIdentifier={`Ionicons/md-settings`}
                        />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    textAlign: `center`,
                    fontSize: 50,
                }
            });
        }
    },

    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }: NavigationScreenProps<void>) => ({
            title: "Settings",
            headerTintColor: `rgba(255, 102, 0, 1)`,
            headerStyle: {
                textAlign: `center`
            }
        })
    },

    StoryPage: {
        screen: StoryPage,
        navigationOptions: ({ navigation }: NavigationScreenProps<IHackerNewsStory>) => ({
            title: "StoryPage",
            headerTintColor: `rgba(255, 102, 0, 1)`,
            headerStyle: {
                textAlign: `center`
            }
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

const styles = StyleSheet.create({
    settingsIcon: {
        fontSize: 30,
        color: `rgba(255, 102, 0, 1)`
    },
    settingsTouchable: {
        flex: 1,
        marginRight: 25,
        alignItems: `center`
    },
})

export default App;
