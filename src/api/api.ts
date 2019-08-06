import { Dispatch } from "redux";
import { IStoryAction } from "../actions/StoryActions";
import axios from 'axios';

export function getTopStories(loadType: "Single" | "All" = "All") {
    const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
    return (dispatch: Dispatch<IStoryAction>) => {
        dispatch({ type: "Loading" });
        axios.get(url).then((stories) => {
            const selectedStories = selectRandom(stories.data as Array<number>, 10);
            if (loadType === "All") {
                console.log(`Loading items as All`);
                Promise.all(selectedStories.map((storyID) => {
                    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                })).then((values) => {
                    const stories = values.map((value) => value.data);
                    dispatch({ type: "Populate", stories });
                }).catch((error) => {
                    dispatch({ type: "Error", error });
                });
            } else {
                console.log(`Loading items as Single`);
                for (let i = 0; i < selectedStories.length; i++) {
                    axios.get(`https://hacker-news.firebaseio.com/v0/item/${selectedStories[i]}.json`).then((result) => {
                        dispatch({ type: "Populate", stories: [result.data] });
                    }).catch((error) => {
                        dispatch({ type: "Error", error });
                    })
                }
            }
        }).catch((error) => {
            dispatch({ type: "Error", error });
        });
    }
}

function selectRandom<T>(array: Array<T>, amount: number): Array<T> {
    const randomArray: Array<T> = [];
    for (let i = 0; i < amount; i++) {
        let randomIndex = Math.floor(Math.random() * (array.length - 0.01));
        randomArray.push(array.splice(randomIndex, 1)[0]);
    }
    return randomArray;
}
