import React, { Fragment } from "react";
import PageTitle from "../components/PageTitle";
import { Text, View, StyleSheet, Switch } from "react-native";
import { IStoryState } from "../reducers/StoryReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStoryAction } from "../actions/StoryActions";
import { getTopStories } from "../api/api";
import { NavigationScreenProp } from "react-navigation";
import Globals from "../Globals";
import { IState } from "../Reducer";

interface IDispatchProps {
    loadStories: (loadType: "Single" | "All") => void;
    changeLoadType: () => void;
    changeSortOrder: () => void;
    changeTheme: () => void;
}

interface ISettingsProps extends IStoryState, IDispatchProps {
    navigation?: NavigationScreenProp<any, any>;
}

interface ISettingsState {
    sortOrder: "Asc" | "Desc";
    loadType: "Single" | "All";
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {

    constructor(props: ISettingsProps) {
        super(props);
    }

    handleAscendingChange = (value: boolean) => {
        this.props.loadStories(this.props.loadType);
    }

    render() {
        console.log(this.props.sortOrder);
        return (
            <Fragment>
                <View style={[styles.settingsContainer, { backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) }]}>
                    <PageTitle title={`Page Settings`} />
                    <View style={styles.settingsBody}>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={styles.settingsOption}>Sort by: Ascending</Text>
                                <Switch onValueChange={this.props.changeSortOrder} value={this.props.sortOrder === "Asc"} />
                            </View>
                        </View>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={styles.settingsOption}>Load Type: Single</Text>
                                <Switch onValueChange={this.props.changeLoadType} value={this.props.loadType === "Single"} />
                            </View>
                        </View>
                        <View style={styles.settingsItem}>
                            <View style={styles.settingsCenter}>
                                <Text style={styles.settingsOption}>Dark Theme</Text>
                                <Switch onValueChange={this.props.changeTheme} value={this.props.theme === "Dark"} />
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
        marginRight: 15
    },
    settingsCenter: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`
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

function mapStateToProps(state: IState) {
    return {
        sortOrder: state.stories.sortOrder,
        loadType: state.stories.loadType,
        theme: state.stories.theme
    };
}

function mapDispatchToProps(dispatch: Dispatch<IStoryAction>): IDispatchProps {
    return {
        loadStories: (loadType: "Single" | "All") =>
            getTopStories(loadType)(dispatch),
        changeLoadType: () => dispatch({ type: "ChangeType" }),
        changeSortOrder: () => dispatch({ type: "ChangeOrder" }),
        changeTheme: () => dispatch({ type: "ChangeTheme" })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

export { styles };
