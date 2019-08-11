import React, { Fragment } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PageTitle from "../components/PageTitle";
import { IHackerNewsStory } from "../types/types";
import { NavigationScreenProp } from "react-navigation";
import Globals from "../Globals";
import { IState } from "../Reducer";
import { connect } from "react-redux";

interface IStoryPageProps {
    navigation?: NavigationScreenProp<any, { story: IHackerNewsStory }>;
    theme: "Light" | "Dark";
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
            const textStyle = {
                color: (this.props.theme === "Dark" ? Globals.DARK_THEME_TEXT : Globals.LIGHT_THEME_TEXT)
            }
            return (
                <Fragment>
                    <View style={[styles.storyPageContainer, { backgroundColor: (this.props.theme === "Dark" ? Globals.DARK_THEME : Globals.LIGHT_THEME) }]}>
                        <PageTitle title={`Story Info`} />
                        <View style={styles.storyPageBody}>
                            <View style={styles.storyPageInfo}>
                                <View style={styles.infoBox}>
                                    <Text style={{ color: "#FF6600" }}>{story.title}</Text>
                                    {story.url &&
                                        <TouchableOpacity onPress={this.handleGoToURL}>
                                            <Text style={textStyle} numberOfLines={2}>{story.url}</Text>
                                        </TouchableOpacity>

                                    }
                                    <Text style={textStyle}>By {story.by} {story.karma ? `(${story.karma})` : ``}</Text>
                                    <Text style={textStyle}>Score: {story.score}</Text>
                                    <Text style={textStyle}>Timestamp: {new Date(story.time * 1000).toLocaleString()}</Text>
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
        marginRight: `5%`,
        justifyContent: "space-between"
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

function mapStateToProps(state: IState) {
    return {
        theme: state.stories.theme
    }
}

export default connect(mapStateToProps)(StoryPage);
