import * as duckdb from "@duckdb/duckdb-wasm";

let db: duckdb.AsyncDuckDB | null = null;
let initialized = false;

async function getDb()
{
    if (db)
    {
        return db;
    }


    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

    // Select a bundle based on browser checks
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);

    const worker_url = URL.createObjectURL(
        new Blob([`importScripts("${bundle.mainWorker!}");`], { type: 'text/javascript' })
    );

    // Instantiate the asynchronous version of DuckDB-wasm
    const worker = new Worker(worker_url);

    db = new duckdb.AsyncDuckDB(
        new duckdb.ConsoleLogger(),
        worker
    );

    await db.instantiate(
        bundle.mainModule
    );

    return db;
}

let initializationPromise:
    Promise<void> | null = null;

async function initializeDb()
{
    if (initializationPromise)
    {
        return initializationPromise;
    }

    const db = await getDb();

    initializationPromise = (async () =>
    {
        const response =
            await fetch("/telemetry.db");

        const buffer =
            await response.arrayBuffer();

        await db.registerFileBuffer(
            "telemetry.db",
            new Uint8Array(buffer)
        );

        const conn = await db.connect();

        await conn.query(`
      ATTACH 'telemetry.db'
      AS telemetry
    `);

        await conn.close();
    })();

    return initializationPromise;
}
export async function getConnection()
{
    const db = await getDb();

    if (!initialized)
    {
        await initializeDb();
    }

    return db.connect();
}
