import { IHackerNewsStory } from "../types/types";

export interface IStoryAction {
    type: "Empty" | "Loading" | "Populate" | "Error" | "ChangeType" | "ChangeOrder" | "ChangeTheme";
    stories?: Array<IHackerNewsStory>;
    error?: Error;
    loadType?: "Single" | "All";
}
