import { getConnection } from "./duckdb";


export async function loadDates()
{
  const conn = await getConnection();

  const result = await conn.query(`
    SELECT DISTINCT
      strftime(
        match_date,
        '%d-%m-%Y'
      ) AS date
    FROM telemetry.events
    ORDER BY match_date
  `);

  await conn.close();

  return result
    .toArray()
    .map((r: any) => r.date);
}

export async function loadMatches(
  startDate: string,
  endDate: string
)
{
  const conn = await getConnection();

  const result = await conn.query(`
    SELECT DISTINCT match_id
    FROM telemetry.events
    WHERE match_date BETWEEN
      strptime('${startDate}', '%d-%m-%Y')
      AND
      strptime('${endDate}', '%d-%m-%Y')
    ORDER BY match_id
  `);

  await conn.close();

  return result
    .toArray()
    .map((r: any) => r.match_id);
}
