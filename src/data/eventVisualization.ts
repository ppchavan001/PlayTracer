import { MatchEvent }
    from "@/data/loadMatchEvents";

export const EVENT_TYPES = [
    "Position",
    "BotPosition",
    "Loot",
    "Kill",
    "BotKill",
    "Killed",
    "BotKilled",
    "KilledByStorm",
] as const;

export interface EventStyle
{
    color: string;
    width: number;
    height: number;
    zIndex: number;
}

const DEFAULT_STYLE: EventStyle =
{
    color: "#8a4d4d",
    width: 5,
    height: 5,
    zIndex: 50,
};

export function getEventStyle(
    event: string,
): EventStyle
{
    switch (event)
    {
        case "Position":
            return {
                color: "#c3ff00",
                width: 10,
                height: 10,
                zIndex: 40,
            };

        case "BotPosition":
            return {
                color: "#94a3b8",
                width: 10,
                height: 10,
                zIndex: 40,
            };

        case "Loot":
            return {
                color: "#0c0c0c",
                width: 10,
                height: 10,
                zIndex: 10,
            };

        case "Kill":
        case "BotKill":
            return {
                color: "#22c55e",
                width: 10,
                height: 10,
                zIndex: 20,
            };

        case "Killed":
        case "BotKilled":
            return {
                color: "#ef4444",
                width: 10,
                height: 10,
                zIndex: 30,
            };

        case "KilledByStorm":
            return {
                color: "#3b82f6",
                width: 10,
                height: 10,
                zIndex: 40,
            };

        default:
            return DEFAULT_STYLE;
    }
}
