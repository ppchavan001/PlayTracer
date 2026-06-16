import * as duckdb from "@duckdb/duckdb-wasm";
import { DatasetInfo } from "@/types/dataset";

export async function loadDatasetInfo(
    conn: duckdb.AsyncDuckDBConnection
): Promise<DatasetInfo>
{
    const result = await conn.query(`
        SELECT
            (
                SELECT COUNT(*)
                FROM events
            ) AS rows,

            (
                SELECT COUNT(DISTINCT match_id)
                FROM events
            ) AS matches,

            (
                SELECT COUNT(DISTINCT user_id)
                FROM events
            ) AS players,

            (
                SELECT COUNT(DISTINCT user_id)
                FROM events
                WHERE regexp_matches(user_id, '^[0-9]+$')
            ) AS bots,

            (
                SELECT COUNT(DISTINCT user_id)
                FROM events
                WHERE NOT regexp_matches(user_id, '^[0-9]+$')
            ) AS humans,

            (
                SELECT COUNT(DISTINCT map_id)
                FROM events
            ) AS maps,

            (
                SELECT COUNT(DISTINCT event)
                FROM events
            ) AS eventTypes
    `);

    const row = result.toArray()[0] as Record<
        string,
        number
    >;

    return {
        rows: row.rows,
        matches: row.matches,
        players: row.players,
        humans: row.humans,
        bots: row.bots,
        maps: row.maps,
        eventTypes: row.eventTypes,
    };
}
