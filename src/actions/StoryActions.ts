import { IHackerNewsStory } from "../types/types";

export interface IStoryAction {
    type: "Empty" | "Loading" | "Populate" | "Error" | "ChangeType" | "ChangeOrder";
    stories?: Array<IHackerNewsStory>;
    error?: Error;
    loadType?: "Single" | "All";
}
