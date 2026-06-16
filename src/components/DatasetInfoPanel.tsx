import { DatasetInfo } from "@/types/dataset";

interface Props
{
    info: DatasetInfo | null;
}

export default function DatasetInfoPanel({
    info,
}: Props)
{
    if (!info)
    {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                padding: "1rem",
                borderRadius: 12,
                border: "1px solid #222",
                background: "#151922",
            }}
        >
            <h3
                style={{
                    marginTop: 0,
                    marginBottom: "1rem",
                }}
            >
                Dataset Info
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "1fr auto",
                    gap: "0.5rem",
                    fontSize: 14,
                }}
            >
                <span>Rows</span>
                <strong>
                    {info.rows.toLocaleString()}
                </strong>

                <span>Matches</span>
                <strong>
                    {info.matches.toLocaleString()}
                </strong>

                <span>Players</span>
                <strong>
                    {info.players.toLocaleString()}
                </strong>

                <span>Humans</span>
                <strong>
                    {info.humans.toLocaleString()}
                </strong>

                <span>Bots</span>
                <strong>
                    {info.bots.toLocaleString()}
                </strong>

                <span>Maps</span>
                <strong>{info.maps}</strong>

                <span>Events</span>
                <strong>
                    {info.eventTypes}
                </strong>
            </div>
        </div>
    );
}
