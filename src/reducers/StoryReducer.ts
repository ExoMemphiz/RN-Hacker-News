import { IStoryAction } from "../actions/StoryActions";
import { IHackerNewsStory } from "../types/types";

export interface IStoryState {
    stories: Array<IHackerNewsStory>;
    loading: boolean;
    error: Error | undefined;
    loadType: "Single" | "All";
    sortOrder: "Asc" | "Desc"
}

const initialState: IStoryState = {
    stories: [],
    loading: false,
    error: undefined,
    loadType: "Single",
    sortOrder: "Asc"
}

const storyReducer = (state: IStoryState = initialState, action: IStoryAction): IStoryState => {
    switch (action.type) {
        case "Empty":
            return {
                stories: [],
                loading: false,
                error: undefined,
                ...state
            };

        case "Error":
            return {
                loading: false,
                stories: [],
                error: action.error,
                ...state
            }

        case "Loading":
            return {
                stories: [],
                loading: true,
                error: undefined,
                ...state
            }

        case "Populate":
            if (action.stories) {
                // console.log(`Adding ${action.stories.length} more stor${action.stories.length > 1 ? "ies" : "y"}`);
                return {
                    stories: state.stories.concat(action.stories).sort((a, b) => {
                        // Ascending = a - b, descending = b - a
                        if (state.sortOrder === "Asc") {
                            return a.score - b.score;
                        }
                        return b.score - a.score;
                    }),
                    loading: false,
                    error: undefined,
                    ...state
                }
            }
            return {
                loading: false,
                error: undefined,
                ...state
            }

        case "ChangeType":
            return {
                loadType: state.loadType === "All" ? "Single" : "All",
                ...state
            }

        case "ChangeOrder":
            return {
                stories: state.stories.sort((a, b) => {
                    // Ascending = a - b, descending = b - a
                    if (state.sortOrder === "Asc") {
                        // Inverted, because changeOrder will change which order they should be shown
                        return b.score - a.score;
                    }
                    return a.score - b.score;
                }),
                sortOrder: state.sortOrder === "Asc" ? "Desc" : "Asc",
                ...state,
            }

        default:
            return initialState;
    }
}

export default storyReducer;
