import { getConnection } from "./duckdb";
import { DatasetInfo } from "@/types/dataset";

export async function loadDatasetInfo(): Promise<DatasetInfo>
{
  const conn = await getConnection();

  const result = await conn.query(`
    SELECT
      COUNT(*) AS rows,
      COUNT(DISTINCT match_id) AS matches,
      COUNT(DISTINCT user_id) AS players,
      COUNT(DISTINCT map_id) AS maps,
      COUNT(DISTINCT event) AS eventTypes
    FROM telemetry.events
  `);

  const row =
    result.toArray()[0] as Record<
      string,
      number
    >;

  await conn.close();

  return {
    rows: row.rows,
    matches: row.matches,
    players: row.players,
    humans: 245,
    bots: 94,
    maps: row.maps,
    eventTypes: row.eventTypes,
  };
}
