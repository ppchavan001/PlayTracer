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
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns:
          "320px 1fr",
        height: "100vh",
        background: "#0b0d10",
        color: "#fff",
        overflow: "hidden",
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
          position: "relative",
          overflow: "hidden",
          background: "#11151b",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 12,
            border: "1px solid #1e232d",
            background: "#151922",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {!selectedMap && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
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
                  zIndex: 10,
                  padding:
                    "6px 12px",
                  borderRadius: 999,
                  background:
                    "rgba(0,0,0,0.7)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {selectedMap}
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
      </section>
    </main>
  );
}
