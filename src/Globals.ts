import { IStoryItemProps } from "./components/StoryItem";

const TEST_STORY: any = {
    by: "Chris",
    descendants: 0,
    error: undefined,
    id: 23,
    kids: [0],
    loadType: "Single",
    loading: false,
    onPress: () => console.log(`TEST_STORY Pressed!`),
    score: 85,
    sortOrder: "Asc",
    stories: [],
    time: 24456,
    title: "This is a test story",
    type: "Story",
    url: "www.google.com",
    index: 0
}

export default {
    TEST_STORY,
    STORY_COUNT_TO_FETCH: 10,
    LIGHT_THEME: "white",
    DARK_THEME: "#2A2A2A"
}
