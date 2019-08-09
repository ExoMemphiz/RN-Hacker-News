import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IHackerNewsStory } from "../types/types";
import { IStoryState } from "../reducers/StoryReducer";

interface IStoryItemProps extends IHackerNewsStory, IStoryState {
    onPress: (story: IHackerNewsStory) => void;
}

export default class StoryItem extends React.Component<IStoryItemProps, {}> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress({ ...this.props })} style={styles.container}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEE",
        paddingTop: 10,
        paddingBottom: 10,
    },
    textContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
});
