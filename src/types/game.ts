export interface GameEvent
{
    user_id: string;
    match_id: string;
    map_id: string;
    x: number;
    y: number;
    z: number;
    ts: Date;
    event: string;
}

export type OutputMode =
    | "playback"
    | "traffic"
    | "kills"
    | "deaths";
