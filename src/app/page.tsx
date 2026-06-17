"use client";

import LeftSidebar from "@/components/layout/LeftSidebar";
import CenterPanel from "@/components/layout/CenterPanel";
import RightSidebar from "@/components/layout/RightSidebar";

import { useDataset } from "@/hooks/useDataset";
import { useMatch } from "@/hooks/useMatch";
import { usePlayback } from "@/hooks/usePlayback";

export default function Home()
{
  const dataset = useDataset();

  const match = useMatch(
    dataset.filters.matchId
  );

  const playback = usePlayback(
    dataset.filters.matchId
  );

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns:
          "320px 1fr 320px",
        height: "100vh",
        background: "#0b0d10",
        color: "#fff",
      }}
    >
      <LeftSidebar
        info={dataset.info}
        dates={dataset.dates}
        matches={dataset.matches}
        filters={dataset.filters}
        onFiltersChange={
          dataset.setFilters
        }
      />

      <CenterPanel
        selectedMap={
          match.selectedMap
        }
        visualizationMode={
          playback.visualizationMode
        }
        onVisualizationModeChange={
          playback.setVisualizationMode
        }
        visibleEvents={
          playback.visibleEvents
        }
        timelinePosition={
          playback.timelinePosition
        }
        timelineMax={
          playback.timelineMax
        }
        isPlaying={
          playback.isPlaying
        }
        playbackSpeed={
          playback.playbackSpeed
        }
        onPlayPause={() =>
          playback.setIsPlaying(
            !playback.isPlaying
          )
        }
        onTimelineChange={
          playback.setTimelinePosition
        }
        onPlaybackSpeedChange={
          playback.setPlaybackSpeed
        }
      />

      <RightSidebar
        matchId={
          dataset.filters.matchId
        }
        matchInfo={
          match.matchInfo
        }
      />
    </main>
  );
}
