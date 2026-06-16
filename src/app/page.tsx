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
        }}
      >
        Minimap
      </section>
    </main>
  );
}
