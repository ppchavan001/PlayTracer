import { getConnection } from "./duckdb";
import { MatchInfo } from "@/types/matchInfo";

export async function loadMatchInfo(
  matchId: string
): Promise<MatchInfo | null>
{
  // matchId = "fbbc5d02-dd79-42fb-bba5-d768023891c8.nakama-0";
  if (!matchId)
  {
    return null;
  }

  const conn = await getConnection();

  const result = await conn.query(`
    SELECT
      match_id AS matchId,
      MIN(map_id) AS mapId,

      COUNT(
        DISTINCT user_id
      ) AS players,

      COUNT(
        DISTINCT CASE
          WHEN regexp_matches(
            user_id,
            '^[0-9]+$'
          )
          THEN user_id
        END
      ) AS bots

    FROM telemetry.events
    WHERE match_id = '${matchId}'
    GROUP BY match_id
  `);

  await conn.close();

  const rows = result.toArray();

  if (!rows.length)
  {
    return null;
  }

  return rows[0] as MatchInfo;
}
