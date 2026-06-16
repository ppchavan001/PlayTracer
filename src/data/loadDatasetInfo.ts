import { getDb } from "./duckdb";
import { DatasetInfo } from "@/types/dataset";

let initialized = false;

async function initializeDb()
{
    const db = await getDb();

    if (initialized)
    {
        return db;
    }

    const response = await fetch(
        "/telemetry.db"
    );

    const buffer =
        await response.arrayBuffer();

    await db.registerFileBuffer(
        "telemetry.db",
        new Uint8Array(buffer)
    );

    initialized = true;

    return db;
}

export async function loadDatasetInfo(): Promise<DatasetInfo>
{
    const db = await initializeDb();

    const conn = await db.connect();

    await conn.query(`
    ATTACH 'telemetry.db' AS telemetry
  `);

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
