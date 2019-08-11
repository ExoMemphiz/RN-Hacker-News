import { Dispatch } from "redux";
import { IStoryAction } from "../actions/StoryActions";
import axios from 'axios';
import Globals from "../Globals";
import { IHackerNewsStory, IHackerNewsUser } from "../types/types";

export function getTopStories(loadType: "Single" | "All" = "All") {
    const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
    return (dispatch: Dispatch<IStoryAction>) => {
        dispatch({ type: "Loading" });
        axios.get<any, { data: Array<number> }>(url).then((stories) => {
            const selectedStories = selectRandom(stories.data as Array<number>, Globals.STORY_COUNT_TO_FETCH);
            if (loadType === "All") {
                dispatch({ type: "Empty" });
                getAllStories(dispatch, selectedStories);
            } else {
                dispatch({ type: "Empty" });
                getSingleStories(dispatch, selectedStories);
            }
        }).catch((error) => {
            dispatch({ type: "Error", error });
        });
    }
}

function getSingleStories(dispatch: Dispatch<IStoryAction>, selectedStories: Array<number>) {
    for (let i = 0; i < selectedStories.length; i++) {
        axios.get<any, { data: IHackerNewsStory }>(`https://hacker-news.firebaseio.com/v0/item/${selectedStories[i]}.json`).then((result) => {
            axios.get<any, { data: IHackerNewsUser }>(`https://hacker-news.firebaseio.com/v0/user/${result.data.by}.json`).then((user) => {
                dispatch({ type: "Populate", stories: [{ ...result.data, karma: user.data.karma }] });
            })
        }).catch((error) => {
            dispatch({ type: "Error", error });
        })
    }
}

function getAllStories(dispatch: Dispatch<IStoryAction>, selectedStories: Array<number>) {
    Promise.all(selectedStories.map((storyID) => {
        return axios.get<any, { data: IHackerNewsStory }>(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
    })).then((values) => {
        Promise.all(values.map((story) => {
            return axios.get<any, { data: IHackerNewsUser }>(`https://hacker-news.firebaseio.com/v0/user/${story.data.by}.json`)
        })).then((users) => {
            dispatchMappedUsers(dispatch, values, users);
        });
    }).catch((error) => {
        dispatch({ type: "Error", error });
    });
}

function dispatchMappedUsers(dispatch: Dispatch<IStoryAction>, values: { data: IHackerNewsStory }[], users: { data: IHackerNewsUser }[]): void {
    const stories = values.map((story) => {
        const filtered = users.filter((val) => val.data.id === story.data.by);
        let karma = filtered.length > 0 && filtered[0].data.karma || undefined;
        return {
            ...story.data,
            karma
        }
    })
    dispatch({ type: "Populate", stories });
}

function selectRandom<T>(array: Array<T>, amount: number): Array<T> {
    const randomArray: Array<T> = [];
    for (let i = 0; i < amount; i++) {
        let randomIndex = Math.floor(Math.random() * (array.length - 0.01));
        randomArray.push(array.splice(randomIndex, 1)[0]);
    }
    return randomArray;
}
