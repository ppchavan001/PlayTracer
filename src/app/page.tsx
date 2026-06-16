"use client";

import { useEffect, useState } from "react";

import DatasetInfoPanel from "@/components/DatasetInfoPanel";
import { DatasetInfo } from "@/types/dataset";

export default function Home()
{
  const [info, setInfo] =
    useState<DatasetInfo | null>(null);

  useEffect(() =>
  {
    async function loadInfo()
    {
      const response = await fetch(
        "/api/dataset-info"
      );

      const data =
        await response.json();

      console.log(data);

      setInfo(data);
    }

    loadInfo().catch(console.error);
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
