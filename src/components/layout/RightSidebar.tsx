"use client";

import { useEffect, useState } from "react";

import MatchInfoPanel
    from "@/components/MatchInfoPanel";

import MatchEventsPanel
    from "@/components/MatchEventsPanel";

import { MatchInfo }
    from "@/types/matchInfo";

import { MatchEventRow }
    from "@/types/matchEventRow";

import { loadMatchRows }
    from "@/data/loadMatchRows";

interface Props
{
    matchId: string;

    matchInfo:
    | MatchInfo
    | null;
}

export default function RightSidebar({
    matchId,
    matchInfo,
}: Props)
{
    const [eventType, setEventType] =
        useState("Kill");

    const [rows, setRows] =
        useState<MatchEventRow[]>([]);

    useEffect(() =>
    {
        async function loadRows()
        {
            if (!matchId)
            {
                setRows([]);
                return;
            }

            const result =
                await loadMatchRows(
                    matchId,
                    eventType
                );

            setRows(result);
        }

        loadRows().catch(
            console.error
        );
    }, [
        matchId,
        eventType,
    ]);

    return (
        <aside
            style={{
                padding: "1rem",
                borderLeft:
                    "1px solid #1e232d",

                display: "flex",
                flexDirection: "column",

                overflow: "hidden",
            }}
        >
            <MatchInfoPanel
                info={matchInfo}
            />

            <MatchEventsPanel
                rows={rows}
                eventType={eventType}
                onEventTypeChange={
                    setEventType
                }
            />
        </aside>
    );
}
