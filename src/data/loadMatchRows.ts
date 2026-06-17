import { getConnection }
    from "./duckdb";

import { MatchEventRow }
    from "@/types/matchEventRow";

export async function loadMatchRows(
    matchId: string,
    eventType: string
): Promise<MatchEventRow[]>
{
    if (!matchId)
    {
        return [];
    }

    const conn =
        await getConnection();

    const where =
        eventType === "All"
            ? ""
            : `AND event='${eventType}'`;

    const result =
        await conn.query(`
      SELECT
    user_id AS userId,
    x,
    y,
    z,

    epoch_ms(ts) -
    MIN(epoch_ms(ts)) OVER ()
        AS ts,

    event

    FROM telemetry.events
    WHERE match_id='${matchId}'
    ${where}
    ORDER BY ts
    `);

    await conn.close();

    return result.toArray() as MatchEventRow[];
}
