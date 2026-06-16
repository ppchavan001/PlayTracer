import { getConnection } from "@/server/db";

export async function GET()
{
    const conn = await getConnection();

    const reader = await conn.runAndReadAll(`
        SELECT
            (SELECT COUNT(*) FROM events) AS rows,
            (SELECT COUNT(DISTINCT match_id) FROM events) AS matches,
            (SELECT COUNT(DISTINCT user_id) FROM events) AS players,
            (
                SELECT COUNT(DISTINCT user_id)
                FROM events
                WHERE regexp_matches(user_id, '^[0-9]+$')
            ) bots,
            (
                SELECT COUNT(DISTINCT user_id)
                FROM events
                WHERE NOT regexp_matches(user_id, '^[0-9]+$')
            ) humans,
            (SELECT COUNT(DISTINCT map_id) FROM events) maps,
            (SELECT COUNT(DISTINCT event) FROM events) eventTypes
    `);

    const [row] = reader.getRowObjectsJson();

    return Response.json(row);
}
