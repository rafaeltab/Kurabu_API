import { MediaNode } from "./Media";
export declare type StatusNode = MediaNode & {
    list_status: ListStatus;
};
export declare type ListStatus = {
    status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    score: number;
    num_episodes_watched: number;
    is_rewatching: boolean;
    updated_at: string;
};
