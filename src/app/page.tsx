"use client";

import { useEffect, useState } from "react";

import DatasetInfoPanel from "@/components/DatasetInfoPanel";
import { DatasetInfo } from "@/types/dataset";
import { loadDatasetInfo } from "@/data/loadDatasetInfo";

export default function Home()
{
  const [info, setInfo] =
    useState<DatasetInfo | null>(null);

  useEffect(() =>
  {
    async function init()
    {
      try
      {
        const result =
          await loadDatasetInfo();

        console.log(result);

        setInfo(result);
      } catch (error)
      {
        console.error(error);
      }
    }

    init();
  }, []);

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
          padding: "1rem",
          borderRight:
            "1px solid #333",
        }}
      >
        <h2>PlayTracer</h2>

        <DatasetInfoPanel
          info={info}
        />
      </aside>

      <section>
        Minimap
      </section>
    </main>
  );
}
