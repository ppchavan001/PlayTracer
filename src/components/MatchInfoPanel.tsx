import { MatchInfo } from "@/types/matchInfo";

interface Props
{
    info: MatchInfo | null;
}

export default function MatchInfoPanel({
    info,
}: Props)
{
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
                Match Info
            </h3>

            {!info && (
                <div
                    style={{
                        opacity: 0.6,
                    }}
                >
                    Select a match
                </div>
            )}

            {info && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr auto",
                        gap: "0.75rem",
                        fontSize: 14,
                    }}
                >
                    <span>Match ID</span>
                    <strong>
                        {info.matchId.slice(0, 8)}
                        ...
                    </strong>

                    <span>Map</span>
                    <strong>
                        {info.mapId}
                    </strong>

                    <span>Players</span>
                    <strong>
                        {info.players}
                    </strong>

                    <span>Bots</span>
                    <strong>
                        {info.bots}
                    </strong>
                </div>
            )}
        </div>
    );
}
