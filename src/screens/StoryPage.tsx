import React, { Fragment } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PageTitle from "../components/PageTitle";
import { IHackerNewsStory } from "../types/types";
import { NavigationScreenProp } from "react-navigation";

interface IStoryPageProps {
    navigation?: NavigationScreenProp<any, { story: IHackerNewsStory }>;
}

class StoryPage extends React.Component<IStoryPageProps, {}> {

    handleGoToURL = () => {
        this.props.navigation && this.props.navigation.goBack();
    }

    render() {

        if (this.props.navigation) {
            const story = this.props.navigation.getParam("story");
            console.log(story);
            if (!story) {
                this.props.navigation.goBack();
            }
            return (
                <Fragment>
                    <View style={styles.storyPageContainer}>
                        <PageTitle title={`Page Settings`} />
                        <View style={styles.storyPageBody}>
                            <View style={styles.storyPageInfo}>
                                <View style={styles.infoBox}>
                                    <Text>{story.title}</Text>
                                    {story.url &&
                                        <TouchableOpacity onPress={this.handleGoToURL}>
                                            <Text>{story.url}</Text>
                                        </TouchableOpacity>

                                    }
                                    <Text>By {story.by} {story.karma ? `(${story.karma})` : ``}</Text>
                                    <Text>Score: {story.score}</Text>
                                    <Text>Timestamp: {new Date(story.time * 1000).toLocaleString()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Fragment>
            );

        }

        return (
            <View>
                <Text>
                    No Page Info
                </Text>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    infoBox: {
        flex: 1,
        marginLeft: `5%`,
        marginTop: `5%`,
        marginRight: `5%`
    },
    storyPageInfo: {
        flex: 1,
        flexDirection: `row`,
        marginLeft: `10%`,
        marginRight: `10%`,
        marginTop: `10%`,
        borderWidth: 1,
        maxHeight: `40%`
    },
    storyPageContainer: {
        flex: 1
    },
    storyPageBody: {
        flex: 8
    }
});

export default StoryPage;

export { styles };
