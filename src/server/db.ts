import { DuckDBInstance } from "@duckdb/node-api";
import path from "path";

const dbPath = path.join(
    process.cwd(),
    "public",
    "telemetry.db"
);

let connectionPromise: Promise<any> | null = null;

export async function getConnection()
{
    if (connectionPromise)
    {
        return connectionPromise;
    }

    connectionPromise = (async () =>
    {
        const instance =
            await DuckDBInstance.create(dbPath);

        return instance.connect();
    })();

    return connectionPromise;
}
