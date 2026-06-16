import * as duckdb from "@duckdb/duckdb-wasm";

let db: duckdb.AsyncDuckDB | null = null;

export async function getDb()
{
    if (db)
    {
        return db;
    }

    const bundles: duckdb.DuckDBBundles = {
        mvp: {
            mainModule:
                "/duckdb/duckdb-browser-mvp.wasm",
            mainWorker:
                "/duckdb/duckdb-browser-mvp.worker.js",
        },
        eh: {
            mainModule:
                "/duckdb/duckdb-browser-eh.wasm",
            mainWorker:
                "/duckdb/duckdb-browser-eh.worker.js",
        },
    };

    const bundle =
        await duckdb.selectBundle(bundles);

    const worker = new Worker(
        bundle.mainWorker!
    );

    db = new duckdb.AsyncDuckDB(
        new duckdb.ConsoleLogger(),
        // worker
    );

    await db.instantiate(
        bundle.mainModule
    );

    return db;
}
