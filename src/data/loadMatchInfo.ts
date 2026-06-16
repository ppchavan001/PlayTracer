import { getConnection } from "./duckdb";
import { MatchInfo } from "@/types/matchInfo";

export async function loadMatchInfo(
  matchId: string
): Promise<MatchInfo | null>
{
  // most players
  // matchId = "fbbc5d02-dd79-42fb-bba5-d768023891c8.nakama-0";

  // longest match
  // matchId = "06c40127-7c45-4c90-af5d-f1f880774d06.nakama-0";

  if (!matchId)
  {
    return null;
  }

  const conn = await getConnection();

  const result = await conn.query(`
    SELECT
    match_id AS matchId,
    MIN(map_id) AS mapId,

    COUNT(*) AS events,

    COUNT(DISTINCT user_id) AS players,

    COUNT(
        DISTINCT CASE
            WHEN regexp_matches(user_id, '^[0-9]+$')
            THEN user_id
        END
    ) AS bots,

    COUNT(
        DISTINCT CASE
            WHEN NOT regexp_matches(user_id, '^[0-9]+$')
            THEN user_id
        END
    ) AS humans,

    
    (epoch_ms(MAX(ts)) - epoch_ms(MIN(ts))) AS duration

  FROM telemetry.events
  WHERE match_id = '${matchId}'
  GROUP BY match_id;
    
  `);

  await conn.close();


  const rows = result.toArray();

  if (!rows.length)
  {
    return null;
  }
  console.log("Loaded match info", rows[0]);

  return rows[0] as MatchInfo;
}
