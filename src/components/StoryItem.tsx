import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IHackerNewsStory } from "../types/types";
import { IStoryState } from "../reducers/StoryReducer";
import { connect } from "react-redux";
import { IState } from "../Reducer";
import Globals from "../Globals";

export interface IStoryItemProps extends IHackerNewsStory, IStoryState {
    onPress: (story: IHackerNewsStory) => void;
    index: number;
    theme: "Light" | "Dark";
}

class StoryItem extends React.Component<IStoryItemProps, {}> {

    getTimeSinceText = () => {
        const timeDiff = new Date(new Date().getTime() - (this.props.time * 1000)).getTime();
        const divisors = [{ type: "week", div: 7 }, { type: "day", div: 24 }, { type: "hour", div: 60 }, { type: "minute", div: 60 }];
        let divisor = 1000 * 60 * 60 * 24 * 7;
        for (let i = 0; i < divisors.length; i++) {
            let time = parseInt((timeDiff / divisor).toFixed(0));
            divisor /= divisors[i].div;
            if (time >= 1) {
                return `${time} ${divisors[i].type}${time > 1 ? "s" : ""} ago`;
            }
        }
        return `Recently added`;
    }

    render() {
        const containerStyle = [
            styles.container,
            { backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) },
            { borderTopColor: (this.props.theme === "Dark" ? "#333" : "#EEE") }
        ]
        return (
            <TouchableOpacity onPress={() => this.props.onPress({ ...this.props })} style={containerStyle}>
                <View style={styles.storyItem}>
                    <View style={styles.storyNumber}>
                        <Text style={[styles.storyNumberFont, { color: (this.props.theme === "Dark" ? Globals.DARK_THEME_TEXT : Globals.LIGHT_THEME_TEXT) }]}>{this.props.index + 1}</Text>
                    </View>
                    <View style={styles.storyBody}>
                        <View style={styles.storyTitleContainer}>
                            <Text
                                style={styles.storyTitle}
                                ellipsizeMode={`tail`}
                                numberOfLines={1}
                            >
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.storyInfoContainer}>
                            <Text numberOfLines={1} style={styles.storyInfo}>
                                {this.getTimeSinceText()}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderTopWidth: 10,
        paddingBottom: `3%`
    },
    storyItem: {
        flexDirection: `row`,
        flex: 1,
        marginRight: 20,
    },
    storyTitle: {
        color: `rgba(255, 102, 0, 1)`,
        fontWeight: `500`,
        fontSize: 14,
    },
    storyInfo: {
        fontSize: 11,
        color: `rgba(145, 145, 144, 1)`
    },
    storyBody: {
        flex: 7
    },
    storyNumber: {
        flex: 1,
        flexDirection: `column`,
        alignItems: `center`,
        paddingRight: 5,
        marginLeft: 5
    },
    storyNumberFont: {
        paddingTop: `20%`,
        fontSize: 18
    },
    storyTitleContainer: {
        flex: 2,
        marginTop: 10
    },
    storyInfoContainer: {
        flex: 1,
        flexDirection: `row`,
        alignItems: "flex-start",
    },
});

function mapStateToProps(state: IState) {
    return {
        theme: state.stories.theme
    }
}

export default connect(mapStateToProps)(StoryItem);
