import storyReducer, { IStoryState } from "../src/reducers/StoryReducer";
import Globals from "../src/Globals";


describe(`Story Reducer`, () => {

    test(`Should return initial state`, () => {
        // @ts-ignore
        expect(storyReducer(undefined, {})).toMatchObject({
            stories: [],
            loading: false,
            error: undefined,
            loadType: "Single",
            sortOrder: "Asc",
            theme: "Light"
        })
    });

    test('Should handle loading action', () => {
        expect(storyReducer(undefined, { type: "Loading" })).toMatchObject<IStoryState>({
            stories: [],
            loading: true,
            error: undefined,
            loadType: "Single",
            sortOrder: "Asc",
            theme: "Light"
        })
        // @ts-ignore
        expect(storyReducer(undefined, {}))
    });

    test('Should handle type action', () => {
        expect(storyReducer(undefined, { type: "ChangeType" })).toMatchObject<IStoryState>({
            stories: [],
            loading: false,
            error: undefined,
            loadType: "All",
            sortOrder: "Asc",
            theme: "Light"
        })
        // @ts-ignore
        expect(storyReducer(undefined, {}))
    });

    test('Should handle order action', () => {
        expect(storyReducer(undefined, { type: "ChangeOrder" })).toMatchObject<IStoryState>({
            stories: [],
            loading: false,
            error: undefined,
            loadType: "Single",
            sortOrder: "Desc",
            theme: "Light"
        })
        // @ts-ignore
        expect(storyReducer(undefined, {}))
    });

    test('Should handle populate action', () => {
        expect(storyReducer(undefined, { type: "Populate", stories: [Globals.TEST_STORY] })).toMatchObject<IStoryState>({
            stories: [Globals.TEST_STORY],
            loading: false,
            error: undefined,
            loadType: "Single",
            sortOrder: "Asc",
            theme: "Light"
        })
        // @ts-ignore
        expect(storyReducer(undefined, {}))
    });

    test('Should handle theme action', () => {
        expect(storyReducer(undefined, { type: "ChangeTheme" })).toMatchObject<IStoryState>({
            stories: [],
            loading: false,
            error: undefined,
            loadType: "Single",
            sortOrder: "Asc",
            theme: "Dark"
        })
        // @ts-ignore
        expect(storyReducer(undefined, {}))
    });

});
