import React, { Fragment } from "react";
import PageTitle from "../components/PageTitle";
import { Text, View, StyleSheet, Switch, StyleProp, TextStyle } from "react-native";
import { getTopStories } from "../api/api";
import { NavigationScreenProp } from "react-navigation";
import Globals from "../Globals";
import StoryStore from "../stores/StoryStore";
import { observer } from "mobx-react";

interface ISettingsProps {
    navigation?: NavigationScreenProp<any, any>;
}

@observer
export default class Settings extends React.Component<ISettingsProps, {}> {

    constructor(props: ISettingsProps) {
        super(props);
    }

    handleAscendingChange = (value: boolean) => {
        getTopStories(StoryStore.loadType);
    }

    render() {
        const textStyle: StyleProp<TextStyle> = [
            styles.settingsOption,
            { color: StoryStore.theme === "Dark" ? Globals.DARK_THEME_TEXT : Globals.LIGHT_THEME_TEXT }
        ]
        return (
            <Fragment>
                <View style={[styles.settingsContainer, { backgroundColor: (StoryStore.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) }]}>
                    <PageTitle title={`Settings`} />
                    <View style={styles.settingsBody}>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={textStyle}>Sort score by: Ascending</Text>
                                <Switch onValueChange={() => StoryStore.changeSortOrder()} value={StoryStore.sortOrder === "Asc"} />
                            </View>
                        </View>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={textStyle}>Load Type: Single</Text>
                                <Switch onValueChange={() => StoryStore.changeLoadType()} value={StoryStore.loadType === "Single"} />
                            </View>
                        </View>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={textStyle}>Dark Theme</Text>
                                <Switch onValueChange={() => StoryStore.changeTheme()} value={StoryStore.theme === "Dark"} />
                            </View>
                        </View>
                    </View>
                </View>
            </Fragment>
        );
    }

}

const styles = StyleSheet.create({
    settingsOption: {
        fontSize: 15,
    },
    settingsCenter: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        paddingLeft: `10%`,
        marginRight: `10%`
    },
    settingsItem: {
        flex: 1,
        flexDirection: `row`,
        maxHeight: `10%`,
        minHeight: `10%`,
        marginTop: 10,
        alignItems: `center`,
        justifyContent: `flex-start`
    },
    settingsBody: {
        flex: 8
    },
    settingsContainer: {
        flex: 1
    }
});
