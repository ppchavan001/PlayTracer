import { getConnection } from "./duckdb";

export interface MatchEvent
{
    userId: string;
    event: string;
    x: number;
    z: number;
    ts: number;
}

export async function loadMatchEvents(
    matchId: string
): Promise<MatchEvent[]>
{
    if (!matchId)
    {
        return [];
    }

    const conn = await getConnection();

    const result = await conn.query(`
    SELECT
      user_id AS userId,
      event,
      x,
      z,
      epoch_ms(ts) AS ts
    FROM telemetry.events
    WHERE match_id = '${matchId}'
    ORDER BY ts
  `);

    await conn.close();

    return result.toArray().map((row: any) => ({
        userId: row.userId,
        event: row.event,
        x: row.x,
        z: row.z,
        ts: Number(row.ts),
    }));
}
