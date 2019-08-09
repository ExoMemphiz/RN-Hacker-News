import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
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
import Modal from 'react-native-modal';
import { IHackerNewsStory } from "../types/types";

interface IDispatchProps {
    loadStories: (loadType: "Single" | "All") => void;
    changeLoadType: () => void;
    changeSortOrder: () => void;
}

interface IStoryListProps extends IStoryState, IDispatchProps { }

interface IStoryListState {
    refreshing: boolean;
    modalInfo: undefined | IHackerNewsStory
}

class StoryList extends React.Component<IStoryListProps, IStoryListState> {
    constructor(props: IStoryListProps) {
        super(props);

        this.state = {
            refreshing: false,
            modalInfo: undefined
        };
    }

    handleRefresh = () => {
        this.props.loadStories(this.props.loadType);
    };

    renderModal = () => {
        if (this.state.modalInfo) {
            return (
                <View style={styles.modalContent}>
                    <Text style={{ color: "#FF6600" }}>{this.state.modalInfo.by}</Text>
                </View>
            )
        }
    }

    hideModal = () => {
        this.setState({
            modalInfo: undefined
        })
    }

    showModal = (modalInfo: IHackerNewsStory) => {
        console.log(`Showing Modal!`, modalInfo);
        this.setState({
            modalInfo
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Modal
                    isVisible={this.state.modalInfo !== undefined}
                    backdropColor="black"
                    backdropOpacity={0.8}
                    onBackdropPress={this.hideModal}
                    animationOut="fadeOut"
                    animationOutTiming={1000}
                >
                    <View style={{ flex: 1 }}>
                        {this.renderModal()}
                    </View>
                </Modal>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.loader}>
                        <FlatList
                            data={this.props.stories}
                            renderItem={story => {
                                // @ts-ignore
                                return <StoryItem {...story.item} onPress={(story) => this.showModal(story)} />;
                            }}
                            keyExtractor={story => `${story.id}`}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={this.handleRefresh}
                                />
                            }
                        />
                    </View>

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
        marginBottom: 20,
        marginTop: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

function mapStateToProps(state: IState): IStoryState {
    return state.stories;
}

function mapDispatchToProps(dispatch: Dispatch<IStoryAction>): IDispatchProps {
    return {
        loadStories: (loadType: "Single" | "All") =>
            getTopStories(loadType)(dispatch),
        changeLoadType: () => dispatch({ type: "ChangeType" }),
        changeSortOrder: () => dispatch({ type: "ChangeOrder" }),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StoryList);
