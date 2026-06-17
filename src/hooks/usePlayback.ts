"use client";

import
{
    useEffect,
    useState,
} from "react";

import
{
    MatchEvent,
    loadMatchEvents,
} from "@/data/loadMatchEvents";

export function usePlayback(
    matchId: string
)
{
    const [events,
        setEvents] =
        useState<MatchEvent[]>([]);

    const [visibleEvents,
        setVisibleEvents] =
        useState<MatchEvent[]>([]);

    const [timelinePosition,
        setTimelinePosition] =
        useState(0);

    const [timelineMax,
        setTimelineMax] =
        useState(0);

    const [isPlaying,
        setIsPlaying] =
        useState(false);

    const [playbackSpeed,
        setPlaybackSpeed] =
        useState(0.01);

    const [
        visualizationMode,
        setVisualizationMode,
    ] = useState("events");

    useEffect(() =>
    {
        async function loadData()
        {
            setIsPlaying(false);
            setEvents([]);
            setVisibleEvents([]);
            setTimelinePosition(0);

            if (!matchId)
            {
                return;
            }

            const matchEvents =
                await loadMatchEvents(
                    matchId
                );

            setEvents(matchEvents);

            if (
                !matchEvents.length
            )
            {
                return;
            }

            const minTs =
                matchEvents[0].ts;

            const maxTs =
                matchEvents[
                    matchEvents.length - 1
                ].ts;

            setTimelineMax(
                maxTs - minTs
            );
        }

        loadData().catch(
            console.error
        );
    }, [matchId]);

    useEffect(() =>
    {
        if (!events.length)
        {
            return;
        }

        const startTs =
            events[0].ts;

        const currentTs =
            startTs +
            timelinePosition;

        const latestPositions =
            new Map<
                string,
                MatchEvent
            >();

        const visibleEvents:
            MatchEvent[] = [];

        for (const event of events)
        {
            if (
                event.ts >
                currentTs
            )
            {
                break;
            }

            if (
                event.event ===
                "Position" ||
                event.event ===
                "BotPosition"
            )
            {
                latestPositions.set(
                    event.userId,
                    event
                );

                continue;
            }

            visibleEvents.push(
                event
            );
        }

        visibleEvents.push(
            ...latestPositions.values()
        );

        setVisibleEvents(
            visibleEvents
        );
    }, [
        events,
        timelinePosition,
    ]);

    useEffect(() =>
    {
        if (!isPlaying)
        {
            return;
        }

        const timer =
            window.setInterval(() =>
            {
                setTimelinePosition(
                    (current) =>
                    {
                        if (
                            current >=
                            timelineMax
                        )
                        {
                            setIsPlaying(
                                false
                            );

                            return timelineMax;
                        }

                        return Math.min(
                            current +
                            10 *
                            playbackSpeed,
                            timelineMax
                        );
                    }
                );
            }, 10);

        return () =>
            window.clearInterval(
                timer
            );
    }, [
        isPlaying,
        playbackSpeed,
        timelineMax,
    ]);

    return {
        events,
        visibleEvents,

        timelinePosition,
        timelineMax,

        isPlaying,
        setIsPlaying,

        playbackSpeed,
        setPlaybackSpeed,

        visualizationMode,
        setVisualizationMode,

        setTimelinePosition,
    };
}
