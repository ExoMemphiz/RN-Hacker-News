import { observable, action } from 'mobx';
import { IHackerNewsStory } from '../types/types';

class StoryStore {

    @observable stories: Array<IHackerNewsStory> = [];

    @observable loading = false;

    @observable loadType: "Single" | "All" = "Single";
    @observable theme: "Light" | "Dark" = "Light";
    @observable sortOrder: "Asc" | "Desc" = "Asc";

    @observable error: Error | undefined = undefined;

    @action
    public changeLoadType() {
        this.loadType = (this.loadType === "All" ? "Single" : "All");
    }

    @action
    public changeSortOrder() {
        this.sortOrder = (this.sortOrder === "Asc" ? "Desc" : "Asc");
    }

    @action
    public changeTheme() {
        this.theme = (this.theme === "Light" ? "Dark" : "Light");
    }

    @action
    public emptyStories() {
        this.stories = [];
    }

    @action
    public populateStories(stories: Array<IHackerNewsStory>) {
        this.stories = this.stories.concat(stories);
        this.loading = false;
    }

}

const storyStore = new StoryStore();

export default storyStore;
