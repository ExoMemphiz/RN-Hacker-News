import { IStoryAction } from "../actions/StoryActions";
import { IHackerNewsStory } from "../types/types";

export interface IStoryState {
    stories: Array<IHackerNewsStory>;
    loading: boolean;
    error: Error | undefined;
    loadType: "Single" | "All";
    sortOrder: "Asc" | "Desc";
    theme: "Light" | "Dark"
}

const initialState: IStoryState = {
    stories: [],
    loading: false,
    error: undefined,
    loadType: "Single",
    sortOrder: "Asc",
    theme: "Light"
};

const storyReducer = (
    state: IStoryState = initialState,
    action: IStoryAction,
): IStoryState => {
    switch (action.type) {
        case "Empty":
            return {
                ...state,
                stories: [],
                error: undefined,
            };

        case "Error":
            return {
                ...state,
                loading: false,
                stories: [],
                error: action.error,
            };

        case "Loading":
            return {
                ...state,
                loading: true,
                error: undefined,
            };

        case "Populate":
            if (action.stories) {
                const stories = state.stories.concat(action.stories).sort((a, b) => {
                    // Ascending = a - b, descending = b - a
                    if (state.sortOrder === "Asc") {
                        return a.score - b.score;
                    }
                    return b.score - a.score;
                });
                return {
                    ...state,
                    stories,
                    loading: false,
                    error: undefined,
                };
            }
            return {
                ...state,
                loading: false,
                error: undefined,
            };

        case "ChangeType":
            return {
                ...state,
                loadType: state.loadType === "All" ? "Single" : "All",
            };

        case "ChangeOrder":
            return {
                ...state,
                stories: state.stories.sort((a, b) => {
                    // Ascending = a - b, descending = b - a
                    if (state.sortOrder === "Asc") {
                        // Inverted, because changeOrder will change which order they should be shown
                        return b.score - a.score;
                    }
                    return a.score - b.score;
                }),
                sortOrder: state.sortOrder === "Asc" ? "Desc" : "Asc",
            };

        case "ChangeTheme":
            return {
                ...state,
                theme: state.theme === "Light" ? "Dark" : "Light"
            }

        default:
            return initialState;
    }
};

export default storyReducer;
