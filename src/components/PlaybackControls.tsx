export function formatTime(
    milliseconds: number
)
{
    const seconds = Math.floor(
        milliseconds / 1000
    );

    const minutes = Math.floor(
        seconds / 60
    );

    return `${minutes}:${(
        seconds % 60
    )
        .toString()
        .padStart(2, "0")}`;
}


interface Props
{
    timelinePosition: number;
    timelineMax: number;

    isPlaying: boolean;

    playbackSpeed: number;

    onPlayPause: () => void;

    onTimelineChange: (
        value: number
    ) => void;

    onPlaybackSpeedChange: (
        value: number
    ) => void;
}

export default function PlaybackControls({
    timelinePosition,
    timelineMax,

    isPlaying,

    playbackSpeed,

    onPlayPause,

    onTimelineChange,

    onPlaybackSpeedChange,
}: Props)
{
    return (
        <div
            style={{
                padding: "1rem",
                borderRadius: 12,
                border: "1px solid #222",
                background: "#151922",

                display: "flex",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <button
                onClick={onPlayPause}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "none",
                    background:
                        "#222834",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                {isPlaying
                    ? "❚❚"
                    : "▶"}
            </button>

            <select
                value={playbackSpeed}
                onChange={(e) =>
                    onPlaybackSpeedChange(
                        Number(
                            e.target.value
                        )
                    )
                }
                style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "none",
                    background:
                        "rgba(30,35,45,0.8)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                }}
            >
                <option value={0.25}>
                    0.25x
                </option>

                <option value={0.5}>
                    0.5x
                </option>

                <option value={1}>
                    1x
                </option>

                <option value={2}>
                    2x
                </option>

                <option value={4}>
                    4x
                </option>

                <option value={8}>
                    8x
                </option>
            </select>

            <input
                type="range"
                min={0}
                max={timelineMax}
                value={timelinePosition}
                onChange={(e) =>
                    onTimelineChange(
                        Number(
                            e.target.value
                        )
                    )
                }
                style={{
                    flex: 1,
                }}
            />

            <div>
                {formatTime(
                    timelinePosition
                )}
                {" / "}
                {formatTime(
                    timelineMax
                )}
            </div>

            <div
                style={{
                    minWidth: 80,
                    textAlign: "right",
                    fontSize: 12,
                    opacity: 0.8,
                }}
            >
                {timelineMax > 0
                    ? Math.round(
                        (timelinePosition /
                            timelineMax) *
                        100
                    )
                    : 0}
                %
            </div>
        </div>
    );
}
