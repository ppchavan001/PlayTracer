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
                  zIndex: 5,
                  padding:
                    "6px 12px",
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
                  zIndex: 5,
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
                    cursor: "pointer",
                    appearance: "none",
                    paddingRight: "28px",
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

              <Image
                src={
                  MINIMAPS[selectedMap]
                }
                alt={selectedMap}
                fill
                priority
                style={{
                  objectFit:
                    "contain",
                }}
              />
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

          <div
            style={{
              minWidth: 80,
              textAlign: "right",
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            {timelinePosition}%
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
