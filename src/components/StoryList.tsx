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
        console.log(`Handling Refresh Pull, loadtype: ${this.props.loadType}`)
        this.props.loadStories(this.props.loadType);
    };

    handleNavigate(story: IHackerNewsStory) {
        if (this.props.navigation) {
            console.log(`Navigation to StoryPage`);
            this.props.navigation.navigate("StoryPage", { story });
        } else {
            console.log(`Error, didn't get navigation props...`);
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
                <View style={[styles.loader]}>
                    {this.makeFlatList()}
                </View>
            </View>
        );
    }
}

/*


                <ScrollView contentContainerStyle={styles.container}>
                    

                    <View style={{ flex: 1, marginTop: 20 }}>

                        <TouchableOpacity
                            onPress={() => this.props.loadStories(this.props.loadType)}
                        >
                            <Text>Load API</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <TouchableOpacity onPress={this.props.changeLoadType}>
                            <Text>{this.props.loadType}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>

                        <TouchableOpacity onPress={this.props.changeSortOrder}>
                            <Text>{this.props.sortOrder}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loader: {
        flex: 5,
        marginTop: 20,
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
