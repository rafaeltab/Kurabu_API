export declare type Fields = {
    id?: boolean;
    title?: boolean;
    main_picture?: boolean;
    alternative_titles?: boolean;
    start_date?: boolean;
    end_date?: boolean;
    synopsis?: boolean;
    mean?: boolean;
    rank?: boolean;
    popularity?: boolean;
    num_list_users?: boolean;
    num_scoring_users?: boolean;
    nsfw?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    media_type?: boolean;
    status?: boolean;
    genres?: boolean;
    my_list_status?: boolean | Fields;
    num_episodes?: boolean;
    start_season?: boolean;
    broadcast?: boolean;
    source?: boolean;
    average_episode_duration?: boolean;
    rating?: boolean;
    pictures?: boolean;
    background?: boolean;
    related_anime?: boolean | Fields;
    related_manga?: boolean | Fields;
    recommendations?: boolean | Fields;
    studios?: boolean;
    statistics?: boolean;
    videos?: boolean;
};
export declare function fieldsToString(fields: any): string;
export declare function extractFields(str: string): {
    fields: Fields;
    remaining: string;
};
export declare function allFields(): {
    id: boolean;
    title: boolean;
    main_picture: boolean;
    alternative_titles: boolean;
    start_date: boolean;
    end_date: boolean;
    synopsis: boolean;
    mean: boolean;
    rank: boolean;
    popularity: boolean;
    num_list_users: boolean;
    num_scoring_users: boolean;
    nsfw: boolean;
    created_at: boolean;
    updated_at: boolean;
    media_type: boolean;
    status: boolean;
    genres: boolean;
    my_list_status: boolean;
    num_episodes: boolean;
    start_season: boolean;
    broadcast: boolean;
    source: boolean;
    average_episode_duration: boolean;
    rating: boolean;
    pictures: boolean;
    background: boolean;
    related_anime: boolean;
    related_manga: boolean;
    recommendations: boolean;
    studios: boolean;
    statistics: boolean;
};
