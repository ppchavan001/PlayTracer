import MinimapView
    from "@/components/minimap/MinimapView";

import PlaybackControls
    from "@/components/PlaybackControls";

import { MatchEvent }
    from "@/data/loadMatchEvents";

interface Props
{
    selectedMap:
    | string
    | null;

    visualizationMode:
    string;

    onVisualizationModeChange: (
        value: string
    ) => void;

    visibleEvents:
    MatchEvent[];

    timelinePosition:
    number;

    timelineMax:
    number;

    isPlaying:
    boolean;

    playbackSpeed:
    number;

    onPlayPause: () => void;

    onTimelineChange: (
        value: number
    ) => void;

    onPlaybackSpeedChange: (
        value: number
    ) => void;
}

export default function CenterPanel({
    selectedMap,
    visualizationMode,
    onVisualizationModeChange,
    visibleEvents,

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
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                background: "#11151b",
                padding: "1rem",
                gap: "1rem",
                overflow: "hidden",
            }}
        >
            <MinimapView
                selectedMap={
                    selectedMap
                }
                visualizationMode={
                    visualizationMode
                }
                onVisualizationModeChange={
                    onVisualizationModeChange
                }
                visibleEvents={
                    visibleEvents
                }
            />

            <PlaybackControls
                timelinePosition={
                    timelinePosition
                }
                timelineMax={
                    timelineMax
                }
                isPlaying={
                    isPlaying
                }
                playbackSpeed={
                    playbackSpeed
                }
                onPlayPause={
                    onPlayPause
                }
                onTimelineChange={
                    onTimelineChange
                }
                onPlaybackSpeedChange={
                    onPlaybackSpeedChange
                }
            />
        </section>
    );
}
