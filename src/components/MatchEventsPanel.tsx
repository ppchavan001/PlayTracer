"use client";

import { useState } from "react";

import { MatchEventRow }
    from "@/types/matchEventRow";

interface Props
{
    rows: MatchEventRow[];

    eventType: string;

    onEventTypeChange: (
        value: string
    ) => void;
}

const EVENT_TYPES = [
    "All",
    "Position",
    "BotPosition",
    "Loot",
    "Kill",
    "Killed",
    "BotKill",
    "BotKilled",
    "KilledByStorm",
];

function formatTimestamp(
    timestamp: string
)
{
    const date =
        new Date(timestamp);

    return date
        .toISOString()
        .substring(14, 19);
}

function getEventColor(
    event: string
)
{
    switch (event)
    {
        case "Loot":
            return "#facc15";

        case "Kill":
        case "BotKill":
            return "#22c55e";

        case "Killed":
        case "BotKilled":
            return "#ef4444";

        case "KilledByStorm":
            return "#3b82f6";

        default:
            return "#ffffff";
    }
}

export default function MatchEventsPanel({
    rows,
    eventType,
    onEventTypeChange,
}: Props)
{
    const [
        selectedEvent,
        setSelectedEvent,
    ] =
        useState<MatchEventRow | null>(
            null
        );

    return (
        <div
            style={{
                marginTop: "1rem",

                flex: 1,

                minHeight: 0,

                padding: "1rem",

                borderRadius: 12,

                border:
                    "1px solid #222",

                background:
                    "#151922",

                display: "flex",
                flexDirection: "column",

                overflow: "hidden",
            }}
        >
            <h3
                style={{
                    marginTop: 0,
                    marginBottom:
                        "1rem",
                }}
            >
                Match Events
            </h3>

            <div
                style={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    marginBottom:
                        "1rem",
                }}
            >
                <select
                    value={eventType}
                    onChange={(e) =>
                        onEventTypeChange(
                            e.target.value
                        )
                    }
                    style={{
                        padding:
                            "6px 12px",

                        borderRadius:
                            999,

                        border: "none",

                        background:
                            "rgba(30,35,45,0.8)",

                        color: "#fff",

                        fontSize: 12,

                        fontWeight: 600,
                    }}
                >
                    {EVENT_TYPES.map(
                        (
                            event
                        ) => (
                            <option
                                key={event}
                                value={
                                    event
                                }
                            >
                                {event}
                            </option>
                        )
                    )}
                </select>

                <div
                    style={{
                        padding:
                            "6px 10px",

                        borderRadius:
                            999,

                        background:
                            "#222834",

                        fontSize: 12,

                        fontWeight: 600,
                    }}
                >
                    {rows.length.toLocaleString()} rows
                </div>
            </div>

            <div
                style={{
                    flex: 1,

                    minHeight: 0,

                    overflowY:
                        "auto",

                    border:
                        "1px solid #222",

                    borderRadius: 8,
                }}
            >
                {rows.map(
                    (
                        row,
                        index
                    ) => (
                        <button
                            key={index}
                            onClick={() =>
                                setSelectedEvent(
                                    row
                                )
                            }
                            style={{
                                width:
                                    "100%",

                                display:
                                    "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",

                                padding:
                                    "0.75rem",

                                border:
                                    "none",

                                borderBottom:
                                    "1px solid #222",

                                background:
                                    selectedEvent ===
                                        row
                                        ? "#222834"
                                        : "transparent",

                                color:
                                    "#fff",

                                cursor:
                                    "pointer",
                            }}
                        >
                            <span>
                                {formatTimestamp(
                                    row.ts
                                )}
                            </span>

                            <span
                                style={{
                                    color:
                                        getEventColor(
                                            row.event
                                        ),

                                    fontWeight: 600,
                                }}
                            >
                                {
                                    row.event
                                }
                            </span>
                        </button>
                    )
                )}
            </div>

            <div
                style={{
                    marginTop:
                        "1rem",

                    paddingTop:
                        "1rem",

                    borderTop:
                        "1px solid #222",

                    minHeight: 180,
                }}
            >
                <h4
                    style={{
                        marginTop: 0,
                    }}
                >
                    Selected Event
                </h4>

                {!selectedEvent && (
                    <div
                        style={{
                            opacity:
                                0.6,
                        }}
                    >
                        Select an event
                    </div>
                )}

                {selectedEvent && (
                    <div
                        style={{
                            fontSize: 13,

                            display:
                                "grid",

                            gap:
                                "0.5rem",
                        }}
                    >
                        <div>
                            <strong>
                                User ID
                            </strong>

                            <div
                                style={{
                                    wordBreak:
                                        "break-all",

                                    opacity:
                                        0.85,
                                }}
                            >
                                {
                                    selectedEvent.userId
                                }
                            </div>
                        </div>

                        <div>
                            <strong>
                                X
                            </strong>
                            :{" "}
                            {selectedEvent.x.toFixed(
                                2
                            )}
                        </div>

                        <div>
                            <strong>
                                Y
                            </strong>
                            :{" "}
                            {selectedEvent.y.toFixed(
                                2
                            )}
                        </div>

                        <div>
                            <strong>
                                Z
                            </strong>
                            :{" "}
                            {selectedEvent.z.toFixed(
                                2
                            )}
                        </div>

                        <div>
                            <strong>
                                Event
                            </strong>
                            :{" "}
                            {
                                selectedEvent.event
                            }
                        </div>

                        <div>
                            <strong>
                                Timestamp
                            </strong>
                            :{" "}
                            {
                                selectedEvent.ts
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
