import React, { Fragment } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../helpers/Icon";
import { connect } from "react-redux";
import Globals from "../Globals";
import { IState } from "../Reducer";

interface IPageTitleProps {
    title: string;
    icon?: string;
    onPress?: () => void;
    theme: "Light" | "Dark";
}

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
                <View style={[styles.pageTitleContainer, { backgroundColor: this.props.theme === "Light" ? Globals.LIGHT_THEME : Globals.DARK_THEME }]}>
                    <View style={styles.sec97d582}>
                        <View style={styles.s43f0ccbf}>
                            <View style={styles.s148aa41c}>
                                <Text style={styles.newsText}>{this.props.title}</Text>
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
    s148aa41c: {
        flexDirection: `row`,
        justifyContent: `flex-end`
    },
    s43f0ccbf: {
        alignItems: `center`,
        flex: 1,
        flexDirection: `column`
    },
    sec97d582: {
        flex: 1,
        alignItems: `center`,
        flexDirection: `row`
    },
    pageTitleContainer: {
        flex: 1
    }
});

function mapStateToProps(state: IState) {
    return {
        theme: state.stories.theme
    };
}

export default connect(mapStateToProps)(PageTitle);

export { styles };
