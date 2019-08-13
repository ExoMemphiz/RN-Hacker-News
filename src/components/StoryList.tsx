import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
} from "react-native";
import React from "react";
import { getTopStories } from "../api/api";
import StoryItem from "./StoryItem";
import { IHackerNewsStory } from "../types/types";
import { NavigationScreenProp } from "react-navigation";
import Globals from "../Globals";
import StoryStore from "../stores/StoryStore";
import { observer } from "mobx-react";

interface IStoryListProps {
    navigation?: NavigationScreenProp<any, any>;
}

@observer
class StoryList extends React.Component<IStoryListProps, {}> {
    constructor(props: IStoryListProps) {
        super(props);
    }

    handleRefresh = () => {
        getTopStories(StoryStore.loadType);
    };

    handleNavigate(story: IHackerNewsStory) {
        if (this.props.navigation) {
            this.props.navigation.navigate("StoryPage", { story });
        }
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

        // Could potentially be handled in the mobx Store, too.
        const stories = StoryStore.stories.slice().sort((a, b) => {
            // Ascending = a - b, descending = b - a
            if (StoryStore.sortOrder === "Asc") {
                return a.score - b.score;
            }
            return b.score - a.score;
        });

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={[styles.loader, { backgroundColor: (StoryStore.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) }]}>
                    <FlatList style={{ flex: 1, minWidth: `100%` }}
                        data={stories}
                        renderItem={(story) => {
                            return <StoryItem key={story.item.id} index={this.getObjectIndex(stories, story.item)}
                                {...story.item} {...this.props} onPress={(story: IHackerNewsStory) => this.handleNavigate(story)} />;
                        }}
                        keyExtractor={story => `${story.id}`}
                        refreshControl={
                            <RefreshControl
                                refreshing={StoryStore.loading}
                                onRefresh={this.handleRefresh}
                            />
                        }
                    />
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

export default StoryList;
