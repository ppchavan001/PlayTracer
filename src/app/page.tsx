"use client";

import { useEffect, useState } from "react";

import DatasetInfoPanel from "@/components/DatasetInfoPanel";
import FilterPanel from "@/components/FilterPanel";

import { DatasetInfo } from "@/types/dataset";
import { Filters } from "@/types/filters";

import { loadDatasetInfo } from "@/data/loadDatasetInfo";

export default function Home()
{
  const [info, setInfo] =
    useState<DatasetInfo | null>(null);

  const [filters, setFilters] =
    useState<Filters>({
      startDate: "10-02-2026",
      endDate: "14-02-2026",
      matchId: "",
    });

  useEffect(() =>
  {
    loadDatasetInfo()
      .then(setInfo)
      .catch(console.error);
  }, []);

  const availableDates = [
    "10-02-2026",
    "11-02-2026",
    "12-02-2026",
    "13-02-2026",
    "14-02-2026",
  ];

  const matches = [];

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns:
          "320px 1fr",
        height: "100vh",
      }}
    >
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          borderRight:
            "1px solid #333",
        }}
      >
        <h2>PlayTracer</h2>

        <FilterPanel
          filters={filters}
          dates={availableDates}
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

      <section>
        Minimap
      </section>
    </main>
  );
}
