import React, { Fragment } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../helpers/Icon";
import Globals from "../Globals";
import StoryStore from "../stores/StoryStore";
import { observer } from "mobx-react";

interface IPageTitleProps {
    title: string;
    icon?: string;
    onPress?: () => void;
}

@observer
class PageTitle extends React.Component<IPageTitleProps, {}> {

    constructor(props: IPageTitleProps) {
        super(props);
    }

    handleIconPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    render() {
        return (
            <Fragment>
                <View style={[styles.pageTitleContainer, { backgroundColor: StoryStore.theme === "Light" ? Globals.LIGHT_THEME : Globals.DARK_THEME }]}>
                    <View style={styles.rowContainer}>
                        <View style={styles.colContainer}>
                            <View style={styles.innerContainer}>
                                <Text style={[styles.newsText, { color: StoryStore.theme === "Dark" ? Globals.DARK_THEME_TEXT : "#777" }]}>{this.props.title}</Text>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.refreshTouchable}
                                >
                                    {this.props.icon && <TouchableOpacity onPress={this.handleIconPress}>
                                        <Icon iconIdentifier={this.props.icon} style={styles.refreshIcon} />
                                    </TouchableOpacity>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Fragment>
        );
    }

}

const styles = StyleSheet.create({
    newsText: {
        textDecorationLine: `underline`,
        marginLeft: 20,
        marginRight: 10,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 25,
        marginTop: 10
    },
    refreshIcon: {
        fontSize: 20,
        marginTop: 10
    },
    refreshTouchable: {
        marginTop: 10
    },
    innerContainer: {
        flexDirection: `row`,
        justifyContent: `flex-end`
    },
    colContainer: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `column`
    },
    rowContainer: {
        flex: 1,
        alignItems: `center`,
        flexDirection: `row`
    },
    pageTitleContainer: {
        flex: 1
    }
});

export default PageTitle;
