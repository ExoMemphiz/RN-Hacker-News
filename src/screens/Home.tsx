import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import PageTitle from "../components/PageTitle";
import StoryList from "../components/StoryList";
import { getTopStories } from "../api/api";
import { Dispatch } from "redux";
import { IStoryAction } from "../actions/StoryActions";
import { connect } from "react-redux";
import { IStoryState } from "../reducers/StoryReducer";
import { NavigationScreenProp } from "react-navigation";
import { IState } from "../Reducer";

interface IDispatchProps {
    loadStories: (loadType: "Single" | "All") => void;
}

interface IStoryListProps extends IStoryState, IDispatchProps {
    navigation: NavigationScreenProp<any, any>;
}

class Home extends React.Component<IStoryListProps, {}> {

    componentDidMount() {
        this.loadStories();
    }

    loadStories = () => {
        this.props.loadStories(this.props.loadType);
    }

    render() {
        return (
            <Fragment>
                <View style={[styles.homeContainer]}>
                    <PageTitle title="News" icon="Feather/refresh-cw" onPress={() => { console.log(`PageTitle onPress: ${this.props.loadType}`); this.loadStories() }} />
                    <View style={styles.storyBody}>
                        <StoryList {...this.props} />
                    </View>
                </View>
            </Fragment>
        )
    }

}

function mapStateToProps(state: IState) {
    return {
        loadType: state.stories.loadType,
        theme: state.stories.theme
    };
}

function mapDispatchToProps(dispatch: Dispatch<IStoryAction>): IDispatchProps {
    return {
        loadStories: (loadType: "Single" | "All") =>
            getTopStories(loadType)(dispatch)
    };
}

const styles = StyleSheet.create({
    storyBody: {
        flex: 8
    },
    homeContainer: {
        flex: 1
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
