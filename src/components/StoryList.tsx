import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IState } from "../Reducer";
import { IStoryState } from "../reducers/StoryReducer";
import { IStoryAction } from "../actions/StoryActions";
import { getTopStories } from "../api/api";
import StoryItem from "./StoryItem";
import { IHackerNewsStory } from "../types/types";
import { NavigationScreenProp } from "react-navigation";
import Globals from "../Globals";

interface IDispatchProps {
    loadStories: (loadType: "Single" | "All") => void;
}

interface IStoryListProps extends IStoryState, IDispatchProps {
    navigation?: NavigationScreenProp<any, any>;
}

class StoryList extends React.Component<IStoryListProps, {}> {
    constructor(props: IStoryListProps) {
        super(props);
    }

    handleRefresh = () => {
        this.props.loadStories(this.props.loadType);
    };

    handleNavigate(story: IHackerNewsStory) {
        if (this.props.navigation) {
            this.props.navigation.navigate("StoryPage", { story });
        }
    }

    makeFlatList = () => {
        return (
            <FlatList style={{ flex: 1, minWidth: `100%` }}
                data={this.props.stories}
                renderItem={(story) => {
                    return <StoryItem key={story.item.id} index={this.getObjectIndex(this.props.stories, story.item)}
                        {...story.item} {...this.props} onPress={(story) => this.handleNavigate(story)} />;
                }}
                keyExtractor={story => `${story.id}`}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading}
                        onRefresh={this.handleRefresh}
                    />
                }
            />
        )
    }

    getObjectIndex(stories: IHackerNewsStory[], story: IHackerNewsStory) {
        for (let i = 0; i < stories.length; i++) {
            if (stories[i].id === story.id) {
                return i;
            }
        }
        throw Error(`Story with id ${story.id} does not exist in story list.`);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={[styles.loader, { backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) }]}>
                    {this.makeFlatList()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        flex: 5,
    }
});

function mapStateToProps(state: IState): IStoryState {
    return state.stories;
}

function mapDispatchToProps(dispatch: Dispatch<IStoryAction>): IDispatchProps {
    return {
        loadStories: (loadType: "Single" | "All") =>
            getTopStories(loadType)(dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StoryList);
