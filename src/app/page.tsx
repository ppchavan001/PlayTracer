"use client";

import { useEffect, useState } from "react";

import DatasetInfoPanel from "@/components/DatasetInfoPanel";
import FilterPanel from "@/components/FilterPanel";

import { DatasetInfo } from "@/types/dataset";
import { Filters } from "@/types/filters";

import { loadDatasetInfo } from "@/data/loadDatasetInfo";
import
{
  loadDates,
  loadMatches,
} from "@/data/loadFilters";

import Image from "next/image";

import { loadMatchMap }
  from "@/data/loadMatchMap";

import { MINIMAPS }
  from "@/data/minimaps";

import MatchInfoPanel
  from "@/components/MatchInfoPanel";

import { MatchInfo }
  from "@/types/matchInfo";

import { loadMatchInfo }
  from "@/data/loadMatchInfo";
import { loadMatchEvents, MatchEvent } from "@/data/loadMatchEvents";
import { worldToMinimap } from "@/data/mapCoordinates";



function formatTime(
  milliseconds: number
)
{
  const seconds =
    Math.floor(
      milliseconds / 1000
    );

  const minutes =
    Math.floor(seconds / 60);

  return `${minutes}:${(
    seconds % 60
  )
    .toString()
    .padStart(2, "0")}`;
}

export default function Home()
{
  const [info, setInfo] =
    useState<DatasetInfo | null>(null);

  const [dates, setDates] =
    useState<string[]>([]);

  const [matches, setMatches] =
    useState<string[]>([]);

  const [filters, setFilters] =
    useState<Filters>({
      startDate: "",
      endDate: "",
      matchId: "",
    });

  useEffect(() =>
  {
    async function initialize()
    {
      try
      {
        const [datasetInfo, availableDates] =
          await Promise.all([
            loadDatasetInfo(),
            loadDates(),
          ]);

        setInfo(datasetInfo);
        setDates(availableDates);

        if (availableDates.length > 0)
        {
          setFilters({
            startDate:
              availableDates[0],
            endDate:
              availableDates[
              availableDates.length - 1
              ],
            matchId: "",
          });
        }
      } catch (error)
      {
        console.error(error);
      }
    }

    initialize();
  }, []);

  useEffect(() =>
  {
    async function loadMatchList()
    {
      if (
        !filters.startDate ||
        !filters.endDate
      )
      {
        return;
      }

      try
      {
        const availableMatches =
          await loadMatches(
            filters.startDate,
            filters.endDate
          );

        setMatches(availableMatches);
      } catch (error)
      {
        console.error(error);
      }
    }

    loadMatchList();
  }, [
    filters.startDate,
    filters.endDate,
  ]);


  const [selectedMap, setSelectedMap] =
    useState<string | null>(null);

  useEffect(() =>
  {
    async function loadMap()
    {
      if (!filters.matchId)
      {
        setSelectedMap(null);
        return;
      }

      const map = await loadMatchMap(
        filters.matchId
      );

      setSelectedMap(map);
    }

    loadMap().catch(console.error);
  }, [filters.matchId]);


  const [matchInfo, setMatchInfo] =
    useState<MatchInfo | null>(null);

  useEffect(() =>
  {
    if (!filters.matchId)
    {
      setMatchInfo(null);
      return;
    }

    loadMatchInfo(filters.matchId)
      .then(setMatchInfo)
      .catch(console.error);
  }, [filters.matchId]);


  const [visualizationMode, setVisualizationMode] =
    useState("events");

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [timelinePosition, setTimelinePosition] =
    useState(0);

  const [timelineMax, setTimelineMax] =
    useState(100);

  const [events, setEvents] =
    useState<MatchEvent[]>([]);

  const [visibleEvents, setVisibleEvents] =
    useState<MatchEvent[]>([]);


  useEffect(() =>
  {
    async function loadPlayback()
    {
      setIsPlaying(false);
      setVisibleEvents([]);
      setEvents([]);

      if (!filters.matchId)
      {
        return;
      }

      const matchEvents =
        await loadMatchEvents(
          filters.matchId
        );

      setEvents(matchEvents);

      if (!matchEvents.length)
      {
        return;
      }

      const minTs =
        matchEvents[0].ts;

      const maxTs =
        matchEvents[
          matchEvents.length - 1
        ].ts;

      setTimelinePosition(0);
      setTimelineMax(maxTs - minTs);
    }

    loadPlayback().catch(console.error);
  }, [filters.matchId]);

  useEffect(() =>
  {
    if (!events.length)
    {
      return;
    }

    const startTs = events[0].ts;

    const currentTs =
      startTs + timelinePosition;

    setVisibleEvents(
      events.filter(
        (e) => e.ts <= currentTs
      )
    );
  }, [timelinePosition, events]);

  const [playbackSpeed, setPlaybackSpeed] =
    useState(1);

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
              current >= timelineMax
            )
            {
              setIsPlaying(false);

              return timelineMax;
            }

            return Math.min(
              current +
              playbackSpeed,
              timelineMax
            );
          }
        );
      }, 100);

    return () =>
      window.clearInterval(timer);
  }, [
    isPlaying,
    timelineMax,
    playbackSpeed,
  ]);



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
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          borderRight:
            "1px solid #1e232d",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 24,
          }}
        >
          PlayTracer
        </h2>

        <FilterPanel
          filters={filters}
          dates={dates}
          matches={matches}
          onChange={setFilters}
        />

        <div
          style={{
            marginTop: "auto",
          }}
        >
          <DatasetInfoPanel
            info={info}
          />
        </div>
      </aside>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#11151b",
          padding: "1rem",
          gap: "1rem",
        }}
      >


        {/* Minimap */}
        <div
          style={{
            flex: 1,
            borderRadius: 12,
            border: "1px solid #222",
            background: "#151922",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {!selectedMap && (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.6,
              }}
            >
              Select a match
            </div>
          )}

          {selectedMap && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 100,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background:
                    "rgba(30,35,45,0.8)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {selectedMap}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 100,
                }}
              >
                <select
                  value={visualizationMode}
                  onChange={(e) =>
                    setVisualizationMode(
                      e.target.value
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
                    appearance: "none",
                    paddingRight: 28,
                  }}
                >
                  <option value="events">
                    Events
                  </option>

                  <option
                    value="heatmap"
                    disabled
                  >
                    Heatmap
                  </option>
                </select>

                <span
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    pointerEvents: "none",
                    fontSize: 10,
                  }}
                >
                  ▼
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    aspectRatio: "1",
                    maxHeight: "90%",
                  }}
                >
                  <Image
                    src={
                      MINIMAPS[selectedMap]
                    }
                    alt={selectedMap}
                    fill
                    priority
                  />

                  {visibleEvents.map(
                    (event, index) =>
                    {
                      if (
                        event.event ===
                        "Position" ||
                        event.event ===
                        "BotPosition"
                      )
                      {
                        return null;
                      }

                      const point =
                        worldToMinimap(
                          selectedMap,
                          event.x,
                          event.z
                        );

                      let color =
                        "#ffffff";

                      switch (
                      event.event
                      )
                      {
                        case "Loot":
                          color =
                            "#facc15";
                          break;

                        case "Kill":
                        case "BotKill":
                          color =
                            "#22c55e";
                          break;

                        case "Killed":
                        case "BotKilled":
                          color =
                            "#ef4444";
                          break;

                        case "KilledByStorm":
                          color =
                            "#3b82f6";
                          break;
                      }

                      return (
                        <div
                          key={index}
                          style={{
                            position:
                              "absolute",

                            left: `${(point.x /
                              1024) *
                              100
                              }%`,

                            top: `${(point.y /
                              1024) *
                              100
                              }%`,

                            width: 10,
                            height: 10,

                            borderRadius:
                              "50%",

                            background:
                              color,

                            border:
                              "1px solid rgba(255,255,255,0.5)",

                            transform:
                              "translate(-50%, -50%)",

                            zIndex: 50,
                          }}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Playback Controls */}
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
            onClick={() =>
              setIsPlaying(
                !isPlaying
              )
            }
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
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <select
            value={playbackSpeed}
            onChange={(e) =>
              setPlaybackSpeed(
                Number(e.target.value)
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
              cursor: "pointer",
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
              setTimelinePosition(
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
            {formatTime(timelineMax)}
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
      </section>

      <aside
        style={{
          padding: "1rem",
          borderLeft:
            "1px solid #1e232d",
        }}
      >
        <MatchInfoPanel
          info={matchInfo}
        />
      </aside>
    </main >
  );
}
