import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	FlatList,
	ActivityIndicator,
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

interface IDispatchProps {
	loadStories: (loadType: "Single" | "All") => void;
	changeLoadType: () => void;
	changeSortOrder: () => void;
}

interface IStoryListProps extends IStoryState, IDispatchProps {}
interface IStoryListState {
	refreshing: boolean;
}

class StoryList extends React.Component<IStoryListProps, IStoryListState> {
	constructor(props: IStoryListProps) {
		super(props);

		this.state = {
			refreshing: false,
		};
	}

	getRenderItem = () => {
		let renderItem: undefined | Element = this.props.error && (
			<Text>{this.props.error}</Text>
		);
		renderItem = renderItem || (this.props.loading && <Text>Loading...</Text>);
		renderItem =
			renderItem ||
			(this.props.stories.length && (
				<FlatList
					data={this.props.stories}
					renderItem={story => {
						return <StoryItem {...story.item} />;
					}}
					keyExtractor={story => `${story.id}`}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
						/>
					}
				/>
			));
		return renderItem || <Text>Empty...</Text>;
	};

	handleRefresh = () => {
		this.props.loadStories(this.props.loadType);
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.loader}>
					<FlatList
						data={this.props.stories}
						renderItem={story => {
							return <StoryItem {...story.item} />;
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
