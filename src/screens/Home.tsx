import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import PageTitle from "../components/PageTitle";
import StoryList from "../components/StoryList";
import { getTopStories } from "../api/api";
import { NavigationScreenProp } from "react-navigation";
import { observer } from 'mobx-react';
import StoryStore from '../stores/StoryStore';

interface IStoryListProps {
    navigation: NavigationScreenProp<any, any>;
}

@observer
export default class Home extends React.Component<IStoryListProps, {}> {

    componentDidMount() {
        this.loadStories();
    }

    loadStories = () => {
        getTopStories(StoryStore.loadType);
    }

    render() {
        return (
            <Fragment>
                <View style={[styles.homeContainer]}>
                    <PageTitle title="News" icon="Feather/refresh-cw" onPress={() => { console.log(`PageTitle onPress: ${StoryStore.loadType}`); this.loadStories() }} />
                    <View style={styles.storyBody}>
                        <StoryList {...this.props} />
                    </View>
                </View>
            </Fragment>
        )
    }

}

const styles = StyleSheet.create({
    storyBody: {
        flex: 8
    },
    homeContainer: {
        flex: 1
    }
});
