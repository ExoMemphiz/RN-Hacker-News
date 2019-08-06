import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { IState } from "../Reducer";
import { IStoryState } from "../reducers/StoryReducer";
import { IStoryAction } from "../actions/StoryActions";
import { getTopStories } from "../api/api";

interface IDispatchProps {
    loadStories: (loadType: "Single" | "All") => void;
    changeLoadType: () => void;
    changeSortOrder: () => void;
}

interface IStoryListProps extends IStoryState, IDispatchProps { }

class StoryList extends React.Component<IStoryListProps, {}> {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 5 }}>
                    {this.props.error ? <Text>{this.props.error}</Text>
                        :
                        this.props.loading ? <Text>Loading...</Text>
                            :
                            this.props.stories.length > 0 ?
                                this.props.stories.map((story, index) => {
                                    return (
                                        <View key={story.id} style={{ flex: 1 }}>
                                            <Text>{index} Story ID: {story.id}, {story.title}, score: {story.score}</Text>
                                        </View>
                                    )
                                })
                                :
                                <Text>Empty...</Text>
                    }
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => this.props.loadStories(this.props.loadType)}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

function mapStateToProps(state: IState): IStoryState {
    return state.stories;
}

function mapDispatchToProps(dispatch: Dispatch<IStoryAction>): IDispatchProps {
    return {
        loadStories: (loadType: "Single" | "All") => getTopStories(loadType)(dispatch),
        changeLoadType: () => dispatch({ type: "ChangeType" }),
        changeSortOrder: () => dispatch({ type: "ChangeOrder" })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StoryList);
