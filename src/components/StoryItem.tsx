import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IHackerNewsStory } from "../types/types";

export default class StoryItem extends React.Component<IHackerNewsStory, {}> {
	render() {
		return (
			<TouchableOpacity style={styles.container}>
				<View style={styles.textContainer}>
					<Text numberOfLines={1}>{this.props.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#CCC",
		paddingTop: 10,
		paddingBottom: 10,
	},
	textContainer: {
		marginLeft: 20,
		marginRight: 20,
	},
});
