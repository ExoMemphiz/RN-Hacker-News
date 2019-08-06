import { combineReducers } from "redux";
import storyReducer, { IStoryState } from "./reducers/StoryReducer";

export interface IState {
    stories: IStoryState
}

export const reducer = combineReducers<IState>({
    stories: storyReducer
});

export default reducer;
