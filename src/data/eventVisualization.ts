import { MatchEvent }
    from "@/data/loadMatchEvents";

export interface EventStyle
{
    color: string;
    width: number;
    height: number;
    zIndex: number;
}

const DEFAULT_STYLE: EventStyle =
{
    color: "#ffffff",
    width: 5,
    height: 5,
    zIndex: 50,
};

export function getEventStyle(
    event: MatchEvent
): EventStyle
{
    switch (event.event)
    {
        case "Position":
            return {
                color: "#ffffff",
                width: 7,
                height: 7,
                zIndex: 40,
            };

        case "BotPosition":
            return {
                color: "#94a3b8",
                width: 5,
                height: 5,
                zIndex: 40,
            };

        case "Loot":
            return {
                color: "#facc15",
                width: 6,
                height: 6,
                zIndex: 50,
            };

        case "Kill":
        case "BotKill":
            return {
                color: "#22c55e",
                width: 8,
                height: 8,
                zIndex: 60,
            };

        case "Killed":
        case "BotKilled":
            return {
                color: "#ef4444",
                width: 8,
                height: 8,
                zIndex: 60,
            };

        case "KilledByStorm":
            return {
                color: "#3b82f6",
                width: 8,
                height: 8,
                zIndex: 60,
            };

        default:
            return DEFAULT_STYLE;
    }
}
