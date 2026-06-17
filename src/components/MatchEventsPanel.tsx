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

export default function MatchEventsPanel({
    rows,
    eventType,
    onEventTypeChange,
}: Props)
{
    return (
        <div
            style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: 12,
                border: "1px solid #222",
                background: "#151922",

                display: "flex",
                flexDirection: "column",

                height: "calc(100vh - 240px)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                    }}
                >
                    Match Events
                </h3>

                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: 12,
                            opacity: 0.7,
                        }}
                    >
                        {rows.length}
                    </span>

                    <select
                        value={eventType}
                        onChange={(e) =>
                            onEventTypeChange(
                                e.target.value
                            )
                        }
                    >
                        {EVENT_TYPES.map(
                            (event) => (
                                <option
                                    key={event}
                                    value={event}
                                >
                                    {event}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div
                style={{
                    overflow: "auto",
                    flex: 1,
                    fontSize: 12,
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse:
                            "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Z</th>
                            <th>TS</th>
                            <th>Event</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map(
                            (row, index) => (
                                <tr
                                    key={index}
                                >
                                    <td
                                        style={{
                                            maxWidth:
                                                140,
                                            overflow:
                                                "hidden",
                                            textOverflow:
                                                "ellipsis",
                                        }}
                                    >
                                        {row.userId}
                                    </td>

                                    <td>
                                        {row.x.toFixed(
                                            2
                                        )}
                                    </td>

                                    <td>
                                        {row.y.toFixed(
                                            2
                                        )}
                                    </td>

                                    <td>
                                        {row.z.toFixed(
                                            2
                                        )}
                                    </td>

                                    <td>
                                        {row.ts}
                                    </td>

                                    <td>
                                        {row.event}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
