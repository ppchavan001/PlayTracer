import { getConnection } from "./duckdb";

export async function loadMatchMap(
    matchId: string
): Promise<string | null>
{
    if (!matchId)
    {
        return null;
    }

    const conn = await getConnection();

    const result = await conn.query(`
    SELECT map_id
    FROM telemetry.events
    WHERE match_id = '${matchId}'
    LIMIT 1
  `);

    await conn.close();

    const rows = result.toArray();

    if (!rows.length)
    {
        return null;
    }

    return (rows[0] as any).map_id;
}
