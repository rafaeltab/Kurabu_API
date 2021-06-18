import { ListStatus } from "./Status";
export declare type Media = {
    id: number;
    title: string;
    main_picture: Picture;
    alternative_titles?: {
        synonyms?: string[];
        en?: string;
        ja?: string;
    };
    start_date?: string;
    end_date?: string;
    synopsis?: string;
    mean?: number;
    rank?: number;
    popularity?: number;
    num_list_users?: number;
    num_scoring_users?: number;
    nsfw?: string;
    created_at?: string;
    updated_at?: string;
    media_type?: string;
    status?: string;
    genres?: Genre[];
    my_list_status?: ListStatus;
    num_episodes?: number;
    start_season?: Season;
    broadcast?: {
        day_of_the_week?: string;
        start_time?: string;
    };
    source?: string;
    average_episode_duration?: number;
    rating?: string;
    pictures?: Picture[];
    background?: string;
    related_anime?: Relation[];
    related_manga?: Relation[];
    recommendations?: (MediaNode & {
        num_recommendations?: number;
    })[];
    studios?: Studio[];
    statistics?: {
        status?: {
            watching?: string;
            completed?: string;
            on_hold?: string;
            dropped?: string;
            plan_to_watch?: string;
        };
        num_list_users?: number;
    };
};
export declare type MediaNode = {
    node: Media;
};
declare type Relation = MediaNode & {
    relation_type: string;
    relation_type_formatted: string;
};
export declare type Picture = {
    medium: string;
    large: string;
};
export declare type Genre = {
    id: number;
    name: string;
};
export declare type Season = {
    year: number;
    season: string;
};
export declare type Studio = {
    id: number;
    name: string;
};
export {};
