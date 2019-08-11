
export interface IHackerNewsStory {
    by: string;
    karma?: number;
    descendants: number;
    id: number;
    kids: Array<number>;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

export interface IHackerNewsUser {
    created: number;
    id: string;
    karma: number;
    submitted: Array<number>;
}
